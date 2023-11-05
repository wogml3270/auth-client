import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext(null);

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    user: null,
  });

  const setUserAuthInfo = ({ accessToken, refreshToken, user }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setAuthState({ accessToken, refreshToken, user });
  };

  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });

      const { accessToken, refreshToken, user } = response.data.data;
      setUserAuthInfo({ accessToken, refreshToken, user });
      return true; // 로그인 성공
    } catch (error) {
      console.error("Login failed:", error);
      return false; // 로그인 실패
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuthState({ accessToken: null, refreshToken: null, user: null });
  };

  const refreshAccessToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axiosInstance.post(
        "/auth/refresh",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      setUserAuthInfo({
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
        user: response.data.data.userId,
      });
      return response.data.data.accessToken;
    } catch (error) {
      logout();
      return null;
    }
  }, []);

  useEffect(() => {
    // Auto-refresh token interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = authState.accessToken;
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [authState.accessToken, refreshAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setUserAuthInfo,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
