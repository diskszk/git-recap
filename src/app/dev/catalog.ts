import { createElement, type ComponentType, type ReactElement } from "react";
import { StatCard } from "@/components/StatCard";
import { mockRecapData } from "@/lib/mock";

const { totalCommits, longestStreak, topLanguages } = mockRecapData;

/** カタログ1件分。props の型 P はここで閉じ込め、外には描画関数だけを出す */
export type CatalogEntry = {
  renderVariants: () => ReactElement[];
};

/** component と variants を同じ props 型 P で結びつけて登録する */
export function defineEntry<P extends object>({
  component,
  variants,
}: {
  component: ComponentType<P>;
  variants: P[];
}): CatalogEntry {
  return {
    renderVariants: () =>
      variants.map((props, index) =>
        createElement(component, { ...props, key: index }),
      ),
  };
}

/** /dev/[name] で表示するコンポーネントの一覧。キーがそのままURLになる */
export const devComponentsCatalog: Record<string, CatalogEntry> = {
  StatCard: defineEntry({
    component: StatCard,
    variants: [
      { label: "総コミット数", value: totalCommits },
      { label: "最長連続日数", value: longestStreak, unit: "日" },
      { label: "最も使った言語", value: topLanguages[0]?.name ?? "—" },
    ],
  }),
};
