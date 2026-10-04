import Link from "next/link";
import { devComponentsCatalog } from "./catalog";

export default function DevCatalogPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 py-10">
      <h1 className="text-3xl font-semibold">UIカタログ</h1>
      <ul className="flex flex-col gap-2">
        {Object.keys(devComponentsCatalog).map((name) => (
          <li key={name}>
            <Link
              href={`/dev/${name}`}
              className="text-accent font-mono hover:underline"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
