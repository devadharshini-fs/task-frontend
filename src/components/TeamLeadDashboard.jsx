import { useEffect, useState } from "react";
import { Search, UserCircle, PlusCircle, LogOut } from "lucide-react";
import API from "../api";
import CreateTaskModal from "./CreateTaskModal";

function TeamLeadDashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const employee = user.employee;

  const fetchTeamTasks = async () => {
    const res = await API.get(`/tasks/team/${employee.teamId}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTeamTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "pending"
        ? !task.status
        : filter === "completed"
          ? task.status
          : true;

    const matchesSearch =
      task.taskTitle?.toLowerCase().includes(search.toLowerCase()) ||
      task.projectName?.toLowerCase().includes(search.toLowerCase()) ||
      task.assignee?.employeeName?.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="dashboard">
      <div className="topbar premium-topbar">
        <div className="profile-box">
          <UserCircle size={45} />
          <div>
            <h2>Team Lead Dashboard</h2>
            <p>{employee.employeeName} • Team Lead</p>
          </div>
        </div>

        <div className="top-actions">
          <button className="primary-btn" onClick={() => setShowModal(true)}>
            <PlusCircle size={18} /> Create Task
          </button>
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
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
            placeholder="Search by task, project, employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "pending" ? "active-filter" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={filter === "completed" ? "active-filter" : ""}
            onClick={() => setFilter("completed")}
          >
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
            <div
              className={`task-card premium-task ${task.status ? "completed-border" : "pending-border"}`}
              key={task.id}
            >
              <div className="task-card-header">
                <h3>{task.taskTitle}</h3>
                <span className={task.status ? "done" : "pending"}>
                  {task.status ? "Completed" : "Pending"}
                </span>
              </div>

              <p>{task.taskDescription}</p>

              <div className="task-info">
                <span>
                  <b>Project:</b> {task.projectName}
                </span>
                <span>
                  <b>Employee:</b> {task.assignee?.employeeName}
                </span>
                <span>
                  <b>Days:</b> {task.noOfDays}
                </span>
                <span>
                  <b>Priority:</b>{" "}
                  <span
                    className={
                      (task.priority || "Medium") === "High"
                        ? "priority-high"
                        : (task.priority || "Medium") === "Medium"
                          ? "priority-medium"
                          : "priority-low"
                    }
                  >
                    {task.priority || "Medium"}
                  </span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <CreateTaskModal
          teamId={employee.teamId}
          closeModal={() => setShowModal(false)}
          refreshTasks={fetchTeamTasks}
        />
      )}
    </div>
  );
}

export default TeamLeadDashboard;
