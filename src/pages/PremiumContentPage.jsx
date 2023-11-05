// src/pages/PremiumContentPage.js
import React from "react";
import { useAuth } from "../context/authContext";

const PremiumContentPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Premium Content</h1>
      {user && user.membership.name === "프리미엄" ? (
        <div>{/* Premium content goes here */}</div>
      ) : (
        <p>Access denied. This content is for Premium members only.</p>
      )}
    </div>
  );
};

export default PremiumContentPage;
