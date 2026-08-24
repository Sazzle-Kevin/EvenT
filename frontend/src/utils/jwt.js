// Lightweight JWT exp validation — no external library needed (saves bundle size)
// Returns true only if a parseable token has a future `exp` (with a 30s safety buffer)
export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now() + 30000;
  } catch {
    return false;
  }
};

export const decodeJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};
