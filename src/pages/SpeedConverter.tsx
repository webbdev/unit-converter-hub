import ConverterForm from "../components/ConverterForm";
import speedData from "../data/speed.json";

const speedUnits = ["m/s", "km/h", "mph", "knots"];

const toMetersPerSecond: Record<string, number> = {
  "m/s": 1,
  "km/h": 1 / 3.6,
  "mph": 0.44704,
  "knots": 0.514444
};

const convertSpeed = (value: number, from: string, to: string) => {
  const valueInMps = value * toMetersPerSecond[from];
  return valueInMps / toMetersPerSecond[to];
};

const SpeedConverter = () => {
  return (
    <div className="rounded-2xl bg-[#ddccc2] sm:border border-black mt-2 mb-6 sm:my-7.5 p-5.5 sm:p-10 md:px-20 md:py-16">
      <div className="max-w-[660px] mx-auto text-center bg-[#fbf5ed] sm:border rounded-2xl px-5.5 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">{speedData.title}</h1>
        <p className="text-center mx-auto max-w-[440px] mb-8">
          {speedData.subtitle}
        </p>

        <ConverterForm
          units={speedUnits}
          defaultFrom="km/h"
          defaultTo="mph"
          onConvert={convertSpeed}
        />
      </div>

      <section>
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">{speedData.referenceValuesTitle}</h2>
          <pre className="bg-[#fbf5ed] mb-10 p-4 rounded-lg overflow-x-auto">
            {speedData.referenceValues.join("\n")}
          </pre>

          <h3 className="text-lg font-semibold mb-5.5">{speedData.examplesTitle}</h3>
          <ul>
            {speedData.examples.map((ex, i) => (
              <li key={i} className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-6">
                <p className="mb-2"><b>{ex.title}</b></p>
                <p className="mb-0.5">Formula: <code>{ex.formula}</code></p>
                <p className="mb-0.5">Calculation: <code>{ex.calculation}</code></p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">{speedData.usageTitle}</h2>
          <ul>
            {speedData.usage.map((u, i) => (
              <li key={i}><b>{u.title}</b> {u.description}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6 sm:mb-0">
          <h2 className="text-xl font-semibold mb-5.5">{speedData.funFactsTitle}</h2>
          <ul>
            {speedData.funFacts.map((f, i) => (
              <li key={i} className="mb-4"><b>{f.title}</b> {f.description}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default SpeedConverter;