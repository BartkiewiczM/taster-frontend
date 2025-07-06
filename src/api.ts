const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(email: string, password: string, passwordConfirmation: string) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_v1_user: {
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to register");
  }

  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_v1_user: {
        email,
        password,
      },
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to login");
  }

  return res.json();
}
