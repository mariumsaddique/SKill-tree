import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { auth } from "./config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";


import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import MissionManagement from "./pages/Missions";
import User from './pages/Users';
import SkillsList from "./pages/Skills";
import Report from "./pages/Reports";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfileSettings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectecRoute";

function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleAuthAction = () => {
    navigate("/");
  };
  const handleSwitchToLogin = () => navigate("/login");
  const handleSwitchToSignup = () => navigate("/signup");

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!currentUser ? <Login onLogin={handleAuthAction} switchToSignup={handleSwitchToSignup} /> : <Navigate to="/" />}
      />
      <Route 
        path="/signup" 
        element={!currentUser ? <Signup onSignup={handleAuthAction} switchToLogin={handleSwitchToLogin} /> : <Navigate to="/" />}
      />
      
      <Route 
        path="/*" 
        element={
          <ProtectedRoute user={currentUser}>
            <div className="d-flex">
              <Sidebar />
              <div className="flex-grow-1">
                <Topbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/missions" element={<MissionManagement />} />
                  <Route path="/users" element={<User/>}/>
                  <Route path="/skills" element={<SkillsList/>}/>
                  <Route path="/reports" element={<Report />}/>
                  <Route path="/settings" element={<UserProfileSettings />}/>
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
