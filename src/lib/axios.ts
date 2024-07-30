import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://localhost:3056/v1/api",
  // withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const accessToken = Cookies.get("token");
  if (accessToken) {
    config.headers.Authorization = `${accessToken}`;
  }
  return config;
});

// instance.interceptors.response.use(
//   (response) => response, // Directly return successful responses.
//   async (error) => {
//     const originalRequest = error.config;
//     // TODO: Check here later
//     if (error?.response?.status === 401 && !originalRequest?._retry) {
//       originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
//       try {
//         const refreshToken = localStorage.getItem("refreshToken"); // Retrieve the stored refresh token.
//         // Make a request to your auth server to refresh the token.
//         const response = await axios.post("https://your.auth.server/refresh", {
//           refreshToken,
//         });
//         const { accessToken, refreshToken: newRefreshToken } = response.data;
//         // Store the new access and refresh tokens.
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", newRefreshToken);
//         // Update the authorization header with the new access token.
//         instance.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${accessToken}`;
//         return instance(originalRequest); // Retry the original request with the new access token.
//       } catch (refreshError) {
//         // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
//         console.error("Token refresh failed:", refreshError);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error); // For all other errors, return the error as is.
//   },
// );

export default instance;
