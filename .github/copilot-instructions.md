## Quick context (what this project is)

- Framework: Vite + React + TypeScript. Tailwind is used for styling via the `@tailwindcss/vite` plugin (see `vite.config.ts`).
- Single-page app: routes are defined in `src/App.tsx` and map pages in `src/pages/*` to URL paths (e.g. `/img-converter` → `src/pages/ImgToTextConverter.tsx`).
- Data-driven converters: most converters read static JSON or a central `converterContent` registry in `src/data/*` and `src/data/converterContent.ts`.

## High-level architecture & important locations

- Entry point: `src/main.tsx` → `src/App.tsx` (Router + Routes).
- Pages: `src/pages/*.tsx` (each converter is a focused page, e.g. `ImgToTextConverter.tsx`, `PdfConverter.tsx`).
- Shared UI: `src/components/*` (examples: `ConverterForm.tsx` shows the common form pattern, `Container.tsx`, `Header.tsx`, `Footer.tsx`).
- Data: `src/data/*.json` and `src/data/converterContent.ts` contain text, titles and configuration consumed by pages.
- Assets: `src/assets/` and `public/` for static assets.

## Build / run / lint (developer workflow)

- Run locally: `npm run dev` (starts Vite dev server).
- Production build: `npm run build` — runs `tsc -b` then `vite build` (note: tsconfig uses project references: `tsconfig.app.json` & `tsconfig.node.json`).
- Preview build: `npm run preview`.
- Lint: `npm run lint` (ESLint is configured; run this before PRs).

If you need to type-check only: run `npx tsc -b` (this mirrors the build step).

There are no automated tests in the repo. If you add tests, keep them minimal and document the runner in README.md.

## Project-specific patterns and conventions (why things are structured this way)

- Pages are intentionally data-driven. Add or edit `src/data/*.json` or `converterContent.ts` to change visible titles, subtitles and informational sections without touching markup.
- Routing is explicit in `src/App.tsx`. To add a new converter page: create `src/pages/MyConverter.tsx`, import it in `App.tsx` and add a `<Route path="/my" element={<MyConverter/>} />`.
- UI components favor small, focused, default-exported React components (PascalCase filenames). Props are typed with TypeScript and kept lightweight (see `ConverterForm.tsx`).
- Styling is Tailwind-first; utility classes are present across components. Keep changes cohesive with existing Tailwind tokens.

## Integration points & notable dependencies

- OCR: `tesseract.js` is used in `src/pages/ImgToTextConverter.tsx` via `Tesseract.recognize(src, 'eng', {...})`. OCR happens in the browser — expect large bundle size and async behaviour. Consider lazy-loading `tesseract.js` if adding more heavy client-only features.
- PDF/Doc: `pdfjs-dist`, `docx`, `docx-preview`, and `jspdf` are used in converters (see `PdfConverter.tsx` and other pages).
- Icons: `lucide-react` is used for toolbar icons (see `ImgToTextConverter.tsx`).

## Patterns to follow when editing/adding pages

1. Data-first: Add textual content to `src/data/*.json` and `converterContent.ts` instead of hardcoding strings.
2. Component reuse: Use `ConverterForm.tsx` when creating unit converters — it handles value, from/to selects and formatting of results. If your converter requires custom UI, keep the conversion logic separate from presentation.
3. Routes: Update `src/App.tsx` for navigation and ensure the route path name matches the data key if you want to use consistent naming.
4. Accessibility: forms and buttons use standard HTML inputs/selects — keep keyboard support and semantic elements.

## Small, concrete examples (copy-paste friendly)

- Add a new data file and page:

  - `src/data/my.json` → include `title`, `subtitle`, `funFacts`, etc. (follow `img.json` shape).
  - `src/pages/MyConverter.tsx` → import data: `import myData from '../data/my.json'` and render similar sections as `ImgToTextConverter.tsx`.
  - Register route in `src/App.tsx`: `import MyConverter from './pages/MyConverter';` then add `<Route path="/my" element={<MyConverter />} />`.

- Use the shared form pattern (see `ConverterForm.tsx`): it expects `units: string[]`, `defaultFrom`, `defaultTo`, and `onConvert: (value, from, to) => number`.

## Gotchas & things an AI agent should watch for

- TypeScript project references: build runs `tsc -b`. Don't remove the `tsc -b` step from the build flow.
- Large client libs: `tesseract.js` and `pdfjs-dist` can increase bundle sizes and impact dev server hot-reload times; prefer lazy imports for non-critical pages.
- Some pages use `dangerouslySetInnerHTML` (e.g., page titles come from JSON). Keep outputs sanitized; follow existing patterns (the files currently rely on trusted local JSON).
- `document.execCommand` is used for toolbar commands in the editor (deprecated but currently used). If you change the editor, test copy/paste and formatting thoroughly across browsers.

## Where to look for examples

- Routing and page registration: `src/App.tsx`
- Converter form usage: `src/components/ConverterForm.tsx`
- Data-driven page: `src/pages/ImgToTextConverter.tsx` and `src/data/img.json`
- Content registry: `src/data/converterContent.ts`
- Build configuration: `package.json`, `vite.config.ts`, `tsconfig.json` (+ `tsconfig.app.json`, `tsconfig.node.json`)

If any section is unclear or you'd like more examples (e.g., how to lazy-load tesseract.js, or a checklist for adding a new converter), tell me which area to expand and I will iterate. 
