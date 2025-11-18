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
    <div className="rounded-2xl bg-[#ddccc2] sm:border border-black mt-2 mb-6 sm:my-7.5 p-5.5 sm:p-10 md:px-20 md:py-16">
      <div className="max-w-[660px] mx-auto text-center bg-[#fbf5ed] sm:border rounded-2xl px-5.5 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">{timeData.title}</h1>
        <p className="text-center mx-auto max-w-[480px] mb-8">{timeData.subtitle}</p>

        <ConverterForm
          units={timeUnits}
          defaultFrom="min"
          defaultTo="s"
          onConvert={convertTime}
        />
      </div>

      <section>
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">{timeData.referenceValuesTitle}</h2>
          <pre className="bg-[#fbf5ed] mb-10 p-4 rounded-lg overflow-x-auto">
            {timeData.referenceValues.join("\n")}
          </pre>

          <h3 className="text-lg font-semibold mb-5.5">{timeData.examplesTitle}</h3>
          <ul>
            {timeData.examples.map((ex, i) => (
              <li key={i} className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-6">
                <p className="mb-2"><b>{ex.title}</b></p>
                <p className="mb-0.5">Formula: <code>{ex.formula}</code></p>
                <p className="mb-0.5">Calculation: <code>{ex.calculation}</code></p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">{timeData.usageTitle}</h2>
          <ul>
            {timeData.usage.map((u, i) => (
              <li key={i} className="mb-4"><b>{u.title}</b> {u.description}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6 sm:mb-0">
          <h2 className="text-xl font-semibold mb-5.5">{timeData.funFactsTitle}</h2>
          <ul>
            {timeData.funFacts.map((f, i) => (
              <li key={i} className="mb-2"><b>{f.title}</b> {f.description}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TimeConverter;