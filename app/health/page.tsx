type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const dynamic = "force-dynamic";

async function getTodos(): Promise<Todo[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
}

export default async function HealthPage() {
  const todos = await getTodos();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Health Check</h1>
      <ul className="mt-6 space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="rounded-md border border-zinc-200 px-4 py-3 dark:border-zinc-800"
          >
            <span
              className={
                todo.completed
                  ? "text-zinc-500 line-through dark:text-zinc-500"
                  : ""
              }
            >
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
