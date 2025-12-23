import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { createTask } from "../services/task.api";
import TaskForm from "../components/TaskForm";
import type { TaskFormData } from "../components/TaskForm";


const CreateTaskPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreate = (data: TaskFormData) => {
    dispatch(createTask(data));
    navigate("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">
        Create Task
      </h1>

      <TaskForm
        onSubmit={handleCreate}
        submitLabel="Create Task"
      />
    </div>
  );
};

export default CreateTaskPage;
