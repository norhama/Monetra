import { Link } from "@inertiajs/react";
import {
    ArrowRight,
    BarChart3,
    CreditCard,
    TrendingUp,
    Wallet,
    PieChart,
    ChevronRight,
} from "lucide-react";
import Reveal from "./Reveal";

export default function Hero({ user }) {
    const dashboardLink = user ? "/dashboard" : "/register";

    return (
        <section className="relative isolate bg-gradient-to-br from-violet-50 via-white to-purple-50">
            <div className="hero-orb pointer-events-none absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-purple-100/70 blur-3xl" />

            <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-28">
                <div className="relative z-10">
                    <Reveal>
                        <h1 className="max-w-xl text-4xl uppercase tracking-wide font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                            Your money,
                            <span className="block uppercase tracking-wide text-violet-600">
                                your control.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                            Keep track of your expenses, manage your products,
                            and see where your money goes all in one place.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={dashboardLink}
                                className="shine-button inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:bg-violet-700"
                            >
                                {user ? "Open Dashboard" : "Get Started"}
                                <ArrowRight size={17} />
                            </Link>

                            <a
                                href="#features"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3.5 text-sm font-bold text-violet-700 transition hover:border-violet-300 hover:bg-violet-50"
                            >
                                Explore Features
                                <ChevronRight size={17} />
                            </a>
                        </div>
                    </Reveal>
                </div>

                <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
                    <div className="float-card relative rounded-3xl border border-violet-100 bg-white p-5 shadow-2xl shadow-violet-900/10 sm:p-7">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Dashboard preview
                                </p>
                                <h2 className="mt-1 text-xl font-bold text-slate-900">
                                    Your overview
                                </h2>
                            </div>
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                                <Wallet size={22} />
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="rounded-2xl bg-violet-50 p-4 sm:p-5">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-medium text-slate-500 sm:text-sm">
                                        Total expenses
                                    </span>
                                    <Wallet size={17} className="text-violet-600" />
                                </div>
                                <p className="mt-3 text-xl font-extrabold text-slate-900 sm:text-2xl">
                                    ₱0.00
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Your recorded expenses
                                </p>
                            </div>

                            <div className="rounded-2xl bg-purple-50 p-4 sm:p-5">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-medium text-slate-500 sm:text-sm">
                                        This month
                                    </span>
                                    <TrendingUp size={17} className="text-purple-600" />
                                </div>
                                <p className="mt-3 text-xl font-extrabold text-slate-900 sm:text-2xl">
                                    ₱0.00
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Monthly spending
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 rounded-2xl border border-slate-100 p-4 sm:p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-slate-900">
                                        Expense breakdown
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Sample chart preview
                                    </p>
                                </div>
                                <BarChart3 size={20} className="text-violet-600" />
                            </div>

                            <div className="mt-5 flex items-end gap-3">
                                <div className="h-16 flex-1 rounded-t-lg bg-violet-200 transition-all duration-500 hover:bg-violet-300" />
                                <div className="h-24 flex-1 rounded-t-lg bg-violet-400 transition-all duration-500 hover:bg-violet-500" />
                                <div className="h-12 flex-1 rounded-t-lg bg-purple-200 transition-all duration-500 hover:bg-purple-300" />
                                <div className="h-20 flex-1 rounded-t-lg bg-violet-600 transition-all duration-500 hover:bg-violet-700" />
                                <div className="h-14 flex-1 rounded-t-lg bg-purple-300 transition-all duration-500 hover:bg-purple-400" />
                                <div className="h-28 flex-1 rounded-t-lg bg-violet-300 transition-all duration-500 hover:bg-violet-400" />
                            </div>

                            <div className="mt-3 flex justify-between text-xs text-slate-400">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                                <CreditCard size={19} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-slate-800">
                                    Expense records
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500">
                                    Keep everything organized
                                </p>
                            </div>
                            <ArrowRight size={17} className="text-violet-500" />
                        </div>
                    </div>

                    <div className="float-small absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-violet-100 bg-white p-4 shadow-xl shadow-violet-900/10 sm:flex">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                            <PieChart size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">
                                Clear overview
                            </p>
                            <p className="text-xs text-slate-500">
                                See your spending
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}