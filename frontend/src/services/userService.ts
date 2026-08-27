import type { User } from "../types/User";

type RegisterUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

type RegisterResponse = {
  message?: string;
  user?: User;
};

export async function registerUser(
  user: RegisterUser
): Promise<RegisterResponse> {
  let response: Response;

  try {
    response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  } catch {
    throw new Error("Could not connect to the server. Please try again.");
  }

  const data: RegisterResponse | null = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || "Could not register user."
    );
  }

  return data as RegisterResponse;
}