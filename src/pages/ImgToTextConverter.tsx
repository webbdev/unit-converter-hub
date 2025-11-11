import { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Copy,
} from "lucide-react";
import imgData from "../data/img.json";

/** Helper: check if extracted text is meaningful */
const isMeaningfulText = (input: string, confidence: number): boolean => {
  if (!input) return false;

  const cleaned = input.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  if (cleaned.length < 5) return false;

  const words = cleaned.split(/\s+/);
  const realWords = words.filter((w) => w.length > 2);
  const ratio = realWords.length / words.length;

  // For real-world photos, sometimes OCR confidence is low — use softer threshold
  const minConfidence = cleaned.length > 15 ? 30 : 40;

  return ratio > 0.5 && realWords.length >= 3 && confidence >= minConfidence;
};

const ImgToTextConverter = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  /** File Upload & OCR */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsLoading(true);
    setText("");
    setConfidence(0);

    const reader = new FileReader();
    reader.onload = async () => {
      const src = reader.result as string;
      setImageSrc(src);

      try {
        const result = await Tesseract.recognize(src, "eng", {
          logger: (m) => console.log(m),
          ...( { tessedit_char_whitelist: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.!?;:-()[]{}\"' " } as any )
        });

        const conf = result.data.confidence || 0;
        let extracted = result.data.text
          .replace(/[^\x20-\x7E\n]/g, "")
          .replace(/\s{2,}/g, " ")
          .trim();

        if (!isMeaningfulText(extracted, conf)) {
          extracted = "No text detected.";
        }

        setText(extracted);
        setConfidence(conf);
      } catch (error) {
        console.error("OCR Error:", error);
        setText("No text detected.");
        setConfidence(0);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const execCommand = (cmd: string) => document.execCommand(cmd, false, undefined);

  /** Download extracted text */
  const handleDownloadTxt = () => {
    const textContent = editorRef.current?.innerText || text || "No text detected.";
    const blob = new Blob([textContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download =
      fileName?.replace(/\.(png|jpg|jpeg)$/i, ".txt") || "extracted.txt";
    link.click();
  };

  /** Copy extracted text */
  const handleCopyText = async () => {
    const textContent = editorRef.current?.innerText || text || "No text detected.";
    try {
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Failed to copy text.");
    }
  };

  return (
    <div className="rounded-2xl bg-[#ddccc2] sm:border border-black mt-2 mb-6 sm:my-7.5 p-5.5 sm:p-10 md:px-20 md:py-16">
      <div className="max-w-auto mx-auto text-center bg-[#fbf5ed] sm:border rounded-2xl px-5.5 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
        <h1
          className="text-2xl sm:text-3xl font-semibold mb-6"
          dangerouslySetInnerHTML={{ __html: imgData.title }}
        />
        <p className="max-w-[460px] text-center mx-auto mb-9">
          {imgData.subtitle}
        </p>

        {/* Upload */}
        <label className="block mb-4">
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileUpload}
            className="hidden"
          />
          <span className="cursor-pointer rounded-3xl px-8 py-3 border bg-transparent hover:bg-gray-100 transition">
            Upload Image
          </span>
        </label>

        {/* Preview */}
        {imageSrc && (
          <div className="flex justify-center mt-9 mb-6">
            <img
              src={imageSrc}
              alt="Uploaded"
              className="max-h-[300px] rounded-lg border shadow-sm"
            />
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center mt-4 mb-4 space-y-3">
            <div className="w-8 h-8 border-4 border-t-[#efadbd] border-gray-300 rounded-full animate-spin"></div>
            <p className="text-base font-medium text-gray-800 flex items-center">
              Extracting text
              <span className="inline-flex ml-1">
                <span className="animate-bounce [animation-delay:-0.3s]">.</span>
                <span className="animate-bounce [animation-delay:-0.15s]">.</span>
                <span className="animate-bounce">.</span>
              </span>
            </p>
          </div>
        )}

        {/* Confidence */}
        {!isLoading && text && text !== "No text detected." && (
          <p
            className={`text-sm mb-4 ${
              confidence > 80
                ? "text-green-600"
                : confidence > 50
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            Confidence: {confidence.toFixed(0)}%
          </p>
        )}

        {/* Editor */}
        {!isLoading && text && (
          <>
            <div className="relative bg-white border rounded-lg min-h-[300px] max-h-[60vh] overflow-y-auto text-left whitespace-pre-wrap leading-relaxed mt-2">
              {/* Toolbar */}
              <div className="sticky top-0 z-10 flex flex-wrap justify-center gap-2 sm:gap-3 bg-gray-100 border-b px-3 py-2 shadow-sm">
                <button
                  onClick={() => execCommand("bold")}
                  className="p-2 border rounded hover:bg-gray-200"
                  title="Bold"
                >
                  <Bold size={17} />
                </button>
                <button
                  onClick={() => execCommand("italic")}
                  className="p-2 border rounded hover:bg-gray-200"
                  title="Italic"
                >
                  <Italic size={17} />
                </button>
                <button
                  onClick={() => execCommand("justifyLeft")}
                  className="p-2 border rounded hover:bg-gray-200"
                  title="Align Left"
                >
                  <AlignLeft size={17} />
                </button>
                <button
                  onClick={() => execCommand("justifyCenter")}
                  className="p-2 border rounded hover:bg-gray-200"
                  title="Align Center"
                >
                  <AlignCenter size={17} />
                </button>
                <button
                  onClick={() => execCommand("justifyRight")}
                  className="p-2 border rounded hover:bg-gray-200"
                  title="Align Right"
                >
                  <AlignRight size={17} />
                </button>
                <button
                  onClick={() => execCommand("justifyFull")}
                  className="p-2 border rounded hover:bg-gray-200"
                  title="Justify"
                >
                  <AlignJustify size={17} />
                </button>
              </div>

              {/* Editable Text */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="p-4 outline-none"
                dangerouslySetInnerHTML={{
                  __html: text.replace(/\n/g, "<br/>"),
                }}
              ></div>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex justify-center gap-3">
              <button
                onClick={handleDownloadTxt}
                className="rounded-3xl px-8 py-3 border bg-transparent hover:bg-gray-100 transition"
              >
                Download as TXT
              </button>
              <button
                onClick={handleCopyText}
                className={`rounded-3xl px-8 py-3 border flex items-center gap-2 transition ${
                  copied ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                <Copy size={16} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Info Section */}
      <section className="text-left">
        <div className="mb-6 sm:mb-0">
          <h2 className="text-xl font-semibold mb-5.5">
            {imgData.funFactsTitle}
          </h2>
          <ul>
            {imgData.funFacts.map((fact, i) => (
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

export default ImgToTextConverter;