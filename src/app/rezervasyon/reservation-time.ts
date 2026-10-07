export const reservationTimes = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "17:00", "18:00", "19:00", "20:00",
];

export function getIstanbulDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) => parts.find((entry) => entry.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function isFutureReservation(date: string, time: string, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return false;
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const calendar = new Date(Date.UTC(year, month - 1, day));
  return calendar.getUTCFullYear() === year && calendar.getUTCMonth() === month - 1 &&
    calendar.getUTCDate() === day && hour >= 7 && hour <= 22 && minute >= 0 &&
    minute <= 59 && (hour < 22 || minute === 0) &&
    Date.parse(`${date}T${time}:00+03:00`) > now.getTime();
}

export function getDefaultReservation(now = new Date()) {
  const today = getIstanbulDate(now);
  const time = reservationTimes.find((slot) => isFutureReservation(today, slot, now));
  if (time) return { date: today, time, minDate: today };
  const tomorrow = getIstanbulDate(new Date(now.getTime() + 24 * 60 * 60 * 1000));
  return { date: tomorrow, time: "10:00", minDate: today };
}
