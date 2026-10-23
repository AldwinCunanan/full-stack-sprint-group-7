import { useState } from "react";
 
export function useFormInput(initialValue: string = "") {
    const [value, setValue] = useState(initialValue);
    const [message, setMessage] = useState("");
 
    function validate(
        callback: (value: string) => string): boolean {
            const result  = callback(value);
            setMessage(result);
            return result === "";
        }
 
    return {
        value,
        setValue,
        message,
        setMessage,
        validate
    };
}