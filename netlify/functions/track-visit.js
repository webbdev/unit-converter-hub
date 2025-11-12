import fs from "fs";
import path from "path";

const dataDir = path.resolve("netlify/data");
const dataFile = path.join(dataDir, "visits.json");

// Helper: ensure data folder and file exist
function ensureFile() {
	if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
	if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify({}), "utf-8");
}

// Read current stats
function readVisits() {
	ensureFile();
	const raw = fs.readFileSync(dataFile, "utf-8");
	return JSON.parse(raw || "{}");
}

// Write updated stats
function writeVisits(data) {
  	fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

export async function handler(event) {
	if (event.httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed" };
	}

	try {
		const { path: page } = JSON.parse(event.body || "{}");
		if (!page) throw new Error("Missing path");

		const visits = readVisits();
		visits[page] = (visits[page] || 0) + 1;
		writeVisits(visits);

		return {
			statusCode: 200,
			body: JSON.stringify({ success: true, count: visits[page] }),
		};
	} catch (err) {
		console.error(err);
		return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
	}
}