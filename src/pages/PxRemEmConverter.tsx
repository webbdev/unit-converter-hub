import ConverterForm from "../components/ConverterForm";
import pxRemEmData from "../data/pxRemEm.json";

const pxRemEmUnits = ["px", "rem", "em"];

// Base font size in pixels — you can customize it
const BASE_FONT_SIZE = 16;

// Conversion map: all units to px
const toPx: Record<string, number> = {
  px: 1,
  rem: BASE_FONT_SIZE,
  em: BASE_FONT_SIZE
};

// Universal conversion
const convertPxRemEm = (value: number, from: string, to: string) => {
  const valueInPx = value * toPx[from];
  return valueInPx / toPx[to];
};

const PxRemEmConverter = () => {
  return (
    <div className="rounded-2xl bg-[#ddccc2] sm:border border-black mt-2 mb-6 sm:my-7.5 p-5.5 sm:p-10 md:px-20 md:py-16">
      <div className="max-w-[660px] mx-auto text-center bg-[#fbf5ed] sm:border rounded-2xl px-5.5 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
          {pxRemEmData.title}
        </h1>
        <p className="max-w-[480px] text-center mx-auto mb-8">
          {pxRemEmData.subtitle}
        </p>

        <ConverterForm
          units={pxRemEmUnits}
          defaultFrom="px"
          defaultTo="rem"
          onConvert={convertPxRemEm}
        />
      </div>

      <section>
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">{pxRemEmData.referenceValuesTitle}</h2>
          <pre className="bg-[#fbf5ed] mb-10 p-4 rounded-lg overflow-x-auto">
            {pxRemEmData.referenceValues.join("\n")}
          </pre>

          <h3 className="text-lg font-semibold mb-5.5">{pxRemEmData.examplesTitle}</h3>
          <ul>
            {pxRemEmData.examples.map((ex, i) => (
              <li key={i} className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-6">
                <p className="mb-2"><b>{ex.title}</b></p>
                <p className="mb-0.5">Formula: <code>{ex.formula}</code></p>
                <p className="mb-0.5">Calculation: <code>{ex.calculation}</code></p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">{pxRemEmData.usageTitle}</h2>
          <ul>
            {pxRemEmData.usage.map((u, i) => (
              <li key={i} className="mb-4"><b>{u.title}</b> {u.description}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6 sm:mb-0">
          <h2 className="text-xl font-semibold mb-5.5">{pxRemEmData.funFactsTitle}</h2>
          <ul>
            {pxRemEmData.funFacts.map((f, i) => (
              <li key={i} className="mb-4"><b>{f.title}</b> {f.description}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PxRemEmConverter;