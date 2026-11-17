import { useState } from "react";

/*
 * Manages an input's value and validation message so forms can reuse this logic.
 *
 * @param initialValue The starting input value. Defaults to an empty string.
 * @returns The value, message, their setters, and a validation function.
 */
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