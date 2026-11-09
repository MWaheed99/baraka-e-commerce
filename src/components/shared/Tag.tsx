type Props = { children: React.ReactNode };

export default function Tag({ children }: Props) {
  return (
    <span className="rounded-full bg-sand px-3 py-1 text-[13px] font-semibold text-ink">
      {children}
    </span>
  );
}