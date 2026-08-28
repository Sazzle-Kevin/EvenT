const API_URL = "http://localhost:3001/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("apiToken");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || JSON.stringify(data));
  }

  return data;
}

export function getEvents() {
  return request("/events");
}

export function getEvent(id) {
  return request(`/events/${id}`);
}

export function signUp(userData) {
  return request("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export function signIn(credentials) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function createEvent(eventData) {
  return request("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });
}

export function deleteEvent(id) {
  return request(`/events/${id}`, {
    method: "DELETE",
  });
}
