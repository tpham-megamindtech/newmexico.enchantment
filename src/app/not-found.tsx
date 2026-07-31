import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-turq-600">
        Off the trail
      </p>
      <h1 className="mt-3 font-display text-5xl font-semibold text-ink-900">
        Page not found
      </h1>
      <p className="mt-4 text-ink-500">
        This route wandered into the mesa. Let&apos;s get you back to the plaza.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-clay-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-clay-700"
      >
        Back to the home page
      </Link>
    </div>
  );
}
