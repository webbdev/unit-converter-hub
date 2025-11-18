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
    <div className="rounded-2xl bg-[#ddccc2] sm:border border-black mt-2 mb-6 sm:my-7.5 p-5.5 sm:p-10 md:px-20 md:py-16">
      <div>
      <div className="max-w-[660px] mx-auto text-center bg-[#fbf5ed] sm:border rounded-2xl px-5.5 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">{temperatureData.title}</h1>
        <p className="text-center mx-auto max-w-[480px] mb-8">{temperatureData.subtitle}</p>

        <ConverterForm
          units={temperatureUnits}
          defaultFrom="C"
          defaultTo="F"
          onConvert={convertTemperature}
        />
      </div>

      <section>
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">{temperatureData.referenceValuesTitle}</h2>
          <pre className="bg-[#fbf5ed] mb-10 p-4 rounded-lg overflow-x-auto">
            {temperatureData.referenceValues.join("\n")}
          </pre>

          <h3 className="text-lg font-semibold mb-5.5">{temperatureData.examplesTitle}</h3>
          <ul>
            {temperatureData.examples.map((ex, i) => (
              <li key={i} className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-6">
                <p className="mb-2"><b>{ex.title}</b></p>
                <p className="mb-0.5">Formula: <code>{ex.formula}</code></p>
                <p className="mb-0.5">Calculation: <code>{ex.calculation}</code></p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">{temperatureData.usageTitle}</h2>
          <ul>
            {temperatureData.usage.map((u, i) => (
              <li key={i} className="mb-4">
                <b>{u.title}</b> {u.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 sm:mb-0">
          <h2 className="text-xl font-semibold mb-5.5">{temperatureData.funFactsTitle}</h2>
          <ul>
            {temperatureData.funFacts.map((f, i) => (
              <li key={i} className="mb-4">
                <b>{f.title}</b> {f.description}
              </li>
            ))}
          </ul>
        </div>
      </section>
      </div>
    </div>
  );
};

export default TemperatureConverter;