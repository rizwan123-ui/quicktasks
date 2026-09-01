export default async function TaskPage({ params }: PageProps<"/tasks/[id]">) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Task #{id}</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Task details will appear here.
      </p>
    </div>
  );
}
