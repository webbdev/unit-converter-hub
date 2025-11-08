import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import converterData from "../data/txt.json";

const TxtConverter = () => {
	const [fileName, setFileName] = useState<string | null>(null);
	const [text, setText] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const editorRef = useRef<HTMLDivElement>(null);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setFileName(file.name);
		setIsLoading(true);

		const extension = file.name.split(".").pop()?.toLowerCase();
		if (extension === "txt") {
			const reader = new FileReader();
			reader.onload = () => {
				setText(reader.result as string);
				setIsLoading(false);
			};
			reader.readAsText(file);
		} else {
			alert("Unsupported file type. Please upload a .txt file.");
			setIsLoading(false);
		}
	};

	const execCommand = (command: string) => document.execCommand(command, false, undefined);

	const getEditorText = () => editorRef.current?.innerText || text;

	const handleDownloadPDF = () => {
		const textContent = getEditorText();
		const doc = new jsPDF({ unit: "pt", format: "a4" });

		const pageWidth = doc.internal.pageSize.getWidth();
		const pageHeight = doc.internal.pageSize.getHeight();
		const margin = 40;
		const maxLineWidth = pageWidth - margin * 2;
		const lineHeight = 14;

		let y = margin;
		const lines = doc.splitTextToSize(textContent, maxLineWidth);

		lines.forEach((line: string) => {
			if (y + lineHeight > pageHeight - margin) {
				doc.addPage();
				y = margin;
			}
			doc.text(line, margin, y);
			y += lineHeight;
		});

		doc.save(fileName?.replace(/\.txt$/i, ".pdf") || "converted.pdf");
	};

	return (
		<div className="rounded-2xl bg-[#ddccc2] sm:border border-black mt-2 mb-6 sm:my-7.5 p-5.5 sm:p-10 md:px-20 md:py-16">
			<div className="max-w-auto mx-auto text-center bg-[#fbf5ed] sm:border rounded-2xl px-5.5 sm:px-14 py-8 sm:py-10 mb-10 md:mb-14">
				<h1 className="text-2xl sm:text-3xl font-semibold mb-6" dangerouslySetInnerHTML={{ __html: converterData.title }} />
				<p className="max-w-[480px] text-center mx-auto mb-8">{converterData.subtitle}</p>

				<label className="block mb-4">
					<input type="file" accept=".txt" onChange={handleFileUpload} className="hidden" id="text-upload" />
					<span className="cursor-pointer rounded-3xl px-8 py-3 border bg-transparent hover:bg-gray-100 transition">
						Upload TXT
					</span>
				</label>

				{isLoading && <p>Converting file… please wait.</p>}

				{!isLoading && text && (
				<>
					<div className="relative bg-white border rounded-lg min-h-[300px] max-h-[60vh] overflow-y-auto text-left whitespace-pre-wrap leading-relaxed mt-8">
						<div className="sticky top-0 z-10 flex flex-wrap justify-center gap-2 sm:gap-3 bg-gray-100 border-b px-3 py-2 shadow-sm">
							<button onClick={() => execCommand("bold")} className="p-2 border rounded hover:bg-gray-200" title="Bold">
								<Bold size={17} />
							</button>
							<button onClick={() => execCommand("italic")} className="p-2 border rounded hover:bg-gray-200" title="Italic">
								<Italic size={17} />
							</button>
							<button onClick={() => execCommand("justifyLeft")} className="p-2 border rounded hover:bg-gray-200" title="Align Left">
								<AlignLeft size={17} />
							</button>
							<button onClick={() => execCommand("justifyCenter")} className="p-2 border rounded hover:bg-gray-200" title="Align Center">
								<AlignCenter size={17} />
							</button>
							<button onClick={() => execCommand("justifyRight")} className="p-2 border rounded hover:bg-gray-200" title="Align Right">
								<AlignRight size={17} />
							</button>
							<button onClick={() => execCommand("justifyFull")} className="p-2 border rounded hover:bg-gray-200" title="Justify">
								<AlignJustify size={17} />
							</button>
						</div>

						<div ref={editorRef} contentEditable suppressContentEditableWarning className="p-4 outline-none" dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br/>") }} />
					</div>

					<div className="mt-7">
						<button onClick={handleDownloadPDF} className="rounded-3xl px-8 py-3 border bg-transparent hover:bg-gray-100 transition">
							Download as PDF
						</button>
					</div>
				</>
				)}
			</div>

			<section className="text-left">
				<div className="mb-6 sm:mb-0">
					<h2 className="text-xl font-semibold mb-5.5">{converterData.funFactsTitle}</h2>
					<ul>
						{converterData.funFacts.map((fact, i) => (
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

export default TxtConverter;