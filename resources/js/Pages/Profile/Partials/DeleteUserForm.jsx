
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <p className="text-sm leading-6 text-slate-600">
                Deleting your account will permanently remove your account and
                its associated data. Make sure you have saved any information
                you may need before continuing.
            </p>

            <DangerButton
                onClick={confirmUserDeletion}
                className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700 focus:bg-red-700 active:bg-red-800"
            >
                Delete Account
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form
                    onSubmit={deleteUser}
                    className="rounded-2xl bg-white p-6"
                >
                    <h2 className="text-lg font-bold text-violet-950">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        This action is permanent. All your account resources
                        and data will be deleted. Enter your password to
                        confirm.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="delete_password"
                            value="Password"
                            className="font-semibold text-slate-700"
                        />

                        <TextInput
                            id="delete_password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-2 block w-full rounded-xl border-slate-300 bg-white text-slate-900 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                            isFocused
                            autoComplete="current-password"
                            placeholder="Enter your password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex flex-wrap justify-end gap-3">
                        <SecondaryButton
                            type="button"
                            onClick={closeModal}
                            className="rounded-xl"
                        >
                            Cancel
                        </SecondaryButton>

                        <DangerButton
                            disabled={processing}
                            className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
                        >
                            {processing ? "Deleting..." : "Delete Account"}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
