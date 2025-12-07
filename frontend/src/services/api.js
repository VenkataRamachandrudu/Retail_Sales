const BASE_URL = "http://localhost:4000";

async function handle(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }
  return res.json();
}

export async function fetchSales(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/api/sales?${query}`);
  return handle(res);
}

export async function fetchMeta() {
  const res = await fetch(`${BASE_URL}/api/sales/meta`);
  return handle(res);
}
