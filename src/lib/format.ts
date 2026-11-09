export function formatPrice(value: number) {
  return `${value.toLocaleString("en-US")} EGP`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}