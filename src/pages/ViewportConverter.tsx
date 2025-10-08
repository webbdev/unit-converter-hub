import { useState } from "react";
import ConverterForm from "../components/ConverterForm";
import viewportData from "../data/viewport.json";

const viewportUnits = ["px", "vw", "vh"];

const ViewportConverter = () => {
  const [viewportWidth, setViewportWidth] = useState(1920);
  const [viewportHeight, setViewportHeight] = useState(1080);

  // Conversion logic
  const convertViewport = (value: number, from: string, to: string) => {
    let pxValue = value;

    if (from === "vw") pxValue = (value / 100) * viewportWidth;
    if (from === "vh") pxValue = (value / 100) * viewportHeight;

    if (to === "vw") return (pxValue / viewportWidth) * 100;
    if (to === "vh") return (pxValue / viewportHeight) * 100;

    return pxValue; // px to px
  };

  // Auto detect viewport size
  const handleDetectViewport = () => {
    setViewportWidth(window.innerWidth);
    setViewportHeight(window.innerHeight);
  };

  return (
    <div className="rounded-2xl bg-[#ddccc2] border border-black mt-2 mb-6 sm:my-7.5 p-6 sm:p-10 md:px-20 md:py-16">
      <div>
        <div className="max-w-[620px] mx-auto text-center bg-[#fbf5ed] border rounded-2xl px-6 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
            {viewportData.title}
          </h1>
          <p className="text-center mx-auto mb-8 max-w-[480px]">
            {viewportData.subtitle}
          </p>

          {/* Viewport Settings */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-2">
              <label htmlFor="width" className="text-sm font-medium">
                Width (px):
              </label>
              <input
                id="width"
                type="number"
                value={viewportWidth}
                onChange={(e) => setViewportWidth(Number(e.target.value))}
                className="w-24 border rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#efadbd]"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="height" className="text-sm font-medium">
                Height (px):
              </label>
              <input
                id="height"
                type="number"
                value={viewportHeight}
                onChange={(e) => setViewportHeight(Number(e.target.value))}
                className="w-24 border rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#efadbd]"
              />
            </div>
          </div>

          {/* Detect Button */}
          <button
            onClick={handleDetectViewport}
            className="mb-6 bg-black text-[#fbf5ed] px-5 py-2 rounded-lg text-sm sm:text-base hover:bg-[#efadbd] hover:text-black transition-colors duration-200"
          >
            Auto-Detect Current Viewport
          </button>

          <ConverterForm
            units={viewportUnits}
            defaultFrom="px"
            defaultTo="vw"
            onConvert={(value, from, to) => convertViewport(value, from, to)}
          />
        </div>

        <section>
          {/* Examples */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-6">
              {viewportData.examplesTitle}
            </h2>
            <p className="mb-4">{viewportData.examplesDescription}</p>
            <ul>
              {viewportData.examples.map((ex, i) => (
                <li key={i} className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-6">
                  <p className="mb-2">
                    <b>{ex.title}:</b>
                  </p>
                  <div>
                    <p className="mb-0.5">
                      Formula: <code>{ex.formula}</code>
                    </p>
                    <p className="mb-0.5">
                      Calculation: <code>{ex.calculation}</code>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Usage */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-6">
              {viewportData.usageTitle}
            </h2>
            <ul>
              {viewportData.usage.map((u, i) => (
                <li key={i} className="mb-1.5">
                  <b>{u.title}</b> {u.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Fun Facts */}
          <div>
            <h2 className="text-xl font-semibold mb-6">
              {viewportData.funFactsTitle}
            </h2>
            <ul>
              {viewportData.funFacts.map((fact, i) => (
                <li key={i} className="mb-1.5">
                  <b>{fact.title}:</b> {fact.description}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewportConverter;