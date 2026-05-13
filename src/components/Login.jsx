import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import API from "../api";

function Login({ setUser }) {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!employeeId || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/login", {
        employeeId: Number(employeeId),
        password,
      });

      if (res.data.message === "Login successful") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        toast.dismiss();
        toast.success("Welcome back 👋",{duration: 2000});
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Invalid Employee ID or Password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Task Flow 🚀</h1>
        <p>Smart Task Management for Teams</p>

        <form onSubmit={handleLogin}>
          <input
            type="number"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          {/* PASSWORD FIELD WITH TOGGLE */}
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="demo-box">
          <h4>Demo Credentials</h4>
          <p>
            <b>Team Lead:</b> 101 / 1234
          </p>
          <p>
            <b>Employee:</b> 102 / 1234
          </p>
        </div>
        <div className="feature-row">
          <span>🔐 JWT Secured</span>
          <span>👥 Role Based</span>
          <span>📊 Task Tracking</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
