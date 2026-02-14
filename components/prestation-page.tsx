export function PrestationPage({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="container-page">
      <article className="rounded-xl border bg-white p-6">
        <h1 className="text-3xl font-bold text-ralBlue">{title}</h1>
        <p className="mt-3">{description}</p>
      </article>
    </main>
  );
}
