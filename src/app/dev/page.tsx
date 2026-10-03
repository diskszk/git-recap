import type { ReactNode } from "react";
import { StatCard } from "@/components/StatCard";
import { mockRecapData } from "@/lib/mock";

function CatalogSection({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-muted font-mono text-sm">{name}</h2>
      {children}
    </section>
  );
}

export default function DevCatalogPage() {
  const { totalCommits, longestStreak, topLanguages } = mockRecapData;

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8 px-4 py-10">
      <h1 className="text-3xl font-semibold">UIカタログ</h1>

      <CatalogSection name="StatCard">
        <StatCard label="総コミット数" value={totalCommits} />
        <StatCard label="最長連続日数" value={longestStreak} unit="日" />
        <StatCard label="最も使った言語" value={topLanguages[0]?.name ?? "—"} />
      </CatalogSection>

      {/* 他のコンポーネント（UsernameForm / ProfileHeader / ActivityHeatmap /
          WeekdayBars / TitleCard / ShareActions）は実装でき次第ここに追加する */}
    </main>
  );
}
