import ConverterForm from "../components/ConverterForm";
import temperatureData from "../data/temperature.json";

const temperatureUnits = ["C", "F", "K"];

// Conversion logic
const convertTemperature = (value: number, from: string, to: string) => {
  let celsiusValue: number;

  switch (from) {
    case "F":
      celsiusValue = (value - 32) * (5 / 9);
      break;
    case "K":
      celsiusValue = value - 273.15;
      break;
    default:
      celsiusValue = value;
  }

  switch (to) {
    case "F":
      return celsiusValue * (9 / 5) + 32;
    case "K":
      return celsiusValue + 273.15;
    default:
      return celsiusValue;
  }
};

const TemperatureConverter = () => {
  return (
    <div className="rounded-2xl bg-[#ddccc2] border border-black mt-2 mb-6 sm:my-7.5 p-6 sm:p-10 md:px-20 md:py-16">
      <div className="max-w-[620px] mx-auto text-center bg-[#fbf5ed] border rounded-2xl px-6 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">{temperatureData.title}</h1>
        <p className="mb-8">{temperatureData.subtitle}</p>

        <ConverterForm
          units={temperatureUnits}
          defaultFrom="C"
          defaultTo="F"
          onConvert={convertTemperature}
        />
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-6">{temperatureData.referenceValuesTitle}</h2>
        <pre className="bg-[#fbf5ed] mb-10 p-4 rounded-lg overflow-x-auto">
          {temperatureData.referenceValues.join("\n")}
        </pre>

        <h3 className="text-lg font-semibold mb-6">{temperatureData.examplesTitle}</h3>
        <ul>
          {temperatureData.examples.map((ex, i) => (
            <li key={i} className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-6">
              <p className="mb-1"><b>{ex.title}</b></p>
              <p>Formula: <code>{ex.formula}</code></p>
              <p>Calculation: <code>{ex.calculation}</code></p>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-6">{temperatureData.usageTitle}</h2>
        <ul>
          {temperatureData.usage.map((u, i) => (
            <li key={i}><b>{u.title}</b> {u.description}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-6 mt-10">{temperatureData.funFactsTitle}</h2>
        <ul>
          {temperatureData.funFacts.map((f, i) => (
            <li key={i}><b>{f.title}</b> {f.description}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TemperatureConverter;