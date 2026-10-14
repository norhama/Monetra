import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-[#180b2b] text-white">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                <div className="py-16 sm:py-20">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
                        MONETRA · MONEY MANAGEMENT
                    </p>

                    <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div>
                            <h2 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                                Make every peso
                                <span className="block text-violet-400">
                                    count.
                                </span>
                            </h2>

                            <p className="mt-6 max-w-lg text-sm leading-7 text-violet-200/70 sm:text-base">
                                Small expenses add up. Keep your records
                                organized, understand your spending, and
                                take things one step at a time.
                            </p>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        href="/"
                        className="w-fit text-xl font-extrabold tracking-tight"
                    >
                        Monetra<span className="text-violet-400">.</span>
                    </Link>

                    <p className="text-xs tracking-wide text-violet-200/60">
                        Your money, your control.
                    </p>

                    <p className="text-xs text-violet-200/50">
                        © {new Date().getFullYear()} Monetra
                    </p>
                </div>
            </div>
        </footer>
    );
}