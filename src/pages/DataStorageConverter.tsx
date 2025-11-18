import ConverterForm from "../components/ConverterForm";
import dataStorageData from "../data/dataStorage.json";

const storageUnits = ["bit", "B", "KB", "MB", "GB", "TB"];

const toBytes: Record<string, number> = {
  bit: 1 / 8,
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4
};

const convertStorage = (value: number, from: string, to: string) => {
  const valueInBytes = value * toBytes[from];
  return valueInBytes / toBytes[to];
};

const DataStorageConverter = () => {
  return (
    <div className="rounded-2xl bg-[#ddccc2] sm:border border-black mt-2 mb-6 sm:my-7.5 p-5.5 sm:p-10 md:px-20 md:py-16">
      <div className="max-w-[660px] mx-auto text-center bg-[#fbf5ed] sm:border rounded-2xl px-5.5 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">{dataStorageData.title}</h1>
        <p className="text-center mx-auto max-w-[480px] mb-8">{dataStorageData.subtitle}</p>

        <ConverterForm
          units={storageUnits}
          defaultFrom="MB"
          defaultTo="GB"
          onConvert={convertStorage}
        />
      </div>

      <section>
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">{dataStorageData.referenceValuesTitle}</h2>
          <pre className="bg-[#fbf5ed] mb-10 p-4 rounded-lg overflow-x-auto">
            {dataStorageData.referenceValues.join("\n")}
          </pre>

          <h3 className="text-lg font-semibold mb-5.5">{dataStorageData.examplesTitle}</h3>
          <ul>
            {dataStorageData.examples.map((ex, i) => (
              <li key={i} className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-6">
                <p className="mb-2"><b>{ex.title}</b></p>
                <p className="mb-0.5">Formula: <code>{ex.formula}</code></p>
                <p className="mb-0.5">Calculation: <code>{ex.calculation}</code></p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">{dataStorageData.usageTitle}</h2>
          <ul>
            {dataStorageData.usage.map((u, i) => (
              <li key={i} className="mb-4">
                <b>{u.title}</b> {u.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 sm:mb-0">
          <h2 className="text-xl font-semibold mb-5.5">{dataStorageData.funFactsTitle}</h2>
          <ul>
            {dataStorageData.funFacts.map((f, i) => (
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

export default DataStorageConverter;