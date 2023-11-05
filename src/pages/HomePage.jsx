import React from "react";
import { useAuth } from "../context/authContext";

const HomePage = () => {
  const { isLogin, user } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      {isLogin() ? `환영합니다. ${user?.username}님` : "로그인 해주세요."}
    </div>
  );
};

export default HomePage;
