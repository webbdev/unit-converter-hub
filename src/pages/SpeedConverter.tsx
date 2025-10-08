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
    <div className="rounded-2xl bg-[#ddccc2] border border-black mt-2 mb-6 sm:my-7.5 p-6 sm:p-10 md:px-20 md:py-16">
      <div className="max-w-[620px] mx-auto text-center bg-[#fbf5ed] border rounded-2xl px-6 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">{speedData.title}</h1>
        <p className="text-center mx-auto mb-8 max-w-[440px]">
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
        <h2 className="text-xl font-semibold mb-6">{speedData.referenceValuesTitle}</h2>
        <pre className="bg-[#fbf5ed] mb-10 p-4 rounded-lg overflow-x-auto">
          {speedData.referenceValues.join("\n")}
        </pre>

        <h3 className="text-lg font-semibold mb-6">{speedData.examplesTitle}</h3>
        <ul>
          {speedData.examples.map((ex, i) => (
            <li key={i} className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-6">
              <p><b>{ex.title}</b></p>
              <p>Formula: <code>{ex.formula}</code></p>
              <p>Calculation: <code>{ex.calculation}</code></p>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-6">{speedData.usageTitle}</h2>
        <ul>
          {speedData.usage.map((u, i) => (
            <li key={i}><b>{u.title}</b> {u.description}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-6 mt-10">{speedData.funFactsTitle}</h2>
        <ul>
          {speedData.funFacts.map((f, i) => (
            <li key={i}><b>{f.title}</b> {f.description}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SpeedConverter;