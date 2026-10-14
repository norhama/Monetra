export default function LandingStyles() {
    return (
        <style>{`
            html {
                scroll-behavior: smooth;
            }

            .reveal {
                opacity: 0;
                transform: translateY(24px);
                transition:
                    opacity 700ms ease,
                    transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1);
            }

            .reveal.reveal-visible {
                opacity: 1;
                transform: translateY(0);
            }

            .float-card {
                animation: float-card 6s ease-in-out infinite;
            }

            .float-small {
                animation: float-small 5s ease-in-out infinite;
            }

            .hero-orb {
                animation: orb-pulse 7s ease-in-out infinite alternate;
            }

            .shine-button {
                position: relative;
                overflow: hidden;
                isolation: isolate;
            }

            .shine-button::after {
                content: "";
                position: absolute;
                top: -50%;
                left: -80%;
                width: 45%;
                height: 200%;
                transform: rotate(25deg);
                background: rgba(255, 255, 255, 0.2);
                transition: left 600ms ease;
                z-index: -1;
            }

            .shine-button:hover::after {
                left: 140%;
            }

            .feature-card {
                transition:
                    transform 300ms ease,
                    border-color 300ms ease,
                    box-shadow 300ms ease;
            }

            .feature-card:hover {
                transform: translateY(-5px);
                border-color: #ddd6fe;
                box-shadow: 0 18px 35px rgba(76, 29, 149, 0.08);
            }

            .bounce-cta {
                animation: bounce-cta 2.4s ease-in-out infinite;
            }

            .bounce-cta:hover {
                animation-play-state: paused;
            }

            @keyframes float-card {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-8px);
                }
            }

            @keyframes float-small {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-10px);
                }
            }

            @keyframes orb-pulse {
                from {
                    transform: scale(1);
                    opacity: 0.6;
                }
                to {
                    transform: scale(1.12);
                    opacity: 1;
                }
            }

            @keyframes bounce-cta {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-5px);
                }
            }

            @media (prefers-reduced-motion: reduce) {
                html {
                    scroll-behavior: auto;
                }

                .reveal,
                .reveal.reveal-visible {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }

                .float-card,
                .float-small,
                .hero-orb,
                .bounce-cta {
                    animation: none;
                }

                .shine-button::after {
                    display: none;
                }

                .feature-card {
                    transition: none;
                }
            }
        `}</style>
    );
}