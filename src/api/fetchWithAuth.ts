export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  logoutCallback: () => void
) {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    logoutCallback();
  }

  return res;
}
