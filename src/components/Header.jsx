import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <header>
      <nav style={{ display: "flex", gap: "2rem" }}>
        <Link to="/">Home</Link>
        {isAuthenticated !== undefined ? (
          <>
            <Link to="/premium-content">Premium Content</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/sign-in">Sign-in</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
