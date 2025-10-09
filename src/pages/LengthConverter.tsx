import ConverterForm from "../components/ConverterForm";
import lengthData from "../data/length.json";

const lengthUnits = ["mm", "cm", "m", "km", "inch", "foot", "yard", "mile"];

// Conversion factors to meters (base unit)
const lengthToMeters: Record<string, number> = {
	mm: 0.001,
	cm: 0.01,
	m: 1,
	km: 1000,
	inch: 0.0254,
	foot: 0.3048,
	yard: 0.9144,
	mile: 1609.34,
};

// Universal conversion function
const convertLength = (value: number, from: string, to: string) => {
	const valueInMeters = value * lengthToMeters[from];
	return valueInMeters / lengthToMeters[to];
};

const LengthConverter = () => {
	return (
		<>
			<div className="rounded-2xl bg-[#ddccc2] sm:border border-black mt-2 mb-6 sm:my-7.5 p-5.5 sm:p-10 md:px-20 md:py-16">
				<div className="">
					<div className="max-w-[620px] mx-auto text-center bg-[#fbf5ed] sm:border rounded-2xl px-6 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
						<h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
							{lengthData.title}
						</h1>
						<p className="text-center mx-auto mb-8 max-w-[480px]">
							{lengthData.subtitle}
						</p>

						<ConverterForm
							units={lengthUnits}
							defaultFrom="inch"
							defaultTo="cm"
							onConvert={convertLength}
						/>
					</div>

					{/* Reference Values */}
					<section className="">
						<div className="mb-10">
							<h2 className="text-xl font-semibold mb-5.5">{lengthData.referenceValuesTitle}</h2>
							<p className="mb-4">{lengthData.referenceValuesDescription}</p>
							<pre className="bg-[#fbf5ed] mb-10 p-4 rounded-lg overflow-x-auto">
								{lengthData.referenceValues.join("\n")}
							</pre>

							{/* Examples */}
							<h3 className="text-lg font-semibold mb-5.5">{lengthData.examplesTitle}</h3>
							<p className="mb-4">{lengthData.examplesDescription}</p>
							<ul className="">
								{lengthData.examples.map((ex, i) => (
									<li key={i} className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-6">
										<p className="mb-2"><b>{ex.title}:</b></p>
										<div className="">
											<p className="mb-0.5">Formula: <code>{ex.formula}</code></p>
											<p className="mb-0.5">Calculation: <code>{ex.calculation}</code></p>
										</div>
									</li>
								))}
							</ul>
						</div>

						{/* Usage */}
						<div className="mb-10">
							<h2 className="text-xl font-semibold mb-5.5">{lengthData.usageTitle}</h2>
							<ul>
								{lengthData.usage.map((u, i) => (
									<li key={i} className="mb-4">
										<b>{u.title}</b> {u.description}
									</li>
								))}
							</ul>
						</div>

						{/* Fun Facts */}
						<div className="">
							<h2 className="text-xl font-semibold mb-5.5">
								{lengthData.funFactsTitle}
							</h2>
							<ul>
								{lengthData.funFacts.map((fact, i) => (
									<li key={i} className="mb-4">
										<b>{fact.title}:</b> {fact.description}
									</li>
								))}
							</ul>
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default LengthConverter;