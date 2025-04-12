"use client";

import { useRouter } from "next/navigation";
import { FC, MouseEvent } from "react";
import clsx from "clsx";

interface TodoCardProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  onDelete?: (id: string) => void;
  onToggleComplete?: (id: string) => void;
}

const TodoCard: FC<TodoCardProps> = ({
  id,
  title,
  description,
  completed,
  onDelete,
  onToggleComplete,
}) => {
  const router = useRouter();

  const handleStopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleEdit = () => {
    router.push(`/todos/edit/${id}`);
  };

  return (
    <div className="cursor-pointer transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:scale-[1.02] rounded-xl p-6 bg-white border border-gray-200 relative">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span
          className={clsx(
            "text-sm font-medium px-2 py-1 rounded",
            completed
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          )}
        >
          {completed ? "Completed" : "Pending"}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{description}</p>

      <div className="flex gap-2 mt-auto" onClick={handleStopPropagation}>
        <button
          onClick={() => onToggleComplete?.(id)}
          className="text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded"
        >
          {completed ? "Mark Pending" : "Mark Done"}
        </button>
        <button
          onClick={handleEdit}
          className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete?.(id)}
          className="text-xs px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
