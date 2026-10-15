import { Head, usePage } from "@inertiajs/react";

import Navbar from "../Components/Landing/Navbar";
import Hero from "../Components/Landing/Hero";
import Features from "../Components/Landing/Features";
import HowItWorks from "../Components/Landing/HowItWorks";
import BottomCTA from "../Components/Landing/BottomCTA";
import Footer from "../Components/Landing/Footer";
import LandingStyles from "../Components/Landing/LandingStyles";

export default function Welcome() {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <>
            <Head title="Monetra" />

            <LandingStyles />

            <div id="top" className="min-h-screen overflow-hidden bg-white">
                <Navbar user={user} />

                <main>
                    <Hero user={user} />
                    <Features />
                    <HowItWorks />
                    <BottomCTA user={user} />
                </main>

                <Footer />
            </div>
        </>
    );
}