import ConverterForm from "../components/ConverterForm";
import weightData from "../data/weight.json";

const weightUnits = ["mg", "g", "kg", "oz", "lb", "ton"];

const weightToKg: Record<string, number> = {
  mg: 0.000001,
  g: 0.001,
  kg: 1,
  oz: 0.0283495,
  lb: 0.453592,
  ton: 1000,
};

const convertWeight = (value: number, from: string, to: string) => {
  const valueInKg = value * weightToKg[from];
  return valueInKg / weightToKg[to];
};

const WeightConverter = () => {
  return (
    <div className="rounded-2xl bg-[#ddccc2] sm:border border-black mt-2 mb-6 sm:my-7.5 p-5.5 sm:p-10 md:px-20 md:py-16">
      <div className="max-w-[660px] mx-auto text-center bg-[#fbf5ed] sm:border rounded-2xl px-5.5 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">{weightData.title}</h1>
        <p className="text-center mx-auto max-w-[480px] mb-8">
          {weightData.subtitle}
        </p>

        <ConverterForm
          units={weightUnits}
          defaultFrom="kg"
          defaultTo="lb"
          onConvert={convertWeight}
        />
      </div>

      <section>
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">{weightData.referenceValuesTitle}</h2>
          <p className="mb-4">{}</p>
          <pre className="bg-[#fbf5ed] mb-10 p-4 rounded-lg overflow-x-auto">
            {weightData.referenceValues.join("\n")}
          </pre>

          <h3 className="text-lg font-semibold mb-5.5">{weightData.examplesTitle}</h3>
          <ul>
            {weightData.examples.map((ex, i) => (
              <li key={i} className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-6">
                <p className="mb-2"><b>{ex.title}</b></p>
                <p className="mb-0.5">Formula: <code>{ex.formula}</code></p>
                <p className="mb-0.5">Calculation: <code>{ex.calculation}</code></p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">{weightData.usageTitle}</h2>
          <ul>
            {weightData.usage.map((u, i) => (
              <li key={i} className="mb-4">
                <b>{u.title}</b> {u.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 sm:mb-0">
          <h2 className="text-xl font-semibold mb-5.5">
            {weightData.funFactsTitle}
            </h2>
          <ul>
            {weightData.funFacts.map((f, i) => (
              <li key={i} className="mb-4">
                <b>{f.title}</b> {f.description}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default WeightConverter;
