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
  timeout: 5000,
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
      return true;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("사용자 이름이나 비밀번호가 일치하지않습니다.");
        return false;
      }
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuthState({ accessToken: null, refreshToken: null, user: null });
  };

  // 사용자 정보를 불러오는 함수
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const userInfo = response.data.data;
      setUserAuthInfo({
        ...authState,
        user: userInfo,
      });
    } catch (error) {
      console.error("사용자 정보 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 사용자 정보를 불러오는 로직
    if (authState.accessToken) {
      getUserInfo();
    }
  }, [authState.accessToken]); // 액세스 토큰이 변경될 때 마다 사용자 정보를 새로 불러옴

  const refreshAccessToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
      const response = await axiosInstance.post("/auth/refresh", {
        refreshToken,
      });

      const { accessToken, newRefreshToken, user } = response.data.data;
      setUserAuthInfo({
        accessToken,
        refreshToken: newRefreshToken, // 새로운 refreshToken 업데이트
        user,
      });
      return accessToken;
    } catch (error) {
      console.error("Could not refresh access token:", error);
      logout();
      return null;
    }
  }, []);

  const isLogin = () => {
    return authState.accessToken !== null;
  };

  useEffect(() => {
    // refresh token 자동 발급
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
        isLogin,
        getUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
