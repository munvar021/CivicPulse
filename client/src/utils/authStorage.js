const TOKEN_KEY = "token";

export const getStoredToken = () => {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const hasStoredToken = () => Boolean(getStoredToken());

export const setStoredToken = (token, role) => {
  if (!token) return;

  try {
    if (role === "superAdmin") {
      sessionStorage.setItem(TOKEN_KEY, token);
      localStorage.removeItem(TOKEN_KEY);
      return;
    }

    localStorage.setItem(TOKEN_KEY, token);
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // Ignore storage errors and allow auth flow to continue.
  }
};

export const clearStoredToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // Ignore storage errors.
  }
};
