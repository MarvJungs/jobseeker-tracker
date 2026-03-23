import { SelectHTMLAttributes } from "react";

type SelectInputProps<T> = {
    options: T[];
    value?: T;
    onChange: (value?: T) => void;

    getOptionValue: (option: T) => string | number;
    getOptionLabel: (option: T) => string;

    placeholder?: string;
    className?: string
}

export default function SelectInput<T>({
    options,
    value,
    onChange,
    getOptionValue,
    getOptionLabel,
    placeholder = "Select an Option",
    className = "",
    ...props
}: Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> & SelectInputProps<T>) {
    return (
        <select
            {...props}
            className="form-select"
            value={value ? String(getOptionValue(value)) : ""}
            onChange={(e) => {
                const selected = options.find(
                    (opt) => String(getOptionValue(opt)) === e.target.value
                );
                onChange(selected);
            }}
        >
            <option value={""}>{placeholder}</option>
            {options.map((option: T) => (
                <option
                    key={String(getOptionValue(option))}
                    value={String(getOptionValue(option))}
                >
                    {String(getOptionLabel(option))}
                </option>
            ))}
        </select>
    );
}