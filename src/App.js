import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import SignInPage from "./pages/SignInPage";
import MembershipPage from "./pages/MembershipPage";
import HomePage from "./pages/HomePage";
import PremiumPage from "./pages/PremiumPage";
import Header from "./components/Header";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/premium" element={<PremiumPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
