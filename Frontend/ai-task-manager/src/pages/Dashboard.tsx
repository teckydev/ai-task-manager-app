import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchTasks } from "../services/task.api";
import TaskList from "../components/TaskList";
import LogoutButton from "../components/LogoutButton";
import TaskFilters from "../components/TaskFilters";
import type { Task } from "../types/taskTypes";
import type {
 TaskPriority, TaskStatus
} from "../types/taskTypes";

type StatusFilter = "all" | TaskStatus;
type PriorityFilter = "all" | TaskPriority;
type SortBy = "date-asc" | "date-desc" | "priority" | "newest";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { tasks, loading } = useAppSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Summary
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status !== "Completed").length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const highPriorityTasks = tasks.filter(t => t.priority === "High").length;

  const [status, setStatus] = useState<StatusFilter>("all");
  const [priority, setPriority] = useState<PriorityFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("date-asc");

  const filteredTasks = useMemo(() => {
    let result: Task[] = [...tasks];

    if (status !== "all") {
      result = result.filter(t => t.status === status);
    }

    if (priority !== "all") {
      result = result.filter(t => t.priority === priority);
    }

    switch (sortBy) {
      case "date-asc":
        result.sort(
          (a, b) =>
            new Date(a.dueDate).getTime() -
            new Date(b.dueDate).getTime()
        );
        break;

      case "date-desc":
        result.sort(
          (a, b) =>
            new Date(b.dueDate).getTime() -
            new Date(a.dueDate).getTime()
        );
        break;

     case "priority": {
  const order: Record<"High" | "Medium" | "Low", number> = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  result.sort(
    (a, b) => order[a.priority] - order[b.priority]
  );
  break;
}


      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [tasks, status, priority, sortBy]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your tasks efficiently
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/create-task")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + Create Task
          </button>
          <LogoutButton />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { label: "Total Tasks", value: totalTasks },
          { label: "Pending", value: pendingTasks },
          { label: "Completed", value: completedTasks },
          { label: "High Priority", value: highPriorityTasks },
        ].map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">{item.label}</p>
            <h2 className="text-2xl font-bold text-indigo-600 mt-2">
              {loading ? "..." : item.value}
            </h2>
          </div>
        ))}
      </div>

      <TaskFilters
        status={status}
        priority={priority}
        sortBy={sortBy}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
        onSortChange={setSortBy}
      />

      <TaskList tasks={filteredTasks} />
    </div>
  );
};

export default Dashboard;
