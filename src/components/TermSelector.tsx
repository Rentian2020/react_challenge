import type { Dispatch, SetStateAction } from "react";

interface TermSelectorProps {
    options: string[];
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}

const TermSelector = ({options, selected, setSelected}: TermSelectorProps) => (
    <div style={{display: "flex", gap: 8, marginBottom: 18}}>
        {options.map((op) => (
            <button
                key={op}
                onClick={() => setSelected(op)}
                style={{
                    padding: "7px 20px",
                    borderRadius: 8,
                    border: "1px solid #d1d5db",
                    background: op === selected ? "#2563eb" : "transparent",
                    color: op === selected ? "#fff" : "#6b7280",
                    fontWeight: op === selected ? 600 : 400,
                }}
            >
                {op}
            </button>
        ))}
    </div>
);

export default TermSelector;