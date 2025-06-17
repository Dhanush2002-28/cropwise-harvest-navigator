import { useState } from "react";

interface NPKInputProps {
    onChange: (npk: { n: number; p: number; k: number }) => void;
}

const NPKInput = ({ onChange }: NPKInputProps) => {
    const [npk, setNpk] = useState({ n: 0, p: 0, k: 0 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updated = { ...npk, [name]: Number(value) };
        setNpk(updated);
        onChange(updated);
    };

    return (
        <div className="glass rounded-xl p-6 mb-8 card-shine">
            <h3 className="text-xl font-semibold mb-4">NPK Values</h3>
            <h4 className="text-l font-semibold mb-4">
                Enter the values for Nitrogen(N), Phosphorous(P) and Potassium(K)
            </h4>
            <div className="flex gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">N</label>
                    <input
                        type="number"
                        name="n"
                        value={npk.n}
                        onChange={handleChange}
                        className="w-20 p-2 border rounded-md bg-background text-foreground dark:bg-white/10 dark:text-white"
                        min={0}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">P</label>
                    <input
                        type="number"
                        name="p"
                        value={npk.p}
                        onChange={handleChange}
                        className="w-20 p-2 border rounded-md bg-background text-foreground dark:bg-white/10 dark:text-white"
                        min={0}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">K</label>
                    <input
                        type="number"
                        name="k"
                        value={npk.k}
                        onChange={handleChange}
                        className="w-20 p-2 border rounded-md bg-background text-foreground dark:bg-white/10 dark:text-white"
                        min={0}
                    />
                </div>
            </div>
        </div>
    );
};

export default NPKInput;
