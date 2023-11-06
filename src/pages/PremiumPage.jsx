import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate, useLocation } from "react-router-dom";

const PremiumPage = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (user && user.membership.name !== "프리미엄") {
    return <Navigate to="/membership" state={{ from: location }} replace />;
  }

  return (
    <div>
      <h1>프리미엄 컨텐츠</h1>
      <p>아무튼 특별혜택</p>
    </div>
  );
};

export default PremiumPage;
