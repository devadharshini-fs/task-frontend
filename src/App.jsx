import "./App.css";
import Login from "./components/Login";
import TeamLeadDashboard from "./components/TeamLeadDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    API.get("/health")
      .then(() => console.log("Backend awake"))
      .catch(() => console.log("Backend waking up..."));
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <>
      <Toaster position="top-right" />
      {user.isTeamLead ? (
        <TeamLeadDashboard user={user} onLogout={handleLogout} />
      ) : (
        <EmployeeDashboard user={user} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
