import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Header = () => {
  const { isLogin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <header>
      <nav style={{ display: "flex", gap: "2rem" }}>
        <Link to="/">Home</Link>
        {isLogin() ? (
          <>
            <Link to="/membership">맴버십 정보</Link>
            <Link to="/premium">프리미엄 컨텐츠</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <Link to="/sign-in">로그인</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
