import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SignInPage from "./pages/SignInPage";
import MembershipPage from "./pages/MembershipPage";
import HomePage from "./pages/HomePage";
import PremiumContentPage from "./pages/PremiumContentPage";
import Header from "./components/Header";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/premium-content"
            element={
              <ProtectedRoute membershipRequired="프리미엄">
                <PremiumContentPage />
              </ProtectedRoute>
            }
          />
          {/* 더 많은 라우트들... */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
