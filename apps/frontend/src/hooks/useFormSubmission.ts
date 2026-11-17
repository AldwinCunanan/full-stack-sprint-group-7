import { useState } from "react";

/*
 * Clears previous errors, runs a submit action, and stores any Error message.
 * Keeps submission handling reusable across forms.
 *
 * @param submitAction The async function to run when submitting.
 * @returns handleSubmit, which reports success or failure, and formMessages.
 */
function useFormSubmit(submitAction: () => Promise<void>) {
    const [formMessages, setFormMessages] = useState<string[]>([]);

    const handleSubmit = async () => {
        setFormMessages([]);

        try {
            await submitAction();
            return true;
        } catch (error) {
            if (error instanceof Error) {
                setFormMessages([error.message]);
            }

            return false;
        }
    };

    return { handleSubmit, formMessages };
}

export default useFormSubmit;