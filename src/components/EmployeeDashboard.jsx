import { useEffect, useState } from "react";
import { Search, UserCircle, LogOut, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import API from "../api";

function EmployeeDashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const employee = user.employee;

  const fetchTasks = async () => {
    const res = await API.get(`/tasks/employee/${employee.employeeId}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completeTask = async (taskId) => {
    await API.put(`/tasks/${taskId}/complete`);
    toast.success("Task marked as completed");
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "pending"
        ? !task.status
        : filter === "completed"
        ? task.status
        : true;

    const matchesSearch =
      task.taskTitle?.toLowerCase().includes(search.toLowerCase()) ||
      task.projectName?.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="dashboard">
      <div className="topbar premium-topbar">
        <div className="profile-box">
          <UserCircle size={45} />
          <div>
            <h2>Employee Dashboard</h2>
            <p>{employee.employeeName} • Employee ID: {employee.employeeId}</p>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>{tasks.length}</h3>
          <p>Total Tasks</p>
        </div>
        <div className="stat-card pending-stat">
          <h3>{tasks.filter((t) => !t.status).length}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card completed-stat">
          <h3>{tasks.filter((t) => t.status).length}</h3>
          <p>Completed</p>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by task or project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <button className={filter === "all" ? "active-filter" : ""} onClick={() => setFilter("all")}>
            All
          </button>
          <button className={filter === "pending" ? "active-filter" : ""} onClick={() => setFilter("pending")}>
            Pending
          </button>
          <button className={filter === "completed" ? "active-filter" : ""} onClick={() => setFilter("completed")}>
            Completed
          </button>
        </div>
      </div>

      <div className="task-grid">
        {filteredTasks.length === 0 ? (
          <div className="empty-card">
            <h3>No tasks found 😴</h3>
            <p>Try changing search or filter.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div className={`task-card premium-task ${task.status ? "completed-border" : "pending-border"}`} key={task.id}>
              <div className="task-card-header">
                <h3>{task.taskTitle}</h3>
                <span className={task.status ? "done" : "pending"}>
                  {task.status ? "Completed" : "Pending"}
                </span>
              </div>

              <p>{task.taskDescription}</p>

              <div className="task-info">
                <span><b>Project:</b> {task.projectName}</span>
                <span><b>Days:</b> {task.noOfDays}</span>
              </div>

              {!task.status && (
                <button className="complete-btn" onClick={() => completeTask(task.id)}>
                  <CheckCircle size={18} /> Mark Completed
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EmployeeDashboard;