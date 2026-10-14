
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm font-medium text-violet-600">
                        ACCOUNT SETTINGS
                    </p>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-violet-950">
                        My Profile
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Manage your personal information and account security.
                    </p>
                </div>
            }
        >
            <Head title="My Profile" />

            <div className="min-h-screen bg-violet-50/60 py-10 sm:py-12">
                <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white p-5 shadow-sm sm:p-8">
                        <div className="mb-6 border-b border-violet-100 pb-5">
                            <h3 className="text-lg font-bold text-violet-950">
                                Profile Information
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Update your name and email address.
                            </p>
                        </div>

                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white p-5 shadow-sm sm:p-8">
                        <div className="mb-6 border-b border-violet-100 pb-5">
                            <h3 className="text-lg font-bold text-violet-950">
                                Password and Security
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Keep your account secure by using a strong password.
                            </p>
                        </div>

                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-red-100 bg-white p-5 shadow-sm sm:p-8">
                        <div className="mb-6 border-b border-red-100 pb-5">
                            <h3 className="text-lg font-bold text-red-700">
                                Delete Account
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Permanently remove your account and its associated data.
                            </p>
                        </div>

                        <DeleteUserForm className="max-w-xl" />
                    </div>

                    <p className="px-1 text-center text-xs text-slate-400">
                        Monetra · Your money, your control.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
