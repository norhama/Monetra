
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Name"
                        className="font-semibold text-slate-700"
                    />

                    <TextInput
                        id="name"
                        className="mt-2 block w-full rounded-xl border-slate-300 bg-white text-slate-900 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="font-semibold text-slate-700"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-2 block w-full rounded-xl border-slate-300 bg-white text-slate-900 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Your email address is unverified.{" "}
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="font-medium text-violet-700 underline decoration-violet-300 underline-offset-4 transition hover:text-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-emerald-700">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-4">
                    <PrimaryButton
                        disabled={processing}
                        className="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white transition hover:bg-violet-700 focus:bg-violet-700 active:bg-violet-800"
                    >
                        {processing ? "Saving..." : "Save Changes"}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-medium text-emerald-700">
                            Changes saved successfully.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
