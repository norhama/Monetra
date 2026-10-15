import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import Brand from "./Brand";

export default function Navbar({ user }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    const navLinkClass =
        "group relative w-fit py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 transition-colors duration-300 hover:text-violet-600";

    const underlineClass =
        "absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-violet-600 transition-transform duration-300 ease-out group-hover:scale-x-100";

    const buttonClass =
        "inline-flex items-center justify-center rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-wider transition duration-300";

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-violet-100/80 bg-white/95 shadow-sm backdrop-blur-xl">
                <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-6 py-5 sm:px-10 lg:px-16 xl:px-20">
                    <Brand />

                    <div className="hidden items-center gap-10 lg:flex xl:gap-14">
                        <a href="#about" className={navLinkClass}>
                            About
                            <span className={underlineClass} />
                        </a>

                        <a href="#features" className={navLinkClass}>
                            Explore
                            <span className={underlineClass} />
                        </a>

                        <a href="#how-it-works" className={navLinkClass}>
                            Guide
                            <span className={underlineClass} />
                        </a>
                    </div>

                    <div className="hidden items-center gap-4 lg:flex">
                        {user ? (
                            <Link
                                href="/dashboard"
                                className={`${buttonClass} shine-button bg-violet-600 text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700`}
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className={`${buttonClass} text-slate-700 hover:bg-violet-50 hover:text-violet-700`}
                                >
                                    Log In
                                </Link>

                                <Link
                                    href="/register"
                                    className={`${buttonClass} shine-button bg-violet-600 text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700`}
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="rounded-lg p-2 text-slate-700 transition hover:bg-violet-50 hover:text-violet-700 lg:hidden"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={23} /> : <Menu size={23} />}
                    </button>
                </nav>

                {menuOpen && (
                    <div className="border-t border-violet-100 bg-white px-6 py-6 lg:hidden">
                        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 sm:px-4">
                            <a
                                href="#about"
                                onClick={closeMenu}
                                className={navLinkClass}
                            >
                                About
                                <span className={underlineClass} />
                            </a>

                            <a
                                href="#features"
                                onClick={closeMenu}
                                className={navLinkClass}
                            >
                                Explore
                                <span className={underlineClass} />
                            </a>

                            <a
                                href="#how-it-works"
                                onClick={closeMenu}
                                className={navLinkClass}
                            >
                                Guide
                                <span className={underlineClass} />
                            </a>

                            {user ? (
                                <Link
                                    href="/dashboard"
                                    onClick={closeMenu}
                                    className={`${buttonClass} w-full bg-violet-600 text-white hover:bg-violet-700`}
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={closeMenu}
                                        className={`${buttonClass} w-full border border-violet-200 text-violet-700 hover:bg-violet-50`}
                                    >
                                        Log In
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={closeMenu}
                                        className={`${buttonClass} w-full bg-violet-600 text-white hover:bg-violet-700`}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <div aria-hidden="true" className="h-[76px]" />
        </>
    );
}