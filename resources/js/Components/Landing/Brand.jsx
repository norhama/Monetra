import { Link } from "@inertiajs/react";
import { Coins } from "lucide-react";

export default function Brand({ light = false }) {
    return (
        <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[17px] bg-violet-600 text-white shadow-md shadow-violet-500/20">
                <Coins size={27} strokeWidth={2.3} />
            </div>

            <div className="flex flex-col">
                <span
                    className={`text-[23px] font-semibold leading-tight tracking-tight ${
                        light ? "text-white" : "text-[#35106f]"
                    }`}
                >
                    Monetra
                </span>
            </div>
        </Link>
    );
}