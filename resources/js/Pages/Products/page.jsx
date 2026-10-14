import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Package,
    Plus,
    Search,
    Pencil,
    Trash2,
    Tag,
    ArrowRight,
} from "lucide-react";

export default function ProductsPage({ products = [] }) {
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
        price: "",
    });

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    function addProduct(e) {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                reset();
                setEditingId(null);
                setShowForm(false);
            },
        };

        if (editingId !== null) {
            put(`/products/${editingId}`, options);
        } else {
            post("/products", options);
        }
    }

    function cancelForm() {
        reset();
        setEditingId(null);
        setShowForm(false);
    }

    function editProduct(product) {
        setEditingId(product.id);

        setData({
            name: product.name,
            category: product.category,
            price: String(product.price),
        });

        setShowForm(true);
    }

    function deleteProduct(id, name) {
        if (window.confirm(`Delete ${name}?`)) {
            destroy(`/products/${id}`);
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Products Management" />

            <div className="min-h-screen min-w-0 bg-violet-50 p-4 sm:p-8 lg:p-10">
                <div className="mx-auto max-w-7xl">
                    <header className="mb-8">
                        <p className="font-semibold tracking-widest text-violet-600">
                            MONETRA
                        </p>

                        <h1 className="mt-2 flex flex-wrap items-center gap-2 text-3xl font-bold text-gray-900">
                            <Package size={30} className="text-violet-600" />
                            Products Management
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Manage your products and keep track of their prices.
                        </p>
                    </header>

                    <section className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm sm:p-6">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    Product List
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {products.length} products available
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    if (showForm) {
                                        cancelForm();
                                    } else {
                                        setShowForm(true);
                                    }
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
                            >
                                {showForm ? (
                                    "Cancel"
                                ) : (
                                    <>
                                        <Plus size={18} />
                                        Add Product
                                    </>
                                )}
                            </button>
                        </div>

                        {showForm && (
                            <form
                                onSubmit={addProduct}
                                className="mt-6 rounded-xl border border-violet-200 bg-violet-50 p-4 sm:p-5"
                            >
                                <h3 className="mb-4 text-lg font-bold text-gray-800">
                                    {editingId !== null
                                        ? "Edit Product"
                                        : "Add New Product"}
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Product Name
                                        </label>

                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            placeholder="e.g. Notebook"
                                            className="w-full min-w-0 rounded-lg border border-violet-200 bg-white px-3 py-3"
                                            required
                                        />

                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Category
                                        </label>

                                        <input
                                            type="text"
                                            value={data.category}
                                            onChange={(e) =>
                                                setData(
                                                    "category",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g. School Supplies"
                                            className="w-full min-w-0 rounded-lg border border-violet-200 bg-white px-3 py-3"
                                            required
                                        />

                                        {errors.category && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.category}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Price (₱)
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                            placeholder="e.g. 50"
                                            className="w-full min-w-0 rounded-lg border border-violet-200 bg-white px-3 py-3"
                                            required
                                        />

                                        {errors.price && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.price}
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
                                          ? "Update Product"
                                          : "Save Product"}
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
                                placeholder="Search product..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-violet-200 py-3 pl-10 pr-4 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                            />
                        </div>

                        <div className="mt-6 overflow-x-auto">
                            <table className="w-full min-w-[550px] text-left">
                                <thead>
                                    <tr className="border-b bg-violet-50 text-sm text-gray-600">
                                        <th className="px-4 py-4">Product Name</th>
                                        <th className="px-4 py-4">Category</th>
                                        <th className="px-4 py-4">Price</th>
                                        <th className="px-4 py-4">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="border-b last:border-0 hover:bg-violet-50/50"
                                        >
                                            <td className="px-4 py-4 font-semibold text-gray-800">
                                                {product.name}
                                            </td>

                                            <td className="px-4 py-4 text-gray-600">
                                                <span className="inline-flex items-center gap-2">
                                                    <Tag
                                                        size={15}
                                                        className="text-violet-500"
                                                    />
                                                    {product.category}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4 font-semibold text-violet-700">
                                                ₱
                                                {Number(product.price).toFixed(2)}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        editProduct(product)
                                                    }
                                                    className="mr-3 inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
                                                >
                                                    <Pencil size={15} />
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteProduct(
                                                            product.id,
                                                            product.name
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

                                    {filteredProducts.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-4 py-8 text-center text-gray-500"
                                            >
                                                No products found.
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