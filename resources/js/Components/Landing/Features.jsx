import {
    Wallet,
    BarChart3,
    CreditCard,
    PieChart,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";
import Reveal from "./Reveal";

const features = [
    {
        icon: Wallet,
        title: "Track expenses",
        description:
            "Add, edit, and delete expense records whenever you need.",
        color: "bg-violet-100 text-violet-700",
    },
    {
        icon: BarChart3,
        title: "View your summary",
        description:
            "Check your spending totals and see how your expenses are divided.",
        color: "bg-purple-100 text-purple-700",
    },
    {
        icon: CreditCard,
        title: "Manage products",
        description:
            "Keep your product information organized and easy to update.",
        color: "bg-indigo-100 text-indigo-700",
    },
    {
        icon: PieChart,
        title: "Understand categories",
        description:
            "See which expense categories take up your spending.",
        color: "bg-fuchsia-100 text-fuchsia-700",
    },
    {
        icon: ShieldCheck,
        title: "Private account",
        description:
            "Sign in to manage your own records and account details.",
        color: "bg-blue-100 text-blue-700",
    },
    {
        icon: TrendingUp,
        title: "Stay organized",
        description:
            "Keep your financial records together and easier to review.",
        color: "bg-violet-100 text-violet-700",
    },
];

export default function Features() {
    return (
        <section
            id="features"
            className="scroll-mt-24 bg-white py-20 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <p className="text-4xl font-bold uppercase tracking-wide text-violet-600">
                        What you can do
                    </p>

                    <p className="mt-3 leading-7 text-slate-600">
                        Manage your records without making things complicated.
                    </p>
                </Reveal>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <Reveal
                                key={feature.title}
                                delay={index * 70}
                            >
                                <div className="feature-card h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color}`}
                                    >
                                        <Icon size={23} />
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}