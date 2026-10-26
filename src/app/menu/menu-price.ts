// The admin menu uses Turkish prices. Parse the entire value: a prefix match
// silently turned ₺1.250,50 into 1 and ranges into a misleading single price.
export function menuSchemaPrice(value: string): string | undefined {
  const amount = value.trim().replace(/^₺\s*/, "").replace(/\s*(?:TL|TRY)$/i, "");
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(amount)) return undefined;
  const normalized = amount.replaceAll(".", "").replace(",", ".");
  const number = Number(normalized);
  return Number.isFinite(number) && number >= 0 ? String(number) : undefined;
}
