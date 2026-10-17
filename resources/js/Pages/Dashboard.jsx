import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Wallet,
    CalendarDays,
    ReceiptText,
    ChartNoAxesColumn,
    Coffee,
    Package,
    Plus,
    ArrowRight,
    ChartPie,
    TrendingUp,
    Sparkles,
    CalendarRange,
    ArrowUpRight,
} from "lucide-react";

const money = (value) =>
    Number(value || 0).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

const chartColors = [
    "#7c3aed",
    "#a855f7",
    "#c084fc",
    "#6d28d9",
    "#ddd6fe",
    "#9333ea",
    "#8b5cf6",
    "#d8b4fe",
];

const formatExpenseDate = (date) => {
    if (!date) return "—";

    const dateOnly = String(date).slice(0, 10);
    const parsed = new Date(`${dateOnly}T00:00:00`);

    if (Number.isNaN(parsed.getTime())) return "—";

    return parsed.toLocaleDateString("en-PH", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

function SectionHeading({ icon: Icon, title, description, action }) {
    return (
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                    <Icon size={21} />
                </div>

                <div>
                    <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                        {description}
                    </p>
                </div>
            </div>

            {action}
        </div>
    );
}

function DoughnutChart({ categories }) {
    const validCategories = categories.filter(
        (item) => Number(item.total || 0) > 0
    );

    const total = validCategories.reduce(
        (sum, item) => sum + Number(item.total || 0),
        0
    );

    if (!validCategories.length || total <= 0) {
        return (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl bg-violet-50/70 px-5 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-violet-500 shadow-sm">
                    <ChartPie size={30} />
                </div>
                <p className="mt-4 font-bold text-gray-800">
                    No chart data available
                </p>
                <p className="mt-1 max-w-xs text-sm leading-6 text-gray-500">
                    Record expenses to see how your spending is distributed.
                </p>
            </div>
        );
    }

    const radius = 68;
    const circumference = 2 * Math.PI * radius;
    let accumulated = 0;

    const segments = validCategories.map((item, index) => {
        const amount = Number(item.total || 0);
        const dashLength = (amount / total) * circumference;
        const offset = accumulated;

        accumulated += dashLength;

        return {
            ...item,
            amount,
            percentage: (amount / total) * 100,
            dashLength,
            offset,
            color: chartColors[index % chartColors.length],
        };
    });

    return (
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-10">
            <div className="relative h-56 w-56 shrink-0">
                <svg
                    viewBox="0 0 180 180"
                    role="img"
                    aria-label="Expense distribution by category"
                    className="h-full w-full -rotate-90"
                >
                    <circle
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke="#f3e8ff"
                        strokeWidth="23"
                    />

                    {segments.map((segment) => (
                        <circle
                            key={segment.category}
                            cx="90"
                            cy="90"
                            r={radius}
                            fill="none"
                            stroke={segment.color}
                            strokeWidth="23"
                            strokeDasharray={`${segment.dashLength} ${circumference - segment.dashLength}`}
                            strokeDashoffset={-segment.offset}
                        >
                            <title>
                                {segment.category}: ₱{money(segment.amount)} (
                                {segment.percentage.toFixed(1)}%)
                            </title>
                        </circle>
                    ))}
                </svg>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        This month
                    </span>
                    <span className="mt-2 max-w-full break-all px-2 text-center text-lg font-extrabold text-violet-700">
                        ₱{money(total)}
                    </span>
                    <span className="mt-1 text-xs text-gray-500">
                        Total spending
                    </span>
                </div>
            </div>

            <div className="w-full min-w-0 space-y-4 lg:max-w-sm">
                {segments.map((segment) => (
                    <div
                        key={segment.category}
                        className="flex items-center justify-between gap-3"
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <span
                                className="h-3.5 w-3.5 shrink-0 rounded-md"
                                style={{
                                    backgroundColor: segment.color,
                                }}
                            />
                            <div className="min-w-0">
                                <p className="break-words text-sm font-semibold text-gray-800">
                                    {segment.category}
                                </p>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    {segment.percentage.toFixed(1)}% of expenses
                                </p>
                            </div>
                        </div>

                        <span className="shrink-0 text-sm font-bold text-violet-700">
                            ₱{money(segment.amount)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StatCard({ label, value, description, icon: Icon, accent }) {
    return (
        <div className="group rounded-2xl border border-violet-100/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60 sm:p-6">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-gray-500">{label}</p>

                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${accent}`}
                >
                    <Icon size={21} />
                </div>
            </div>

            <p className="mt-5 break-words text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {value}
            </p>

            <div className="mt-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                <p className="text-xs leading-5 text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function Dashboard({
    totalExpenses = 0,
    monthlyExpenses = 0,
    weeklyExpenses = 0,
    expenseCount = 0,
    recentExpenses = [],
    categoryExpenses = [],
}) {
    const maxCategoryTotal = Math.max(
        ...categoryExpenses.map((item) => Number(item.total || 0)),
        1
    );

    const stats = [
        {
            label: "Total Expenses",
            value: `₱${money(totalExpenses)}`,
            description: "All recorded spending",
            icon: Wallet,
            accent: "bg-violet-100 text-violet-700",
        },
        {
            label: "This Month",
            value: `₱${money(monthlyExpenses)}`,
            description: "Spending this month",
            icon: CalendarDays,
            accent: "bg-purple-100 text-purple-700",
        },
        {
            label: "This Week",
            value: `₱${money(weeklyExpenses)}`,
            description: "Spending this week",
            icon: CalendarRange,
            accent: "bg-fuchsia-100 text-fuchsia-700",
        },
        {
            label: "Recorded Expenses",
            value: Number(expenseCount || 0).toLocaleString("en-PH"),
            description: "Total expense records",
            icon: ReceiptText,
            accent: "bg-indigo-100 text-indigo-700",
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard - Monetra" />

            <div className="min-h-screen min-w-0 bg-[#faf8ff] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
                <div className="mx-auto max-w-7xl">
                    {/* Page heading */}
                    <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-700 shadow-sm">
                                Financial overview
                            </div>
                        </div>

                        <Link
                            href="/expenses"
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl"
                        >
                            <Plus size={18} />
                            Add an Expense
                        </Link>
                    </header>

                    {/* Welcome banner */}
                    <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-800 via-violet-700 to-purple-600 p-6 text-white shadow-xl shadow-violet-200/70 sm:p-9 lg:p-10">
                        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10" />
                        <div className="pointer-events-none absolute -right-3 -top-11 h-48 w-48 rounded-full border border-white/10" />
                        <div className="pointer-events-none absolute -bottom-24 right-28 h-48 w-48 rounded-full bg-purple-400/20 blur-2xl" />

                        <div className="relative z-10 max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-violet-100 backdrop-blur-sm">
                                <Wallet size={14} />
                                YOUR PERSONAL FINANCE SPACE
                            </div>

                            <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                                Make every peso
                                <br className="hidden sm:block" /> count.
                            </h2>

                            <p className="mt-4 max-w-lg text-sm leading-7 text-violet-100 sm:text-base">
                                Small steps today, better money habits
                                tomorrow. Track your expenses and understand
                                where your money goes.
                            </p>

                            <Link
                                href="/expenses"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-800 shadow-sm transition hover:bg-violet-50"
                            >
                                Manage my expenses
                                <ArrowUpRight size={17} />
                            </Link>
                        </div>
                    </section>

                    {/* Summary cards */}
                    <section className="mb-10">
                        <div className="mb-5">
                            <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                                Your Expense Overview
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                A quick summary of your financial activity.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {stats.map((stat) => (
                                <StatCard key={stat.label} {...stat} />
                            ))}
                        </div>
                    </section>

                    {/* Category breakdown */}
                    <section className="mb-8 rounded-3xl border border-violet-100/80 bg-white p-5 shadow-sm sm:p-7">
                        <SectionHeading
                            icon={ChartNoAxesColumn}
                            title="Expense Breakdown"
                            description="Compare spending across your categories this month."
                        />

                        {categoryExpenses.length === 0 ? (
                            <div className="rounded-2xl bg-violet-50/70 px-5 py-10 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-violet-500 shadow-sm">
                                    <ChartNoAxesColumn size={27} />
                                </div>

                                <p className="mt-4 font-bold text-gray-800">
                                    No expenses this month yet
                                </p>
                                <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-gray-500">
                                    Add your first expense to see your spending
                                    breakdown here.
                                </p>

                                <Link
                                    href="/expenses"
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700"
                                >
                                    <Plus size={17} />
                                    Add an Expense
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {categoryExpenses.map((item, index) => {
                                    const total = Number(item.total || 0);
                                    const percentage = Math.min(
                                        (total / maxCategoryTotal) * 100,
                                        100
                                    );
                                    const color =
                                        chartColors[index % chartColors.length];

                                    return (
                                        <div key={item.category}>
                                            <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                                                <div className="flex min-w-0 items-center gap-2.5">
                                                    <span
                                                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                                                        style={{
                                                            backgroundColor: color,
                                                        }}
                                                    />
                                                    <span className="break-words text-sm font-semibold text-gray-800">
                                                        {item.category}
                                                    </span>
                                                </div>

                                                <span className="text-sm font-bold text-violet-700">
                                                    ₱{money(total)}
                                                </span>
                                            </div>

                                            <div className="h-3 overflow-hidden rounded-full bg-violet-50">
                                                <div
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${percentage}%`,
                                                        background: `linear-gradient(90deg, ${color}, #c084fc)`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* Spending distribution */}
                    <section className="mb-8 rounded-3xl border border-violet-100/80 bg-white p-5 shadow-sm sm:p-7">
                        <SectionHeading
                            icon={ChartPie}
                            title="Spending Distribution"
                            description="See each category's share of your monthly expenses."
                        />

                        <DoughnutChart categories={categoryExpenses} />
                    </section>

                    {/* Recent expenses */}
                    <section className="mb-8 rounded-3xl border border-violet-100/80 bg-white p-5 shadow-sm sm:p-7">
                        <SectionHeading
                            icon={ReceiptText}
                            title="Recent Expenses"
                            description="Keep track of your latest recorded transactions."
                            action={
                                <Link
                                    href="/expenses"
                                    className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg px-3 py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-50 sm:self-center"
                                >
                                    View all
                                    <ArrowRight size={16} />
                                </Link>
                            }
                        />

                        {recentExpenses.length === 0 ? (
                            <div className="rounded-2xl bg-violet-50/70 px-5 py-10 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-violet-500 shadow-sm">
                                    <Coffee size={27} />
                                </div>
                                <p className="mt-4 font-bold text-gray-800">
                                    No expenses yet
                                </p>
                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                    Your recent expenses will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-2xl border border-violet-100">
                                <table className="w-full min-w-[600px] text-left">
                                    <thead>
                                        <tr className="border-b border-violet-100 bg-violet-50/80 text-xs font-bold uppercase tracking-wider text-gray-500">
                                            <th className="px-5 py-4">Expense</th>
                                            <th className="px-5 py-4">Category</th>
                                            <th className="px-5 py-4">Date</th>
                                            <th className="px-5 py-4 text-right">
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentExpenses.map((expense) => (
                                            <tr
                                                key={expense.id}
                                                className="border-b border-violet-50 transition last:border-0 hover:bg-violet-50/40"
                                            >
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                                                            <Wallet size={18} />
                                                        </div>
                                                        <span className="font-semibold text-gray-800">
                                                            {expense.name}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                                                        {expense.category || "Uncategorized"}
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                                                    {formatExpenseDate(
                                                        expense.expense_date
                                                    )}
                                                </td>

                                                <td className="whitespace-nowrap px-5 py-4 text-right font-bold text-violet-700">
                                                    ₱{money(expense.amount)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>

                    {/* Quick access */}
                    <section className="mb-8">
                        <div className="mb-5">
                            <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                                Quick Access
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Jump straight to the tools you use most.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <Link
                                href="/expenses"
                                className="group rounded-3xl border border-violet-100/80 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60 sm:p-7"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition group-hover:bg-violet-600 group-hover:text-white">
                                        <Wallet size={27} />
                                    </div>
                                    <ArrowUpRight
                                        size={21}
                                        className="text-gray-400 transition group-hover:text-violet-600"
                                    />
                                </div>

                                <h3 className="mt-5 text-lg font-bold text-gray-900 transition group-hover:text-violet-700">
                                    Manage Expenses
                                </h3>

                                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                    Record, edit, and organize your daily
                                    spending in one place.
                                </p>

                                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-violet-700">
                                    Open page
                                    <ArrowRight size={17} />
                                </span>
                            </Link>

                            <Link
                                href="/products"
                                className="group rounded-3xl border border-violet-100/80 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60 sm:p-7"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition group-hover:bg-violet-600 group-hover:text-white">
                                        <Package size={27} />
                                    </div>
                                    <ArrowUpRight
                                        size={21}
                                        className="text-gray-400 transition group-hover:text-violet-600"
                                    />
                                </div>

                                <h3 className="mt-5 text-lg font-bold text-gray-900 transition group-hover:text-violet-700">
                                    Manage Products
                                </h3>

                                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                    View and manage your existing product
                                    records with ease.
                                </p>

                                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-violet-700">
                                    Open page
                                    <ArrowRight size={17} />
                                </span>
                            </Link>
                        </div>
                    </section>

                    <footer className="border-t border-violet-100 py-6 text-center">
                        <p className="text-xs leading-5 text-gray-500">
                            © {new Date().getFullYear()} Monetra
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            Manage your money mindfully.
                        </p>
                    </footer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}