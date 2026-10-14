import { Head, Link, useForm } from "@inertiajs/react";
import {
    Coins,
    UserRound,
    Mail,
    LockKeyhole,
    ArrowLeft,
    ArrowRight,
} from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("register"));
    }

    return (
        <>
            <Head title="Create Account - Monetra" />

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
                                Get Started
                            </p>

                            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
                                Create an Account
                            </h1>

                            <p className="mt-3 leading-6 text-gray-500">
                                Join Monetra and start managing your expenses
                                in one place.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Full Name
                                </label>

                                <div className="relative">
                                    <UserRound
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400"
                                    />

                                    <input
                                        id="name"
                                        type="text"
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full rounded-xl border border-violet-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

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
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="w-full rounded-xl border border-violet-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        placeholder="Create a password"
                                        required
                                    />
                                </div>

                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Confirm Password
                                </label>

                                <div className="relative">
                                    <LockKeyhole
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400"
                                    />

                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-xl border border-violet-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        placeholder="Repeat your password"
                                        required
                                    />
                                </div>

                                {errors.password_confirmation && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:from-violet-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing
                                    ? "Creating account..."
                                    : "Create Account"}

                                {!processing && <ArrowRight size={19} />}
                            </button>
                        </form>

                        <div className="my-7 border-t border-violet-100" />

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href={route("login")}
                                className="font-bold text-violet-600 hover:text-violet-800 hover:underline"
                            >
                                Log In
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