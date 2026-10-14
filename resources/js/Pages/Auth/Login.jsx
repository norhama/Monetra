import { Head, Link, useForm } from "@inertiajs/react";
import { Coins, Mail, LockKeyhole, ArrowLeft, ArrowRight } from "lucide-react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    function submit(e) {
        e.preventDefault();
        post(route("login"));
    }

    return (
        <>
            <Head title="Login - Monetra" />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-100 px-4 py-10">
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200">
                                <Coins size={27} />
                            </div>

                            <span className="text-3xl font-extrabold tracking-tight text-violet-950">
                                Monetra
                            </span>
                        </Link>

                        <p className="mt-2 text-sm text-gray-500">
                            Your money, your control.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-xl shadow-violet-200/40 sm:p-9">
                        <div className="mb-8">
                            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                                Welcome Back
                            </p>

                            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
                                Log in to Monetra
                            </h1>

                            <p className="mt-3 leading-6 text-gray-500">
                                Manage your expenses and keep track of your
                                money in one place.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400"
                                    />

                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="username"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="w-full rounded-xl border border-violet-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <LockKeyhole
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400"
                                    />

                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="w-full rounded-xl border border-violet-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>

                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-violet-300 text-violet-600 focus:ring-violet-500"
                                />
                                Remember me
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:from-violet-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? "Logging in..." : "Log In"}
                                {!processing && <ArrowRight size={19} />}
                            </button>
                        </form>

                        <div className="my-7 border-t border-violet-100" />

                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                href={route("register")}
                                className="font-bold text-violet-600 hover:text-violet-800 hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>

                    <Link
                        href="/"
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-violet-700"
                    >
                        <ArrowLeft size={17} />
                        Back to Home
                    </Link>

                    <p className="mt-6 text-center text-xs text-gray-400">
                        © {new Date().getFullYear()} Monetra. Manage your
                        money mindfully.
                    </p>
                </div>
            </div>
        </>
    );
}