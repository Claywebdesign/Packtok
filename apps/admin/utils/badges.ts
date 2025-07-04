export const statusBadge = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-gray-100 text-gray-800",
  draft: "bg-gray-100 text-gray-800",
  published: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-800",
  AVAILABLE: "bg-green-100 text-green-800",
  OUT_OF_STOCK: "bg-red-100 text-red-800",
  DRAFT: "bg-gray-100 text-gray-800",
  SOLD: "bg-blue-100 text-blue-800",
} as const;

export const typeBadge = {
  product: "bg-blue-100 text-blue-800",
  service: "bg-purple-100 text-purple-800",
  category: "bg-indigo-100 text-indigo-800",
  quote: "bg-orange-100 text-orange-800",
  order: "bg-cyan-100 text-cyan-800",
  customer: "bg-pink-100 text-pink-800",
  invoice: "bg-emerald-100 text-emerald-800",
  MACHINERY: "bg-blue-100 text-blue-800",
  SPARE_PARTS: "bg-green-100 text-green-800",
  CONSUMABLES: "bg-orange-100 text-orange-800",
  RAW_MATERIALS: "bg-purple-100 text-purple-800",
} as const;

export function cxBadge<K extends keyof typeof statusBadge>(k: K): string {
  return statusBadge[k] ?? "bg-gray-100 text-gray-800";
}

export function cxTypeBadge<K extends keyof typeof typeBadge>(k: K): string {
  return typeBadge[k] ?? "bg-gray-100 text-gray-800";
}
