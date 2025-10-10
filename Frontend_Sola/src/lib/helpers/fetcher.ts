const BASE_URL = "http://localhost:3000";

export async function apiFetch(path: string, options: any = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) throw new Error('API Error: ' + res.status);
  return res.json();
}