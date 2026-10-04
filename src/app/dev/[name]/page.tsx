import Link from "next/link";
import { notFound } from "next/navigation";
import { devComponentsCatalog } from "../catalog";

export default async function DevComponentPage(
  props: PageProps<"/dev/[name]">,
) {
  const { name } = await props.params;

  // `in` や直接参照だと "constructor" などのプロトタイプ由来の名前が通ってしまう
  if (!Object.hasOwn(devComponentsCatalog, name)) {
    notFound();
  }

  const { renderVariants } = devComponentsCatalog[name];

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 py-10">
      <Link href="/dev" className="text-muted text-sm hover:underline">
        ← UIカタログ
      </Link>
      <h1 className="font-mono text-3xl font-semibold">{name}</h1>
      {renderVariants()}
    </main>
  );
}
