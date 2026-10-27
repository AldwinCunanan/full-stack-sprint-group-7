import { useState } from "react";

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