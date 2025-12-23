import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { updateTask } from "../services/task.api";
import TaskForm from "../components/TaskForm";
import type { TaskFormData } from "../components/TaskForm";

const EditTaskPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log("Editing task with id:", id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector(state => state.tasks);
  console.log("Current tasks in state:", tasks);

  
   const task = tasks.find(t => String(t._id) === String(id));


console.log("Task to edit:", task);


  const handleUpdate = (data: TaskFormData) => {
    dispatch(updateTask({ id: task?._id, ...data }));
    navigate("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">
        Edit Task
      </h1>

      <TaskForm
        initialData={task}
        onSubmit={handleUpdate}
        submitLabel="Update Task"
      />
    </div>
  );
};

export default EditTaskPage;
