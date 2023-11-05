import React from "react";
import { useAuth } from "../context/authContext";

const PremiumContentPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Premium Content</h1>
      <div>프리미엄의 혜택</div>
    </div>
  );
};

export default PremiumContentPage;
