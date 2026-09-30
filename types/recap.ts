/** 日別の貢献数（1日分） */
export type DailyContribution = {
  /** YYYY-MM-DD形式の日付 */
  date: string;
  count: number;
};

/** 使用言語トップ3のうちの1件 */
export type LanguageStat = {
  name: string;
  /** 全体に占める割合（0〜100） */
  percentage: number;
};

/** 曜日別の貢献数集計（0: 日曜 〜 6: 土曜） */
export type WeekdayStat = {
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  count: number;
};

/** UIコンポーネントが受け取る、年間活動の整形済みデータ */
export type RecapData = {
  totalCommits: number;
  dailyContributions: DailyContribution[];
  /** 最長連続貢献日数 */
  longestStreak: number;
  topLanguages: LanguageStat[];
  weekdayStats: WeekdayStat[];
  title: string;
};
