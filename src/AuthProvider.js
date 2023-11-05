import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const loginFn = (accessToken, refreshToken) => {
    setIsLogin(true);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const logoutFn = () => {
    setIsLogin(false);
    setAccessToken("");
    setRefreshToken("");
  };

  return (
    <AuthContext.Provider
      value={{ isLogin, accessToken, refreshToken, loginFn, logoutFn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
