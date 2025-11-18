import { useState } from "react";
import tailwindData from "../data/tailwind.json";

const tailwindSpacing: Record<string, number> = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384
};

const tailwindFontSizes: Record<string, number> = {
  "text-xs": 12,
  "text-sm": 14,
  "text-base": 16,
  "text-lg": 18,
  "text-xl": 20,
  "text-2xl": 24,
  "text-3xl": 30,
  "text-4xl": 36,
  "text-5xl": 48,
  "text-6xl": 60,
  "text-7xl": 72,
  "text-8xl": 96,
  "text-9xl": 128
};

const tailwindBreakpoints: Record<string, string> = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
};

const tabs = ["Spacing", "Font Sizes", "Breakpoints"];

const TailwindPxConverter = () => {
  const [activeTab, setActiveTab] = useState("Spacing");

  return (
    <div className="rounded-2xl bg-[#ddccc2] sm:border border-black mt-2 mb-6 sm:my-7.5 p-5.5 sm:p-10 md:px-20 md:py-16">
      <div className="max-w-[760px] mx-auto text-center bg-[#fbf5ed] sm:border rounded-2xl px-5.5 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
          {tailwindData.title}
        </h1>
        <p className="max-w-[500px] text-center mx-auto mb-8">
          {tailwindData.subtitle}
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-2 sm:space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 leading-[1.4] rounded-lg border transition ${
                activeTab === tab
                  ? "bg-gray-200 border-black font-semibold"
                  : "bg-white hover:bg-gray-100 border-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tables */}
        <div className="overflow-x-auto max-h-[65vh] overflow-y-scroll border rounded-lg bg-white">
          <table className="min-w-full border-collapse text-left text-sm sm:text-base">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                {activeTab === "Spacing" && (
                  <>
                    <th className="px-4 py-3 border-b border-black">Class</th>
                    <th className="px-4 py-3 border-b border-black">Rem</th>
                    <th className="px-4 py-3 border-b border-black">Pixels</th>
                  </>
                )}
                {activeTab === "Font Sizes" && (
                  <>
                    <th className="px-4 py-3 border-b border-black">Class</th>
                    <th className="px-4 py-3 border-b border-black">Pixels</th>
                  </>
                )}
                {activeTab === "Breakpoints" && (
                  <>
                    <th className="px-4 py-3 border-b border-black">Breakpoint</th>
                    <th className="px-4 py-3 border-b border-black">Min Width</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeTab === "Spacing" &&
                Object.entries(tailwindSpacing).map(([unit, px]) => (
                  <tr key={unit} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-3 border-b border-gray-100 font-mono">
                      p-{unit}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      {(Number(unit) * 0.25).toFixed(2)}rem
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">{px}px</td>
                  </tr>
                ))}
              {activeTab === "Font Sizes" &&
                Object.entries(tailwindFontSizes).map(([cls, px]) => (
                  <tr key={cls} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-3 border-b border-gray-100 font-mono">{cls}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{px}px</td>
                  </tr>
                ))}
              {activeTab === "Breakpoints" &&
                Object.entries(tailwindBreakpoints).map(([bp, px]) => (
                  <tr key={bp} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-3 border-b border-gray-100 font-mono">{bp}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{px}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Sections */}
      <section className="text-left">
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">
            {tailwindData.referenceValuesTitle}
          </h2>
          <p className="mb-4">{tailwindData.referenceValuesDescription}</p>
          <ul>
            {tailwindData.referenceValues.map((item, i) => (
              <li key={i} className="mb-4">
                <b>{item.title}:</b> {item.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 sm:mb-0">
          <h2 className="text-xl font-semibold mb-5.5">
            {tailwindData.funFactsTitle}
          </h2>
          <ul>
            {tailwindData.funFacts.map((fact, i) => (
              <li key={i} className="mb-4">
                <b>{fact.title}:</b> {fact.description}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TailwindPxConverter;