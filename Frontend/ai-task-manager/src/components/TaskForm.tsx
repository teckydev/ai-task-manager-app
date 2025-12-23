import { useState } from "react";

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  status: "Pending" | "Completed";
  priority: "Low" | "Medium" | "High";
  aiSuggestion?: string;
}


interface TaskFormProps {
  initialData?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  submitLabel?: string;
}

export const TaskForm = ({
  initialData,
  onSubmit,
  submitLabel = "Save Task",
}: TaskFormProps) => {
console.log("TaskForm initialData:", initialData);
  // ✅ initialize state from props ONCE
 const [form, setForm] = useState<TaskFormData>(() => ({
  title: initialData?.title ?? "",
  description: initialData?.description ?? "",
  dueDate: initialData?.dueDate ?? "",
  status: initialData?.status ?? "Pending",
  priority: initialData?.priority ?? "Medium",
  aiSuggestion: initialData?.aiSuggestion ?? "",
}));


  const [errors, setErrors] = useState<Partial<TaskFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const err: Partial<TaskFormData> = {};

    if (!form.title.trim()) err.title = "Title is required";
    if (!form.description.trim())
      err.description = "Description is required";
    if (!form.dueDate) err.dueDate = "Due date is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="space-y-4">

        {/* Title */}
        <div>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task title"
            className="w-full h-11 px-4 border rounded-lg"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Task description"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description}
            </p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full h-11 px-4 border rounded-lg"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm">
              {errors.dueDate}
            </p>
          )}
        </div>
{/* Status */}
<div>
  <label className="block text-sm font-medium text-gray-600 mb-1">
    Status
  </label>
  <select
    name="status"
    value={form.status}
    onChange={handleChange}
    className="w-full h-11 px-4 border rounded-lg"
  >
    <option value="Pending">Pending</option>
    <option value="Completed">Completed</option>
  </select>
</div>

{/* Priority */}
<div>
  <label className="block text-sm font-medium text-gray-600 mb-1">
    Priority
  </label>
  <select
    name="priority"
    value={form.priority}
    onChange={handleChange}
    className="w-full h-11 px-4 border rounded-lg"
  >
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
  </select>
</div>

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white h-11 rounded-lg"
        >
          {submitLabel}
        </button>

      </div>
    </div>
  );
};

export default TaskForm;
