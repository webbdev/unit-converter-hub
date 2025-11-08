import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";
import pdfData from "../data/pdf.json";
import {
	Bold,
	Italic,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
	Copy,
} from "lucide-react";

const PdfConverter = () => {
	const [fileName, setFileName] = useState<string | null>(null);
	const [text, setText] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [copied, setCopied] = useState(false);
	const editorRef = useRef<HTMLDivElement>(null);

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setFileName(file.name);
		setIsLoading(true);

		const reader = new FileReader();
		reader.onload = async () => {
			const typedArray = new Uint8Array(reader.result as ArrayBuffer);
			const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
			let extractedText = "";

			for (let i = 1; i <= pdf.numPages; i++) {
				const page = await pdf.getPage(i);
				const textContent = await page.getTextContent();
				extractedText += textContent.items.map((s: any) => s.str).join(" ") + "\n\n";
			}

			setText(extractedText.trim());
			setIsLoading(false);
		};
		reader.readAsArrayBuffer(file);
	};

	const execCommand = (command: string) => {
		document.execCommand(command, false, undefined);
	};

	const handleDownloadTxt = () => {
		const textContent = editorRef.current?.innerText || text;
		const blob = new Blob([textContent], { type: "text/plain" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = fileName?.replace(/\.pdf$/i, ".txt") || "converted.txt";
		link.click();
	};

	const handleCopyText = async () => {
		const textContent = editorRef.current?.innerText || text;
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
					dangerouslySetInnerHTML={{ __html: pdfData.title }}
				/>
				<p className="max-w-[480px] text-center mx-auto mb-8">{pdfData.subtitle}</p>

				{/* Upload */}
				<label className="block mb-4">
					<input
						type="file"
						accept="application/pdf"
						onChange={handleFileUpload}
						className="hidden"
						id="pdf-upload"
					/>
					<span className="cursor-pointer rounded-3xl px-8 py-3 border bg-transparent hover:bg-gray-100 transition">
						Upload PDF
					</span>
				</label>

				{/* Loading */}
				{isLoading && (
					<div className="flex flex-col items-center justify-center mt-8 mb-4 space-y-3 animate-fadeIn">
						<div className="w-8 h-8 border-4 border-t-gray-700 border-gray-300 rounded-full animate-spin"></div>
						<p className="text-lg font-medium text-gray-800 flex items-center">
							Extracting text
							<span className="inline-flex ml-1">
								<span className="animate-bounce [animation-delay:-0.3s]">.</span>
								<span className="animate-bounce [animation-delay:-0.15s]">.</span>
								<span className="animate-bounce">.</span>
							</span>
						</p>
					</div>
				)}

				{/* Output */}
				{!isLoading && text && (
					<>
						<div className="relative bg-white border rounded-lg min-h-[300px] max-h-[60vh] overflow-y-auto text-left whitespace-pre-wrap leading-relaxed mt-8">
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

							{/* Editable content */}
							<div
								ref={editorRef}
								contentEditable
								suppressContentEditableWarning
								className="p-4 outline-none"
								dangerouslySetInnerHTML={{
									__html: text.replace(/\n/g, "<br/>"),
								}}
							/>
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
					<h2 className="text-xl font-semibold mb-5.5">{pdfData.funFactsTitle}</h2>
					<ul>
						{pdfData.funFacts.map((fact, i) => (
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

export default PdfConverter;