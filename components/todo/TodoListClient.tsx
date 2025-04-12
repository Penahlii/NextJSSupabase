"use client";

import { useState, useEffect } from "react";
import TodoCard from "@/components/todo/todoCard";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function TodoListClient() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      toast.success("To-do deleted successfully!");
    } else {
      toast.error("Failed to delete to-do");
    }
  };

  const handleToggleComplete = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updatedTodo = { ...todo, completed: !todo.completed };

    const res = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });

    if (res.ok) {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
      {
        updatedTodo.completed
          ? toast.success("Todo is Done !")
          : toast.warning("Todo still Pending");
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My To-Do List</h1>
        <Link
          href="/todos/add"
          className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 transition"
        >
          + Add New To-Do
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            {...todo}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
