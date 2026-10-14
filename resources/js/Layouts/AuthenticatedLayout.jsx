import React, { useEffect, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Wallet,
    Package,
    UserRound,
    House,
    PanelLeftClose,
    PanelLeftOpen,
    LogOut,
    Menu,
    X,
    Coins,
} from "lucide-react";

export default function AuthenticatedLayout({ children, header }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const currentUrl = usePage().url;

    const [sidebarOpen, setSidebarOpen] = useState(() => {
        if (typeof window === "undefined") return true;

        return window.localStorage.getItem("monetra-sidebar") !== "closed";
    });

    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        window.localStorage.setItem(
            "monetra-sidebar",
            sidebarOpen ? "open" : "closed"
        );
    }, [sidebarOpen]);

    useEffect(() => {
        setMobileOpen(false);
    }, [currentUrl]);

    const navigation = [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Expenses", href: "/expenses", icon: Wallet },
        { label: "Products", href: "/products", icon: Package },
        { label: "My Profile", href: "/profile", icon: UserRound },
        { label: "Home Page", href: "/", icon: House },
    ];

    const isActive = (href) =>
        href === "/"
            ? currentUrl === "/"
            : currentUrl === href || currentUrl.startsWith(`${href}/`);

    const logout = () => router.post("/logout");

    function SidebarContent({ mobile = false }) {
        const expanded = mobile || sidebarOpen;

        return (
            <div className="flex h-full min-h-0 flex-col overflow-y-auto">
                <div
                    className={`flex min-h-[84px] items-center border-b border-violet-100 ${
                        expanded
                            ? "gap-3 px-5"
                            : "justify-center px-2"
                    }`}
                >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white">
                        <Coins size={24} />
                    </div>

                    {expanded && (
                        <div className="min-w-0 flex-1">
                            <h1 className="text-xl font-extrabold tracking-tight text-violet-950">
                                Monetra
                            </h1>
                            <p className="text-xs text-gray-500">
                                Your money, your control
                            </p>
                        </div>
                    )}

                    {mobile && (
                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            className="ml-auto rounded-lg p-2 text-gray-500 hover:bg-violet-100"
                            aria-label="Close menu"
                        >
                            <X size={21} />
                        </button>
                    )}
                </div>

                <div className={expanded ? "px-4 pt-6" : "px-2 pt-6"}>
                    {expanded && (
                        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                            Main Menu
                        </p>
                    )}

                    <nav className="space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    title={!expanded ? item.label : undefined}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center rounded-xl py-3 text-sm font-semibold transition ${
                                        expanded
                                            ? "gap-3 px-3"
                                            : "justify-center px-2"
                                    } ${
                                        active
                                            ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                                            : "text-gray-600 hover:bg-violet-50 hover:text-violet-700"
                                    }`}
                                >
                                    <Icon size={20} className="shrink-0" />
                                    {expanded && <span>{item.label}</span>}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto border-t border-violet-100 p-3">
                    {user && (
                        <div
                            className={`mb-3 flex items-center rounded-xl bg-violet-50 p-2 ${
                                expanded ? "gap-3" : "justify-center"
                            }`}
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-200 font-bold text-violet-800">
                                {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>

                            {expanded && (
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-gray-800">
                                        {user.name}
                                    </p>
                                    <p className="truncate text-xs text-gray-500">
                                        {user.email}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={logout}
                        title={!expanded ? "Log Out" : undefined}
                        className={`flex w-full items-center rounded-xl py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 ${
                            expanded
                                ? "gap-3 px-3"
                                : "justify-center px-2"
                        }`}
                    >
                        <LogOut size={20} className="shrink-0" />
                        {expanded && <span>Log Out</span>}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title="Monetra" />

            <div className="min-h-screen bg-violet-50">
                {mobileOpen && (
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        onClick={() => setMobileOpen(false)}
                        className="fixed inset-0 z-40 bg-gray-950/40 md:hidden"
                    />
                )}

                {/* Desktop sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-30 hidden border-r border-violet-100 bg-white transition-[width] duration-300 md:block ${
                        sidebarOpen ? "w-64" : "w-20"
                    }`}
                >
                    <SidebarContent />
                </aside>

                {/* Mobile sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-violet-100 bg-white shadow-xl transition-transform duration-300 md:hidden ${
                        mobileOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }`}
                >
                    <SidebarContent mobile />
                </aside>

                {/* Page area */}
                <div
                    className={`min-h-screen min-w-0 transition-[margin] duration-300 ${
                        sidebarOpen ? "md:ml-64" : "md:ml-20"
                    }`}
                >
                    <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-3 border-b border-violet-100 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
                        <div className="flex min-w-0 items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setMobileOpen(true)}
                                className="shrink-0 rounded-xl p-2 text-violet-700 hover:bg-violet-100 md:hidden"
                                aria-label="Open navigation menu"
                            >
                                <Menu size={23} />
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setSidebarOpen((open) => !open)
                                }
                                className="hidden shrink-0 rounded-xl p-2 text-violet-700 hover:bg-violet-100 md:inline-flex"
                                aria-label={
                                    sidebarOpen
                                        ? "Collapse sidebar"
                                        : "Expand sidebar"
                                }
                                title={
                                    sidebarOpen
                                        ? "Hide Main Menu"
                                        : "Show Main Menu"
                                }
                            >
                                {sidebarOpen ? (
                                    <PanelLeftClose size={22} />
                                ) : (
                                    <PanelLeftOpen size={22} />
                                )}
                            </button>

                            <span className="truncate text-sm font-semibold text-gray-600 sm:text-base">
                                {navigation.find((item) =>
                                    isActive(item.href)
                                )?.label || "Monetra"}
                            </span>
                        </div>

                        {user && (
                            <span className="max-w-36 shrink-0 truncate text-sm font-semibold text-gray-700 sm:max-w-none">
                                Hi, {user.name}
                            </span>
                        )}
                    </header>

                    {header && (
                        <div className="px-4 pt-6 sm:px-6">
                            {header}
                        </div>
                    )}

                    <main className="min-w-0">{children}</main>
                </div>
            </div>
        </>
    );
}