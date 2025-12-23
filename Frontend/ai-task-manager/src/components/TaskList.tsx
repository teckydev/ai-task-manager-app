import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { deleteTask } from "../services/task.api";
import type { Task } from "../types/taskTypes";

interface Props {
  tasks: Task[];
}

const TaskList = ({ tasks }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id)); // ✅ redux updates UI
    }
  };

  if (tasks.length === 0) {
    return (
      <p className="mt-6 text-gray-500">
        No tasks created yet.
      </p>
    );
  }

  return (
    <div className="bg-white mt-6 rounded-xl shadow overflow-hidden">

      {/* Header */}
      <div className="grid grid-cols-4 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-600">
        <div>Task Title</div>
        <div>Priority</div>
        <div>Due Date</div>
        <div>Actions</div>
      </div>

      {/* Rows */}
      {tasks.map(task => (
        <div
          key={task.id}
          className="grid grid-cols-4 px-4 py-3 border-t text-sm items-center"
        >
          <div className="font-medium text-gray-800">
            {task.title}
          </div>

          <div>
            <span
              className={`px-2 py-1 rounded text-xs ${
                task.priority === "High"
                  ? "bg-red-100 text-red-600"
                  : task.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {task.priority}
            </span>
          </div>

          <div className="text-gray-500">
            {task.dueDate}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/edit-task/${task.id}`)}
              className="text-indigo-600 hover:underline"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
