import type {
  DailyContribution,
  LanguageStat,
  RecapData,
  WeekdayStat,
} from "@/types/recap";

const DAYS_IN_YEAR = 365;

/** シード値から0以上1未満の疑似乱数を決定論的に生成する */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function createDailyContributions(): DailyContribution[] {
  const today = new Date();
  const contributions: DailyContribution[] = [];

  for (let i = DAYS_IN_YEAR - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const isActiveDay = pseudoRandom(i) > 0.3;
    const count = isActiveDay
      ? Math.floor(pseudoRandom(i * 2 + 1) * 10) + 1
      : 0;

    contributions.push({
      date: date.toISOString().slice(0, 10),
      count,
    });
  }

  return contributions;
}

function calculateLongestStreak(contributions: DailyContribution[]): number {
  let longest = 0;
  let current = 0;

  for (const { count } of contributions) {
    current = count > 0 ? current + 1 : 0;
    longest = Math.max(longest, current);
  }

  return longest;
}

function calculateWeekdayStats(
  contributions: DailyContribution[],
): WeekdayStat[] {
  const counts = [0, 0, 0, 0, 0, 0, 0];

  for (const { date, count } of contributions) {
    const weekday = new Date(date).getDay();
    counts[weekday] += count;
  }

  return counts.map((count, weekday) => ({
    weekday: weekday as WeekdayStat["weekday"],
    count,
  }));
}

const MOCK_TOP_LANGUAGES: LanguageStat[] = [
  { name: "TypeScript", percentage: 52.4 },
  { name: "JavaScript", percentage: 28.1 },
  { name: "CSS", percentage: 11.9 },
];

const MOCK_TITLE = "夜型コミッター";

export function createMockRecapData(): RecapData {
  const dailyContributions = createDailyContributions();
  const totalCommits = dailyContributions.reduce(
    (sum, { count }) => sum + count,
    0,
  );

  return {
    totalCommits,
    dailyContributions,
    longestStreak: calculateLongestStreak(dailyContributions),
    topLanguages: MOCK_TOP_LANGUAGES,
    weekdayStats: calculateWeekdayStats(dailyContributions),
    title: MOCK_TITLE,
  };
}

export const mockRecapData: RecapData = createMockRecapData();
