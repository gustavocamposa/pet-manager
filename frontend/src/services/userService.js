export async function registerUser(user) {
  let response;

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

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Could not register user.");
  }

  return data;
}
