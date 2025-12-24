export type TaskPriority = "High" | "Medium" | "Low";
export type TaskStatus = "Pending" | "In Progress" | "Completed";
export type SortBy =
  | "date-asc"
  | "date-desc"
  | "priority"
  | "newest";
export interface Task {
  _id: string;          // MongoDB id
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
   dueDate: string;
}
