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

/** Check if OCR text is meaningful */
const isMeaningfulText = (input: string, confidence: number): boolean => {
  if (!input) return false;
  const cleaned = input.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  if (cleaned.length < 5) return false;
  const words = cleaned.split(/\s+/);
  const realWords = words.filter((w) => w.length > 2);
  const ratio = realWords.length / words.length;
  return ratio > 0.5 && realWords.length >= 3 && confidence >= 40;
};

/** Preprocess image for better OCR accuracy */
const preprocessImage = (src: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(src);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Convert to grayscale and increase contrast
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

        // Simple contrast and brightness adjustment
        const adjusted = Math.min(255, Math.max(0, (avg - 128) * 1.5 + 128 + 20));

        // Binarize: emphasize black/white
        const threshold = adjusted > 160 ? 255 : 0;

        data[i] = data[i + 1] = data[i + 2] = threshold;
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.src = src;
  });
};

const ImgToTextConverter = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

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
        // Preprocess image for better OCR
        const processedSrc = await preprocessImage(src);

        const result = await Tesseract.recognize(processedSrc, "eng", {
          logger: (m) => console.log(m),
        });

        const conf = result.data.confidence || 0;
        let extracted = result.data.text
          .replace(/[^\x20-\x7E\n]/g, "")
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

  const execCommand = (command: string) => {
    document.execCommand(command, false, undefined);
  };

  const handleDownloadTxt = () => {
    const textContent =
      editorRef.current?.innerText || text || "No text detected.";
    const blob = new Blob([textContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download =
      fileName?.replace(/\.(png|jpg|jpeg)$/i, ".txt") || "extracted.txt";
    link.click();
  };

  const handleCopyText = async () => {
    const textContent =
      editorRef.current?.innerText || text || "No text detected.";
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
        <p className="max-w-[460px] text-center mx-auto mb-8">
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
          <div className="flex justify-center mt-8.5 mb-6">
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

              {/* Text Content */}
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