interface Props {
  status: string;
  priority: string;
  sortBy: string;
  onStatusChange: (v: string) => void;
  onPriorityChange: (v: string) => void;
  onSortChange: (v: string) => void;
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

      {/* Status */}
      <select
        value={status}
        onChange={e => onStatusChange(e.target.value)}
        className="border px-3 py-2 rounded-lg"
      >
        <option value="all">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Priority */}
      <select
        value={priority}
        onChange={e => onPriorityChange(e.target.value)}
        className="border px-3 py-2 rounded-lg"
      >
        <option value="all">All Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={e => onSortChange(e.target.value)}
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
