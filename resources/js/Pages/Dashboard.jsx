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

function DoughnutChart({ categories }) {
    const total = categories.reduce(
        (sum, item) => sum + Number(item.total || 0),
        0
    );

    if (!categories.length || total <= 0) {
        return (
            <div className="flex min-h-56 flex-col items-center justify-center text-center">
                <ChartPie size={36} className="text-violet-400" />
                <p className="mt-3 font-semibold text-gray-800">
                    No chart data available
                </p>
                <p className="mt-1 text-sm text-gray-500">
                    Record expenses to see your spending distribution.
                </p>
            </div>
        );
    }

    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    let accumulated = 0;

    const segments = categories.map((item, index) => {
        const amount = Number(item.total || 0);
        const percentage = (amount / total) * 100;
        const dashLength = (amount / total) * circumference;
        const offset = accumulated;
        accumulated += dashLength;

        return {
            ...item,
            amount,
            percentage,
            dashLength,
            offset,
            color: chartColors[index % chartColors.length],
        };
    });

    return (
        <div className="flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:justify-center">
            <div className="relative h-52 w-52 shrink-0">
                <svg
                    viewBox="0 0 180 180"
                    role="img"
                    aria-label="Doughnut chart showing expense distribution by category"
                    className="h-full w-full -rotate-90"
                >
                    <circle
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke="#ede9fe"
                        strokeWidth="24"
                    />

                    {segments.map((segment) => (
                        <circle
                            key={segment.category}
                            cx="90"
                            cy="90"
                            r={radius}
                            fill="none"
                            stroke={segment.color}
                            strokeWidth="24"
                            strokeDasharray={`${segment.dashLength} ${circumference - segment.dashLength}`}
                            strokeDashoffset={-segment.offset}
                            strokeLinecap="butt"
                        >
                            <title>
                                {segment.category}: ₱{money(segment.amount)} (
                                {segment.percentage.toFixed(1)}%)
                            </title>
                        </circle>
                    ))}
                </svg>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm text-gray-500">
                        Total this month
                    </span>
                    <span className="mt-1 max-w-full break-all px-2 text-center text-lg font-extrabold text-violet-700">
                        ₱{money(total)}
                    </span>
                </div>
            </div>

            <div className="w-full min-w-0 space-y-3">
                {segments.map((segment) => (
                    <div
                        key={segment.category}
                        className="flex items-start justify-between gap-3"
                    >
                        <div className="flex min-w-0 items-start gap-2">
                            <span
                                className="mt-1.5 h-3 w-3 shrink-0 rounded-sm"
                                style={{ backgroundColor: segment.color }}
                            />
                            <div className="min-w-0">
                                <p className="break-words text-sm font-semibold text-gray-800">
                                    {segment.category}
                                </p>
                                <p className="text-xs text-gray-500">
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

export default function Dashboard({
    totalExpenses = 0,
    monthlyExpenses = 0,
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
            description: "All your recorded expenses",
            Icon: Wallet,
        },
        {
            label: "This Month",
            value: `₱${money(monthlyExpenses)}`,
            description: "Expenses recorded this month",
            Icon: CalendarDays,
        },
        {
            label: "Recorded Expenses",
            value: expenseCount,
            description: "Total expense records",
            Icon: ReceiptText,
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard - Monetra" />

            <div className="min-h-screen min-w-0 bg-violet-50 p-5 sm:p-8 lg:p-10">
                <div className="mx-auto max-w-6xl">
                    <header className="mb-8">
                        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                            Overview
                        </p>

                        <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Your Dashboard
                        </h1>

                        <p className="mt-3 text-gray-600">
                            Understand your spending and build better money habits.
                        </p>
                    </header>

                    <section className="mb-8 rounded-3xl bg-gradient-to-r from-violet-700 to-purple-500 p-6 text-white shadow-lg sm:p-9">
                        <p className="text-sm font-semibold text-violet-100">
                            YOUR PERSONAL FINANCE SPACE
                        </p>

                        <h2 className="mt-3 max-w-2xl text-2xl font-bold sm:text-3xl">
                            Small steps today, better money habits tomorrow.
                        </h2>

                        <p className="mt-3 max-w-xl leading-6 text-violet-100">
                            Every expense you record helps you understand where
                            your money goes.
                        </p>

                        <Link
                            href="/expenses"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-violet-700 transition hover:bg-violet-100"
                        >
                            <Plus size={18} />
                            Add an Expense
                        </Link>
                    </section>

                    <section className="mb-8">
                        <h2 className="mb-4 text-xl font-bold text-gray-900">
                            Your Expense Overview
                        </h2>

                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {stats.map(({ label, value, description, Icon }) => (
                                <div
                                    key={label}
                                    className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm font-medium text-gray-500">
                                            {label}
                                        </p>

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                                            <Icon size={22} />
                                        </div>
                                    </div>

                                    <p className="mt-4 break-words text-2xl font-extrabold text-violet-700 sm:text-3xl">
                                        {value}
                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">
                                        {description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-8 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm sm:p-7">
                        <div className="mb-6 flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                                <ChartPie size={22} />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Expense Breakdown by Category
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    See where your money goes this month.
                                </p>
                            </div>
                        </div>

                        {categoryExpenses.length === 0 ? (
                            <div className="py-8 text-center">
                                <ChartNoAxesColumn
                                    size={34}
                                    className="mx-auto text-violet-400"
                                />

                                <p className="mt-3 font-semibold text-gray-800">
                                    No expenses this month yet
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Record an expense to see your category breakdown.
                                </p>

                                <Link
                                    href="/expenses"
                                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
                                >
                                    <Plus size={18} />
                                    Add an Expense
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {categoryExpenses.map((item) => {
                                    const total = Number(item.total || 0);
                                    const percentage = Math.min(
                                        (total / maxCategoryTotal) * 100,
                                        100
                                    );

                                    return (
                                        <div key={item.category}>
                                            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                                <span className="font-semibold text-gray-800">
                                                    {item.category}
                                                </span>

                                                <span className="font-bold text-violet-700">
                                                    ₱{money(total)}
                                                </span>
                                            </div>

                                            <div className="h-3 overflow-hidden rounded-full bg-violet-100">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-purple-400 transition-all duration-500"
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    <section className="mb-8 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm sm:p-7">
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Spending Distribution
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Compare each category's share of this month's expenses.
                                </p>
                            </div>
                        </div>

                        <DoughnutChart categories={categoryExpenses} />
                    </section>

                    <section className="mb-8 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm sm:p-7">
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Recent Expenses
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Your latest recorded spending.
                                </p>
                            </div>

                            <Link
                                href="/expenses"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:underline"
                            >
                                View all
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        {recentExpenses.length === 0 ? (
                            <div className="py-8 text-center">
                                <Coffee
                                    size={34}
                                    className="mx-auto text-violet-400"
                                />

                                <p className="mt-3 font-semibold text-gray-800">
                                    No expenses yet
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Add your first expense to see it here.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[560px] text-left">
                                    <thead>
                                        <tr className="border-b bg-violet-50 text-sm text-gray-600">
                                            <th className="p-3">Expense</th>
                                            <th className="p-3">Category</th>
                                            <th className="p-3">Date</th>
                                            <th className="p-3 text-right">
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentExpenses.map((expense) => (
                                            <tr
                                                key={expense.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="p-3 font-semibold text-gray-800">
                                                    {expense.name}
                                                </td>

                                                <td className="p-3 text-gray-600">
                                                    {expense.category}
                                                </td>

                                                <td className="whitespace-nowrap p-3 text-gray-600">
                                                    {String(
                                                        expense.expense_date
                                                    ).slice(0, 10)}
                                                </td>

                                                <td className="whitespace-nowrap p-3 text-right font-semibold text-violet-700">
                                                    ₱{money(expense.amount)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>

                    <section>
                        <h2 className="mb-4 text-xl font-bold text-gray-900">
                            Quick Access
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">
                            <Link
                                href="/expenses"
                                className="group rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                                    <Wallet size={28} />
                                </div>

                                <h3 className="mt-5 text-xl font-bold text-gray-900 group-hover:text-violet-700">
                                    Manage Expenses
                                </h3>

                                <p className="mt-2 leading-6 text-gray-600">
                                    Record, edit, and organize your daily spending.
                                </p>

                                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-violet-700">
                                    Open page
                                    <ArrowRight size={17} />
                                </span>
                            </Link>

                            <Link
                                href="/products"
                                className="group rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                                    <Package size={28} />
                                </div>

                                <h3 className="mt-5 text-xl font-bold text-gray-900 group-hover:text-violet-700">
                                    Manage Products
                                </h3>

                                <p className="mt-2 leading-6 text-gray-600">
                                    View and manage your product records.
                                </p>

                                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-violet-700">
                                    Open page
                                    <ArrowRight size={17} />
                                </span>
                            </Link>
                        </div>
                    </section>

                    <footer className="mt-8 pb-4 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} Monetra. Manage your
                        money mindfully.
                    </footer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}