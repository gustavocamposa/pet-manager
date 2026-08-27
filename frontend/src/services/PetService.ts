import type { Pet } from "../types/Pet";

const API_URL = "http://localhost:3000/pets";

type PetInput = Omit<Pet, "id">;

type ApiError = Error & {
  status?: number;
};

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  let data: T | null = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    let message = (data as { message?: string } | null)?.message;

    if (!message) {
      if (response.status === 401) {
        message = "Your session has expired. Please log in again.";
      } else if (response.status === 403) {
        message = "You don't have permission to access this pet.";
      } else if (response.status === 404) {
        message = "Pet not found.";
      } else {
        message = "Something went wrong while talking to the server.";
      }
    }

    const error: ApiError = new Error(message);
    error.status = response.status;

    throw error;
  }

  return data as T;
}

async function request<T>(
  url: string,
  options: RequestInit,
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, options);
  } catch {
    const error: ApiError = new Error(
      "Could not connect to the server. Check your connection and try again.",
    );

    throw error;
  }

  return handleResponse<T>(response);
}

export async function getPets(): Promise<Pet[]> {
  return request<Pet[]>(API_URL, {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function addPet(pet: PetInput): Promise<Pet> {
  return request<Pet>(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(pet),
  });
}

export async function updatePet(
  id: string,
  pet: PetInput,
): Promise<Pet> {
  return request<Pet>(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(pet),
  });
}

export async function deletePet(id: string): Promise<void> {
  return request<void>(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}