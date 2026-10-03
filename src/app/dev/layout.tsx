import { notFound } from "next/navigation";

/** UIカタログは開発専用。本番（next build / next start）では404にする */
export default function DevLayout({ children }: LayoutProps<"/dev">) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return children;
}
