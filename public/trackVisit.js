fetch("/.netlify/functions/track-visit", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		path: window.location.pathname,
		referrer: document.referrer || "direct",
		time: new Date().toISOString(),
	}),
})
	.then((res) => res.json())
	.then((data) => console.log("Visits:", data.count))
	.catch(() => {});