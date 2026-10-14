import { Link } from "@inertiajs/react";
import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

export default function BottomCTA({ user }) {
    return (
        <section
            id="about"
            className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
        >
            <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-violet-200/50 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-purple-200/50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                <Reveal>
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-600 to-purple-700 px-6 py-14 text-center shadow-2xl shadow-violet-900/15 sm:px-12 sm:py-16 lg:px-20">
                        <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border border-white/10" />
                        <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full border border-white/10" />

                        <div className="relative mx-auto max-w-2xl">

                            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                Ready to get organized?
                            </h2>

                            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-violet-100 sm:text-lg">
                                Start keeping track of your expenses and
                                managing your records with Monetra.
                            </p>

                            <Link
                                href={user ? "/dashboard" : "/register"}
                                className="bounce-cta mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-violet-700 shadow-lg transition hover:bg-violet-50"
                            >
                                {user ? "Go to Dashboard" : "Get Started"}
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}