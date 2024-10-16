/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx) {
// 		const frontendUrl = env.CLIENT;  // Replace with your frontend URL
// 		const backendUrl = env.SERVER;    // Replace with your backend URL

// 		//const clientReq = request.method
// 		//return new Response(`client=${frontendUrl} \n  server=${backendUrl}`);
		
// 	},
// };


export default {
	async fetch(request, env, ctx) {
		const frontendUrl = env.CLIENT || 'http://localhost:5173';  // Frontend URL from environment
		const backendUrl = env.SERVER || 'http://localhost:3549';   // Backend URL from environment

		// Get the Origin from the request headers
		const requestOrigin = request.headers.get('origin');
		console.log(requestOrigin)

		// If the request doesn't come from the allowed frontend, deny it
		if (requestOrigin !== frontendUrl) {
			return new Response('Forbidden: Unauthorized origin', {
				status: 403,
				headers: {
					'Access-Control-Allow-Origin': 'null',
					'Content-Type': 'text/plain',
				},
			});
		}

		// Handle CORS preflight requests (OPTIONS method)
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': frontendUrl,
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
					'Access-Control-Max-Age': '86400',  // Cache the preflight response
				}
			});
		}

		// Modify the request URL to point to the backend
		const url = new URL(request.url);
		const backendParsedUrl = new URL(backendUrl);
		url.hostname = backendParsedUrl.hostname;
		url.protocol = backendParsedUrl.protocol;
		url.port = backendParsedUrl.port || '';

		// Create a new request with the modified backend URL
		const modifiedRequest = new Request(url, {
			method: request.method,
			headers: request.headers,
			body: request.method === 'GET' || request.method === 'HEAD' ? null : request.body,
			redirect: 'manual'
		});

		// Forward the request to the backend
		const response = await fetch(modifiedRequest);

		// Clone the response to modify headers (for CORS)
		const newHeaders = new Headers(response.headers);
		newHeaders.set('Access-Control-Allow-Origin', frontendUrl);  // Only allow your frontend
		newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

		// Return the backend's response with added CORS headers
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: newHeaders
		});
	},
};
