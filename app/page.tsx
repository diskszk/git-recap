import { StatCard } from "@/components/StatCard";
import { mockRecapData } from "@/lib/mock";

export default function Home() {
  const { totalCommits, longestStreak, topLanguages } = mockRecapData;

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 py-10">
      <h1 className="text-3xl font-semibold">git-recap</h1>
      <StatCard label="総コミット数" value={totalCommits} />
      <StatCard label="最長連続日数" value={longestStreak} unit="日" />
      <StatCard label="最も使った言語" value={topLanguages[0]?.name ?? "—"} />
    </main>
  );
}
