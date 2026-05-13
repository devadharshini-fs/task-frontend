import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../api";

function CreateTaskModal({ teamId, closeModal, refreshTasks }) {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    API.get(`/employees/team/${teamId}`)
      .then((res) => setEmployees(res.data))
      .catch(() => toast.error("Failed to load employees"));
  }, [teamId]);

  const selectedEmployee = employees.find(
    (emp) => emp.employeeId === Number(employeeId),
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", {
        projectName,
        taskTitle,
        taskDescription,
        noOfDays: Number(noOfDays),
        priority,
        status: false,
        assignee: {
          employeeId: Number(employeeId),
        },
      });

      refreshTasks();
      closeModal();

      setTimeout(() => {
        toast.success("Task Assigned Successfully");
      }, 100);
    } catch (error) {
      toast.error("Failed to assign task");
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>Create New Task</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          >
            <option value="">Select Employee ID</option>
            {employees.map((emp) => (
              <option key={emp.employeeId} value={emp.employeeId}>
                {emp.employeeId}
              </option>
            ))}
          </select>

          <select value={selectedEmployee?.employeeName || ""} disabled>
            <option>{selectedEmployee?.employeeName || "Employee Name"}</option>
          </select>

          <select
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          >
            <option value="">Select Project</option>
            <option value="Task Management App">Task Management App</option>
            <option value="Employee Portal">Employee Portal</option>
            <option value="Training Academy App">Training Academy App</option>
          </select>

          <input
            type="text"
            placeholder="Task Name"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <input
            type="number"
            placeholder="No of days"
            value={noOfDays}
            onChange={(e) => setNoOfDays(e.target.value)}
            required
          />

          <div className="modal-actions">
            <button type="submit" className="primary-btn">
              Submit
            </button>
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;
