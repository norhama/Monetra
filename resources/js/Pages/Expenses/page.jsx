import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Wallet, Plus, Search, Pencil, Trash2, CalendarDays } from "lucide-react";

export default function ExpensesPage({ expenses = [] }) {
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        name: "",
        category: "",
        amount: "",
        expense_date: new Date().toISOString().slice(0, 10),
    });

    const filteredExpenses = expenses.filter((expense) =>
        expense.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalExpenses = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    function submitExpense(e) {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                reset();
                setEditingId(null);
                setShowForm(false);
            },
        };

        if (editingId !== null) {
            put(`/expenses/${editingId}`, options);
        } else {
            post("/expenses", options);
        }
    }

    function editExpense(expense) {
        setEditingId(expense.id);
        setData({
            name: expense.name,
            category: expense.category,
            amount: String(expense.amount),
            expense_date: String(expense.expense_date).slice(0, 10),
        });
        setShowForm(true);
    }

    function cancelForm() {
        reset();
        setEditingId(null);
        setShowForm(false);
    }

    function deleteExpense(id, name) {
        if (window.confirm(`Delete ${name}?`)) {
            destroy(`/expenses/${id}`);
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Expense Management" />

            <div className="min-h-screen min-w-0 bg-violet-50 p-4 sm:p-8 lg:p-10">
                <div className="mx-auto max-w-7xl">
                    <header className="mb-8">
                        <p className="font-bold tracking-widest text-violet-600">
                            MONETRA
                        </p>

                        <h1 className="mt-2 flex flex-wrap items-center gap-2 text-3xl font-bold text-gray-900">
                            <Wallet size={30} className="text-violet-600" />
                            Expense Management
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Keep track of where your money goes.
                        </p>
                    </header>

                    <section className="mb-6 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">
                            Total Expenses
                        </p>

                        <p className="mt-2 break-words text-3xl font-bold text-violet-700">
                            ₱
                            {totalExpenses.toLocaleString("en-PH", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            {expenses.length} recorded expenses
                        </p>
                    </section>

                    <section className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm sm:p-6">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <h2 className="text-xl font-bold text-gray-800">
                                Your Expenses
                            </h2>

                            <button
                                type="button"
                                onClick={() => {
                                    if (showForm) {
                                        cancelForm();
                                    } else {
                                        setShowForm(true);
                                    }
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
                            >
                                {showForm ? (
                                    "Cancel"
                                ) : (
                                    <>
                                        <Plus size={18} />
                                        Add Expense
                                    </>
                                )}
                            </button>
                        </div>

                        {showForm && (
                            <form
                                onSubmit={submitExpense}
                                className="mt-6 rounded-xl border border-violet-200 bg-violet-50 p-4 sm:p-5"
                            >
                                <h3 className="mb-4 text-lg font-bold text-gray-800">
                                    {editingId !== null
                                        ? "Edit Expense"
                                        : "New Expense"}
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold">
                                            Expense Name
                                        </label>
                                        <input
                                            className="w-full min-w-0 rounded-lg border border-violet-200 bg-white p-3"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            placeholder="e.g. Coffee"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold">
                                            Category
                                        </label>
                                        <input
                                            className="w-full min-w-0 rounded-lg border border-violet-200 bg-white p-3"
                                            value={data.category}
                                            onChange={(e) =>
                                                setData("category", e.target.value)
                                            }
                                            placeholder="e.g. Food"
                                            required
                                        />
                                        {errors.category && (
                                            <p className="text-sm text-red-600">
                                                {errors.category}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold">
                                            Amount (₱)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="w-full min-w-0 rounded-lg border border-violet-200 bg-white p-3"
                                            value={data.amount}
                                            onChange={(e) =>
                                                setData("amount", e.target.value)
                                            }
                                            placeholder="e.g. 80"
                                            required
                                        />
                                        {errors.amount && (
                                            <p className="text-sm text-red-600">
                                                {errors.amount}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full min-w-0 rounded-lg border border-violet-200 bg-white p-3"
                                            value={data.expense_date}
                                            onChange={(e) =>
                                                setData(
                                                    "expense_date",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        {errors.expense_date && (
                                            <p className="text-sm text-red-600">
                                                {errors.expense_date}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-5 w-full rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50 sm:w-auto"
                                >
                                    {processing
                                        ? "Saving..."
                                        : editingId !== null
                                          ? "Update Expense"
                                          : "Save Expense"}
                                </button>
                            </form>
                        )}

                        <div className="relative mt-6">
                            <Search
                                size={19}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search expenses..."
                                className="w-full rounded-xl border border-violet-200 py-3 pl-10 pr-4 focus:border-violet-500 focus:outline-none"
                            />
                        </div>

                        <div className="mt-6 overflow-x-auto">
                            <table className="w-full min-w-[650px] text-left">
                                <thead>
                                    <tr className="border-b bg-violet-50 text-sm text-gray-600">
                                        <th className="p-4">Expense</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Amount</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredExpenses.map((expense) => (
                                        <tr
                                            key={expense.id}
                                            className="border-b hover:bg-violet-50/50"
                                        >
                                            <td className="p-4 font-semibold">
                                                {expense.name}
                                            </td>
                                            <td className="p-4">
                                                {expense.category}
                                            </td>
                                            <td className="whitespace-nowrap p-4">
                                                <span className="inline-flex items-center gap-2">
                                                    <CalendarDays
                                                        size={16}
                                                        className="text-violet-500"
                                                    />
                                                    {String(
                                                        expense.expense_date
                                                    ).slice(0, 10)}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap p-4 font-semibold text-violet-700">
                                                ₱
                                                {Number(
                                                    expense.amount
                                                ).toFixed(2)}
                                            </td>
                                            <td className="whitespace-nowrap p-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        editExpense(expense)
                                                    }
                                                    className="mr-3 inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
                                                >
                                                    <Pencil size={15} />
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteExpense(
                                                            expense.id,
                                                            expense.name
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-1 font-semibold text-red-500 hover:underline"
                                                >
                                                    <Trash2 size={15} />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {filteredExpenses.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="p-8 text-center text-gray-500"
                                            >
                                                No expenses found. Add your first
                                                expense!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}