type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function FormCard({ title, description, children }: Props) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
      <h2 className="text-xl font-extrabold text-ink sm:text-2xl">{title}</h2>
      {description && (
        <p className="mt-2 mb-6 text-subtle">{description}</p>
      )}
      {children}
    </section>
  );
}