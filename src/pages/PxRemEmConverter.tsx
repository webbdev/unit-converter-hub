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
    <div className="rounded-2xl bg-[#ddccc2] border border-black mt-2 mb-6 sm:my-7.5 p-6 sm:p-10 md:px-20 md:py-16">
      <div className="max-w-[620px] mx-auto text-center bg-[#fbf5ed] border rounded-2xl px-6 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
          {pxRemEmData.title}
        </h1>
        <p className="text-center mx-auto mb-8 max-w-[460px]">
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
        <h2 className="text-xl font-semibold mb-6">{pxRemEmData.referenceValuesTitle}</h2>
        <pre className="bg-[#fbf5ed] mb-10 p-4 rounded-lg overflow-x-auto">
          {pxRemEmData.referenceValues.join("\n")}
        </pre>

        <h3 className="text-lg font-semibold mb-6">{pxRemEmData.examplesTitle}</h3>
        <ul>
          {pxRemEmData.examples.map((ex, i) => (
            <li key={i} className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-6">
              <p><b>{ex.title}</b></p>
              <p>Formula: <code>{ex.formula}</code></p>
              <p>Calculation: <code>{ex.calculation}</code></p>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-6">{pxRemEmData.usageTitle}</h2>
        <ul>
          {pxRemEmData.usage.map((u, i) => (
            <li key={i}><b>{u.title}</b> {u.description}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-6 mt-10">{pxRemEmData.funFactsTitle}</h2>
        <ul>
          {pxRemEmData.funFacts.map((f, i) => (
            <li key={i}><b>{f.title}</b> {f.description}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PxRemEmConverter;