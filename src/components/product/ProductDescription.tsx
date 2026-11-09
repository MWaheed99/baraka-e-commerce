type Props = { text: string };

export default function ProductDescription({ text }: Props) {
  const rows = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section aria-labelledby="description-title">
      <h2 id="description-title" className="mb-3 text-lg font-bold text-ink">
        Description
      </h2>
      <ul className="space-y-2 text-sm text-subtle sm:text-base">
        {rows.map((row, i) => {
          const [label, ...rest] = row.split("\t");

          return rest.length > 0 ? (
            <li
              key={i}
              className="grid grid-cols-[2fr_3fr] gap-3 border-b border-line pb-2"
            >
              <span className="font-medium text-ink">{label}</span>
              <span className="break-words">{rest.join(" ")}</span>
            </li>
          ) : (
            <li key={i} className="break-words">
              {row}
            </li>
          );
        })}
      </ul>
    </section>
  );
}