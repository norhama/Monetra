import { UserPlus, ClipboardList, ChartNoAxesCombined } from "lucide-react";
import Reveal from "./Reveal";

const steps = [
    {
        number: "01",
        icon: UserPlus,
        title: "Create an account",
        description:
            "Register your account so you can access your own records.",
    },
    {
        number: "02",
        icon: ClipboardList,
        title: "Add your records",
        description:
            "Record your expenses and manage your product information.",
    },
    {
        number: "03",
        icon: ChartNoAxesCombined,
        title: "Check your summary",
        description:
            "View your dashboard and understand where your money goes.",
    },
];

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="scroll-mt-24 bg-violet-50/70 py-20 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <p className="text-4xl font-bold uppercase tracking-wide text-violet-600">
                        Simple steps
                    </p>

                    <p className="mt-4 leading-7 text-slate-600">
                        Start organizing your records in just a few steps.
                    </p>
                </Reveal>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <Reveal
                                key={step.number}
                                delay={index * 100}
                            >
                                <div className="h-full rounded-2xl border border-violet-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-900/5 sm:p-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-extrabold tracking-widest text-violet-300">
                                            {step.number}
                                        </span>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                                            <Icon size={23} />
                                        </div>
                                    </div>

                                    <h3 className="mt-6 text-xl font-bold text-slate-900">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {step.description}
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