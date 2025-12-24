import type {
 TaskPriority, TaskStatus
} from "../types/taskTypes";
type StatusFilter = "all" | TaskStatus;
type PriorityFilter = "all" | TaskPriority;
type SortBy = "date-asc" | "date-desc" | "priority" | "newest";

interface Props {
  status: StatusFilter;
  priority: PriorityFilter;
  sortBy: SortBy;
  onStatusChange: (v: StatusFilter) => void;
  onPriorityChange: (v: PriorityFilter) => void;
  onSortChange: (v: SortBy) => void;
}

const TaskFilters = ({
  status,
  priority,
  sortBy,
  onStatusChange,
  onPriorityChange,
  onSortChange,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow mt-6">
      <select
        value={status}
        onChange={e => onStatusChange(e.target.value as StatusFilter)}
        className="border px-3 py-2 rounded-lg"
      >
        <option value="all">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        value={priority}
        onChange={e => onPriorityChange(e.target.value as PriorityFilter)}
        className="border px-3 py-2 rounded-lg"
      >
        <option value="all">All Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select
        value={sortBy}
        onChange={e => onSortChange(e.target.value as SortBy)}
        className="border px-3 py-2 rounded-lg"
      >
        <option value="date-asc">Due Date ↑</option>
        <option value="date-desc">Due Date ↓</option>
        <option value="priority">Priority</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
};

export default TaskFilters;
