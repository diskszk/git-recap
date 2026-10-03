type StatCardProps = {
  label: string;
  value: string | number;
  /** 数字の後ろに小さく添える単位（例: "日"） */
  unit?: string;
};

/** 1カード1メッセージの共通枠。ラベルと大きな数字を表示する */
export function StatCard({ label, value, unit }: StatCardProps) {
  return (
    <section className="border-border bg-surface rounded-lg border p-6">
      <h2 className="text-muted text-sm">{label}</h2>
      <p className="text-accent mt-2 text-5xl font-bold break-words">
        {typeof value === "number" ? value.toLocaleString("en-US") : value}
        {unit && (
          <span className="text-muted ml-1 text-xl font-medium">{unit}</span>
        )}
      </p>
    </section>
  );
}
