import ConverterForm from "../components/ConverterForm";
import timeData from "../data/time.json";

const timeUnits = ["ms", "s", "min", "hr", "day"];

const toSeconds: Record<string, number> = {
  ms: 1 / 1000,
  s: 1,
  min: 60,
  hr: 3600,
  day: 86400
};

const convertTime = (value: number, from: string, to: string) => {
  const valueInSeconds = value * toSeconds[from];
  return valueInSeconds / toSeconds[to];
};

const TimeConverter = () => {
  return (
    <div className="rounded-2xl bg-[#ddccc2] border border-black mt-2 mb-6 sm:my-7.5 p-6 sm:p-10 md:px-20 md:py-16">
      <div className="max-w-[620px] mx-auto text-center bg-[#fbf5ed] border rounded-2xl px-6 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">{timeData.title}</h1>
        <p className="mb-8">{timeData.subtitle}</p>

        <ConverterForm
          units={timeUnits}
          defaultFrom="min"
          defaultTo="s"
          onConvert={convertTime}
        />
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-6">{timeData.referenceValuesTitle}</h2>
        <pre className="bg-[#fbf5ed] mb-10 p-4 rounded-lg overflow-x-auto">
          {timeData.referenceValues.join("\n")}
        </pre>

        <h3 className="text-lg font-semibold mb-6">{timeData.examplesTitle}</h3>
        <ul>
          {timeData.examples.map((ex, i) => (
            <li key={i} className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-6">
              <p><b>{ex.title}</b></p>
              <p>Formula: <code>{ex.formula}</code></p>
              <p>Calculation: <code>{ex.calculation}</code></p>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-6">{timeData.usageTitle}</h2>
        <ul>
          {timeData.usage.map((u, i) => (
            <li key={i}><b>{u.title}</b> {u.description}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-6 mt-10">{timeData.funFactsTitle}</h2>
        <ul>
          {timeData.funFacts.map((f, i) => (
            <li key={i}><b>{f.title}</b> {f.description}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TimeConverter;