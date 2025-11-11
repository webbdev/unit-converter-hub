import { useState } from "react";

type ConverterFormProps = {
	units: string[];
	defaultFrom: string;
	defaultTo: string;
	onConvert: (value: number, from: string, to: string) => number;
};

const ConverterForm = ({ units, defaultFrom, defaultTo, onConvert }: ConverterFormProps) => {
	const [value, setValue] = useState("1");
	const [fromUnit, setFromUnit] = useState(defaultFrom);
	const [toUnit, setToUnit] = useState(defaultTo);

	const convert = (val: number) => onConvert(val, fromUnit, toUnit);

	const formatResult = (num: number) => {
		if (isNaN(num)) return "";
		const rounded = Math.round((num + Number.EPSILON) * 1_000_000) / 1_000_000;
		return rounded.toString();
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Input */}
			<div className="text-left">
				<label className="block text-sm font-medium mb-2">Enter Value</label>
				<input
					type="number"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className="p-3 w-full rounded-lg border border-black"
				/>
			</div>

			{/* Unit selectors */}
			<div className="flex gap-4 text-left">
				<div className="flex-1">
					<label className="block text-sm font-medium mb-2">From</label>
					<select
						value={fromUnit}
						onChange={(e) => setFromUnit(e.target.value)}
						className="px-3 py-3.5 w-full rounded-lg border border-black"
					>
						{units.map((unit) => (
							<option key={unit} value={unit}>
								{unit}
							</option>
						))}
					</select>
				</div>
				<div className="flex-1">
					<label className="block text-sm font-medium mb-2">To</label>
					<select
						value={toUnit}
						onChange={(e) => setToUnit(e.target.value)}
						className="px-3 py-3.5 w-full rounded-lg border border-black"
					>
						{units.map((unit) => (
							<option key={unit} value={unit}>
								{unit}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Result */}
			<div className="text-center mt-1.5 sm:mt-3.5">
				<span className="block bg-[#fbf5ed] rounded-lg text-lg sm:text-xl font-bold overflow-x-auto py-3">
					Result:{" "}
					{value ? formatResult(convert(Number(value))) : "-"} {toUnit}
				</span>
			</div>
		</div>
	);
};

export default ConverterForm;