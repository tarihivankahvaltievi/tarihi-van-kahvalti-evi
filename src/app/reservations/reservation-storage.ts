import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export type ReservationStatus = "pending" | "confirmed" | "cancelled";
export type ServiceType = "breakfast" | "cafe";

export interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (e.g. "10:30")
  guests: number;
  serviceType: ServiceType;
  note?: string;
  status: ReservationStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface ReservationData {
  reservations: Reservation[];
  lastUpdated: string;
}

const getLocalFilePath = () =>
  path.join(
    process.cwd(),
    "src/app/reservations",
    path.basename(process.env.RESERVATION_DATA_FILE || "reservations-data.json"),
  );

// Helper to check if Supabase is configured
export function isSupabaseConfigured() {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// Generate default calendar feed token
export function getCalendarFeedToken(): string {
  const secret = process.env.CALENDAR_FEED_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("CALENDAR_FEED_SECRET veya ADMIN_PASSWORD tanımlanmalıdır.");
  }
  const tokenSecret = secret || "development-only-calendar-secret";
  return crypto.createHash("sha256").update(`calendar-feed-${tokenSecret}`).digest("hex").slice(0, 24);
}

// Validate calendar feed token
export function isValidCalendarFeedToken(token?: string | null): boolean {
  if (!token) return false;
  const expected = getCalendarFeedToken();
  if (token.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

async function readLocalReservationData(): Promise<ReservationData> {
  try {
    const rawData = await fs.readFile(getLocalFilePath(), "utf-8");
    return JSON.parse(rawData) as ReservationData;
  } catch {
    // If file doesn't exist yet or fails to parse, return empty structure
    return { reservations: [], lastUpdated: new Date().toISOString() };
  }
}

// Fetch from Supabase Rest API
async function fetchFromSupabase(): Promise<ReservationData | null> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/reservation_state?select=data&limit=1`;
  try {
    const res = await fetch(url, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      return null;
    }
    const list = await res.json();
    if (list && list.length > 0) {
      return list[0].data as ReservationData;
    }
  } catch (error) {
    console.error("Error fetching reservations from Supabase:", error);
  }
  return null;
}

// Save to Supabase Rest API (Upsert)
async function saveToSupabase(data: ReservationData): Promise<boolean> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/reservation_state`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({ id: 1, data }),
    });
    if (!res.ok) {
      console.error("Supabase reservation upsert failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error saving reservations to Supabase:", error);
    return false;
  }
}

export async function getReservationData(): Promise<ReservationData> {
  if (isSupabaseConfigured()) {
    const data = await fetchFromSupabase();
    if (data) return data;
  }
  return await readLocalReservationData();
}

export async function saveReservationData(data: ReservationData): Promise<boolean> {
  data.lastUpdated = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabaseSuccess = await saveToSupabase(data);
    try {
      const filePath = getLocalFilePath();
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch {
      // Ignore read-only filesystem errors on Vercel/serverless
    }
    return supabaseSuccess;
  }

  try {
    const filePath = getLocalFilePath();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing local reservations-data.json:", error);
    return false;
  }
}

export async function addReservation(
  reservationInput: Omit<Reservation, "id" | "createdAt" | "updatedAt">
): Promise<Reservation> {
  const data = await getReservationData();
  const now = new Date().toISOString();
  
  // Format unique friendly ID e.g. "van-20261015-842"
  const dateCompact = (reservationInput.date || "").replace(/-/g, "");
  const randomSuffix = crypto.randomBytes(6).toString("hex");
  const id = `van-${dateCompact || Date.now()}-${randomSuffix}`;

  const newReservation: Reservation = {
    ...reservationInput,
    id,
    createdAt: now,
    updatedAt: now,
  };

  // Add to top of list
  data.reservations = [newReservation, ...data.reservations];
  const saved = await saveReservationData(data);
  if (!saved) {
    throw new Error("Rezervasyon kalıcı depolamaya kaydedilemedi.");
  }
  return newReservation;
}

export async function updateReservation(
  id: string,
  updates: Partial<Omit<Reservation, "id" | "createdAt">>
): Promise<Reservation | null> {
  const data = await getReservationData();
  const index = data.reservations.findIndex((r) => r.id === id);
  if (index === -1) return null;

  const updatedReservation: Reservation = {
    ...data.reservations[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  data.reservations[index] = updatedReservation;
  await saveReservationData(data);
  return updatedReservation;
}

export async function deleteReservation(id: string): Promise<boolean> {
  const data = await getReservationData();
  const initialLength = data.reservations.length;
  data.reservations = data.reservations.filter((r) => r.id !== id);
  if (data.reservations.length === initialLength) return false;

  await saveReservationData(data);
  return true;
}

export async function getReservationById(id: string): Promise<Reservation | null> {
  const data = await getReservationData();
  return data.reservations.find((r) => r.id === id) || null;
}
