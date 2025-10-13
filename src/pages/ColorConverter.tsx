import { useState } from "react";
import colorData from "../data/color.json";
import parse from "html-react-parser";

const colorUnits = ["HEX", "RGB", "HSL"];

// --- Conversion Utilities --- //
const hexToRgb = (hex: string) => {
  hex = hex.replace("#", "");
  if (hex.length === 3)
    hex = hex.split("").map((x) => x + x).join("");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

const rgbToHex = (rgb: string) => {
  const result = rgb.match(/\d+/g);
  if (!result) return "";
  const [r, g, b] = result.map(Number);
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

const rgbToHsl = (rgb: string) => {
  const result = rgb.match(/\d+/g);
  if (!result) return "";
  let [r, g, b] = result.map((n) => Number(n) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%)`;
};

const hslToRgb = (hsl: string) => {
  const result = hsl.match(/\d+/g);
  if (!result) return "";
  let [h, s, l] = result.map(Number);
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
    b * 255
  )})`;
};

// Universal converter
const convertColor = (value: string, from: string, to: string) => {
  try {
    if (from === to) return value;

    // HEX conversions
    if (from === "HEX" && to === "RGB") return hexToRgb(value);
    if (from === "HEX" && to === "HSL") return rgbToHsl(hexToRgb(value));

    // RGB conversions
    if (from === "RGB" && to === "HEX") return rgbToHex(value);
    if (from === "RGB" && to === "HSL") return rgbToHsl(value);

    // HSL conversions
    if (from === "HSL" && to === "RGB") return hslToRgb(value);
    if (from === "HSL" && to === "HEX") return rgbToHex(hslToRgb(value));

    return value;
  } catch {
    return "";
  }
};

const ColorConverter = () => {
  const [fromUnit, setFromUnit] = useState("HEX");
  const [toUnit, setToUnit] = useState("RGB");
  const [inputValue, setInputValue] = useState("#efadbd");
  const [outputValue, setOutputValue] = useState("rgb(239, 173, 189)");

  const handleConvert = () => {
    const result = convertColor(inputValue, fromUnit, toUnit);
    setOutputValue(result);
  };

  return (
    <div className="rounded-2xl bg-[#ddccc2] sm:border border-black mt-2 mb-6 sm:my-7.5 p-5.5 sm:p-10 md:px-20 md:py-16">
      <div className="max-w-[620px] mx-auto text-center bg-[#fbf5ed] sm:border rounded-2xl px-5.5 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
          {parse(colorData.title)}
        </h1>
        <p className="max-w-[440px] text-center mx-auto mb-8">
          {colorData.subtitle}
        </p>

        {/* Color Preview */}
        <div
          className="w-12 sm:w-14 h-10 sm:h-12 mx-auto mb-7 border rounded-lg shadow"
          style={{ backgroundColor: outputValue }}
        ></div>

        <div className="flex flex-col gap-6 justify-center items-center mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter color (e.g. #efadbd or rgb(255,0,0))"
            className="border p-3 rounded-lg w-full sm:w-72 text-center focus:outline-none focus:ring-2 focus:ring-[#efadbd]"
          />

          <div className="flex items-center gap-2">
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="border rounded-lg px-5 py-3"
            >
              {colorUnits.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
            <span>→</span>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="border rounded-lg px-5 py-3"
            >
              {colorUnits.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleConvert}
          className="bg-black text-[#fbf5ed] px-6 py-3 rounded-lg hover:bg-black/80 transition-colors duration-300"
        >
          Convert
        </button>

        {/* Result */}
        <div className="text-center mt-6">
          <span className="block bg-[#fbf5ed] rounded-lg text-lg sm:text-xl font-bold overflow-x-auto py-3">
            Result:{" "}
            {outputValue}
          </span>
        </div>
      </div>

      {/* Examples, Usage, Fun Facts */}
      <section className="text-left">
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">
            {colorData.examplesTitle}
          </h2>
          <ul>
            {colorData.examples.map((ex, i) => (
              <li
                key={i}
                className="bg-[#fbf5ed] rounded-lg px-3 py-2 mb-4 leading-relaxed"
              >
                <b>{ex.title}:</b> <code>{ex.example}</code>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5.5">{colorData.usageTitle}</h2>
          <ul>
            {colorData.usage.map((u, i) => (
              <li key={i} className="mb-4">
                <b>{u.title}</b> {u.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 sm:mb-0">
          <h2 className="text-xl font-semibold mb-5.5">
            {colorData.funFactsTitle}
          </h2>
          <ul>
            {colorData.funFacts.map((fact, i) => (
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

export default ColorConverter;