const API_URL = "http://localhost:3000/pets";

function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
}

async function handleResponse(response) {
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    let message = data?.message;

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

    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

async function request(url, options) {
  let response;

  try {
    response = await fetch(url, options);
  } catch {
    const error = new Error(
      "Could not connect to the server. Check your connection and try again.",
    );
    error.status = null;
    throw error;
  }

  return handleResponse(response);
}

export async function getPets() {
  return request(API_URL, {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function addPet(pet) {
  return request(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(pet),
  });
}

export async function updatePet(id, pet) {
  return request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(pet),
  });
}

export async function deletePet(id) {
  return request(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}
