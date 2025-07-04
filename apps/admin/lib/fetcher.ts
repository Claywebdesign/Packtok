export async function fetchJson<T>(
  url: string,
  options?: globalThis.RequestInit,
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    ...options,
    credentials: "include",
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return (json.data ?? json) as T;
}
