const getAuthBaseUrl = () =>
  (import.meta.env.VITE_AUTH_BASE_URL || "").trim().replace(/\/+$/, "");

// Deduplicate concurrent refresh attempts
let refreshPromise = null;

const refreshAccessToken = async () => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${getAuthBaseUrl()}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      const result = await response.json().catch(() => ({}));
      console.log("[authFetch] /auth/refresh ->", response.status, result);
      if (!response.ok) return false;

      const accessToken =
        result.identity_token ||
        result.access_token ||
        result.access ||
        result.token ||
        result.data?.identity_token ||
        result.data?.access_token ||
        result.data?.access ||
        result.data?.token;
      if (!accessToken) {
        console.warn("[authFetch] refresh response had no access token field");
        return false;
      }

      localStorage.setItem("token", accessToken);
      localStorage.setItem("mall-token", accessToken);
      const newRefreshToken =
        result.refresh_token || result.refresh || result.data?.refresh_token || result.data?.refresh;
      if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);
      return true;
    } catch (error) {
      return false;
    }
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
};

/**
 * fetch wrapper for VITE_AUTH_BASE_URL endpoints.
 * Attaches the Bearer token and, on a 401 response, attempts a single
 * token refresh via /auth/refresh before retrying the request once.
 *
 * @param {string} path - path appended to VITE_AUTH_BASE_URL (e.g. "/auth/kyc/verify")
 * @param {RequestInit} [options]
 * @param {{ retry?: boolean }} [config] - internal, set retry=false to avoid loops
 * @returns {Promise<Response>}
 */
export const authFetch = async (path, options = {}, { retry = true } = {}) => {
  const token = localStorage.getItem("token") || localStorage.getItem("mall-token");
  const headers = { ...(options.headers || {}) };
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${getAuthBaseUrl()}${path}`, { ...options, headers });
  console.log("[authFetch]", path, "->", response.status);

  if (response.status === 401 && retry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const retryResponse = await authFetch(path, options, { retry: false });
      console.log("[authFetch]", path, "retry ->", retryResponse.status);
      return retryResponse;
    }
    console.warn("[authFetch] token refresh failed; returning original 401");
  }

  return response;
};

export default authFetch;
