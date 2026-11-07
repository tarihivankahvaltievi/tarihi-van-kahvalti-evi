// The admin menu uses Turkish prices. Parse the entire value: a prefix match
// silently turned ₺1.250,50 into 1 and ranges into a misleading single price.
export function menuSchemaPrice(value: string): string | undefined {
  const amount = value.trim().replace(/^₺\s*/, "").replace(/\s*(?:TL|TRY)$/i, "");
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(amount)) return undefined;
  const normalized = amount.replaceAll(".", "").replace(",", ".");
  const number = Number(normalized);
  return Number.isFinite(number) && number >= 0 ? String(number) : undefined;
}

// A numeric price is insufficient: only an explicitly per-person record can
// safely be multiplied. Both the source and localized menu use this helper.
export function breakfastSubtotal(item: { price: string; priceNote?: string } | undefined, guests: number): string | undefined {
  if (!item || !["kişi başı", "per person"].includes(item.priceNote?.trim().toLowerCase() ?? "")) return undefined;
  if (!Number.isSafeInteger(guests) || guests < 2 || guests > 40) return undefined;
  const price = menuSchemaPrice(item.price);
  if (price === undefined) return undefined;
  const cents = Math.round(Number(price) * 100);
  if (!Number.isSafeInteger(cents * guests)) return undefined;
  return String(cents * guests / 100);
}
