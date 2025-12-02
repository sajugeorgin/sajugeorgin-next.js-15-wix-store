import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-h-6xl bg-slate-100">
      <div className="max-h-6xl mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-16">
        {/* BADGE */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="bg-primary rounded-full px-6 py-3 text-center shadow-lg">
            <p className="text-xs font-medium tracking-[0.25em] text-black/90">
              OOPS
            </p>
            <p className="text-2xl font-semibold text-black">404</p>
          </div>
          <p className="text-xs tracking-[0.25em] text-slate-800 uppercase">
            Page not found
          </p>
        </div>

        {/* TEXT */}
        <div className="mb-10 space-y-4 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            We could not find that page
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-500">
            The product or page you are looking for is missing or no longer
            available. You can return to the homepage.
          </p>
        </div>

        {/* ACTION */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 focus-visible:outline-none"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
