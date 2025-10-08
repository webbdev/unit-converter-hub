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
    <div className="rounded-2xl bg-[#ddccc2] border border-black mt-2 mb-6 sm:my-7.5 p-6 sm:p-10 md:px-20 md:py-16">
      <div className="max-w-[620px] mx-auto text-center bg-[#fbf5ed] border rounded-2xl px-6 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">{dataStorageData.title}</h1>
        <p className="mb-8">{dataStorageData.subtitle}</p>

        <ConverterForm
          units={storageUnits}
          defaultFrom="MB"
          defaultTo="GB"
          onConvert={convertStorage}
        />
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-6">{dataStorageData.referenceValuesTitle}</h2>
        <pre className="bg-[#fbf5ed] mb-10 p-4 rounded-lg overflow-x-auto">
          {dataStorageData.referenceValues.join("\n")}
        </pre>

        <h3 className="text-lg font-semibold mb-6">{dataStorageData.examplesTitle}</h3>
        <ul>
          {dataStorageData.examples.map((ex, i) => (
            <li key={i} className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-6">
              <p><b>{ex.title}</b></p>
              <p>Formula: <code>{ex.formula}</code></p>
              <p>Calculation: <code>{ex.calculation}</code></p>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-6">{dataStorageData.usageTitle}</h2>
        <ul>
          {dataStorageData.usage.map((u, i) => (
            <li key={i}><b>{u.title}</b> {u.description}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-6 mt-10">{dataStorageData.funFactsTitle}</h2>
        <ul>
          {dataStorageData.funFacts.map((f, i) => (
            <li key={i}><b>{f.title}</b> {f.description}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DataStorageConverter;