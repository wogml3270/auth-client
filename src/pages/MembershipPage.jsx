// src/pages/MembershipPage.js
import React from "react";
import { useAuth } from "../context/authContext";

const MembershipPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Membership Information</h1>
      {user ? (
        <div>
          <p>Current membership: {user.membership.name}</p>
          {/* Logic to upgrade membership */}
        </div>
      ) : (
        <p>You are not signed in.</p>
      )}
    </div>
  );
};

export default MembershipPage;
