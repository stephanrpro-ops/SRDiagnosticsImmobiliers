const values = [
  ['Confiance', 'Relation solide et durable, sérieux et qualité d’accompagnement.'],
  ['Transparence', 'Explications claires, sans ambiguïté.'],
  ['Honnêteté', 'Diagnostics justes et impartiaux.'],
  ['Efficacité', 'Rigueur et réactivité, rapports précis dans les meilleurs délais.'],
  ['Engagement', 'Valorisation des biens + performance énergétique, au service des clients et de l’environnement.']
];

export default function ValeursPage() {
  return (
    <main className="container-page">
      <h1 className="text-3xl font-bold text-ralBlue">Nos valeurs</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {values.map(([title, text]) => (
          <article key={title} className="rounded-xl border bg-white p-5">
            <h2 className="text-xl font-bold text-ralBlue">{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
