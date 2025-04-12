import TodoForm from "@/components/todo/TodoForm";

export default function AddTodoPage() {
  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Add New To-Do</h1>
      <TodoForm />
    </div>
  );
}
