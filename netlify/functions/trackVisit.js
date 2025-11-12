export async function handler(event, context) {
	const path = event.queryStringParameters.path || 'unknown';

	// Netlify automatically adds these headers
	const ip = event.headers['x-nf-client-connection-ip'] || 'unknown';
	const country = event.headers['x-nf-country'] || 'unknown';
	const userAgent = event.headers['user-agent'] || 'unknown';

	// Log it (viewable in Netlify dashboard → Functions → Logs)
	console.log(`🔍 Visit tracked:`);
	console.log(`🌐 Path: ${path}`);
	console.log(`🕵️ IP: ${ip}`);
	console.log(`🏳️ Country: ${country}`);
	console.log(`📱 User-Agent: ${userAgent}`);
	console.log(`⏰ Time: ${new Date().toISOString()}`);

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: 'Visit tracked',
			path,
			ip,
			country,
			userAgent,
		}),
	};
}