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


// export default {
// 	async fetch(request, env, ctx) {
// 		const frontendUrl = env.CLIENT || 'http://localhost:5173';  // Frontend URL from environment
// 		const backendUrl = env.SERVER || 'http://localhost:3549';   // Backend URL from environment

// 		// Get the Origin from the request headers
// 		const requestOrigin = request.headers.get('origin');
// 		console.log(requestOrigin)

// 		// If the request doesn't come from the allowed frontend, deny it
// 		if (requestOrigin !== frontendUrl) {
// 			return new Response('Forbidden: Unauthorized origin', {
// 				status: 403,
// 				headers: {
// 					'Access-Control-Allow-Origin': 'null',
// 					'Content-Type': 'text/plain',
// 				},
// 			});
// 		}

// 		// Handle CORS preflight requests (OPTIONS method)
// 		if (request.method === 'OPTIONS') {
// 			return new Response(null, {
// 				status: 204,
// 				headers: {
// 					'Access-Control-Allow-Origin': frontendUrl,
// 					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
// 					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// 					'Access-Control-Max-Age': '86400',  // Cache the preflight response
// 				}
// 			});
// 		}

// 		// Modify the request URL to point to the backend
// 		const url = new URL(request.url);
// 		const backendParsedUrl = new URL(backendUrl);
// 		url.hostname = backendParsedUrl.hostname;
// 		url.protocol = backendParsedUrl.protocol;
// 		url.port = backendParsedUrl.port || '';

// 		// Create a new request with the modified backend URL
// 		const modifiedRequest = new Request(url, {
// 			method: request.method,
// 			headers: request.headers,
// 			body: request.method === 'GET' || request.method === 'HEAD' ? null : request.body,
// 			redirect: 'manual'
// 		});

// 		// Forward the request to the backend
// 		const response = await fetch(modifiedRequest);

// 		// Clone the response to modify headers (for CORS)
// 		const newHeaders = new Headers(response.headers);
// 		newHeaders.set('Access-Control-Allow-Origin', frontendUrl);  // Only allow your frontend
// 		newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
// 		newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

// 		// Return the backend's response with added CORS headers
// 		return new Response(response.body, {
// 			status: response.status,
// 			statusText: response.statusText,
// 			headers: newHeaders
// 		});
// 	},
// };


/////////////////////////////////////////

// export default {
// 	async fetch(request, env) {
// 		const { pathname } = new URL(request.url);

// 		// CORS Handling - Allow all origins
// 		const requestOrigin = request.headers.get('origin');
// 		console.log('Request Origin:', requestOrigin);

// 		if (request.method === 'OPTIONS') {
// 			return new Response(null, {
// 				status: 204,
// 				headers: {
// 					'Access-Control-Allow-Origin': '*', // Allow all origins
// 					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
// 					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// 					'Access-Control-Max-Age': '86400',
// 				}
// 			});
// 		}

// 		// Handle contact form submission
// 		if (pathname === "/api/contact" && request.method === "POST") {
// 			try {
// 				const data = await request.json();
// 				console.log('Received Data:', data);

// 				const { name, email, message } = data;

// 				// Insert data into D1 database
// 				const insertQuery = `INSERT INTO Contacts (Name, Email, Message) VALUES (?, ?, ?)`;
// 				await env.DB.prepare(insertQuery)
// 					.bind(name, email, message)
// 					.run();

// 				return new Response(JSON.stringify({ success: true }), {
// 					status: 201,
// 					headers: {
// 						'Content-Type': 'application/json',
// 						'Access-Control-Allow-Origin': '*', // Allow all origins
// 					},
// 				});
// 			} catch (error) {
// 				console.error('Database insert error:', error);
// 				return new Response(JSON.stringify({ success: false, error: 'Failed to save message' }), {
// 					status: 500,
// 					headers: { 
// 						'Content-Type': 'application/json',
// 						'Access-Control-Allow-Origin': '*', // Allow all origins
// 					},
// 				});
// 			}
// 		}

// 		// Handle fetching contacts
// 		if (pathname === "/api/contacts" && request.method === "GET") {
// 			try {
// 				const { results } = await env.DB.prepare("SELECT * FROM Contacts").all();
// 				return new Response(JSON.stringify(results), {
// 					headers: { 
// 						'Content-Type': 'application/json',
// 						'Access-Control-Allow-Origin': '*', // Allow all origins
// 					},
// 				});
// 			} catch (error) {
// 				console.error('Error fetching contacts:', error);
// 				return new Response(JSON.stringify({ success: false, error: 'Failed to fetch contacts' }), {
// 					status: 500,
// 					headers: { 
// 						'Content-Type': 'application/json',
// 						'Access-Control-Allow-Origin': '*', // Allow all origins
// 					},
// 				});
// 			}
// 		}

// 		// Return 404 for other routes
// 		return new Response('Not Found', { status: 404 });
// 	},
// };


///// FInal with D1 Data Base 
export default {
	async fetch(request, env) {
		const frontendUrl = env.CLIENT || 'http://localhost:5173';
		const backendUrl = env.SERVER || 'http://localhost:3549';
		const { pathname } = new URL(request.url);

		const requestOrigin = request.headers.get('origin');
		console.log('Request Origin:', requestOrigin);

		// Handle OPTIONS preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': '*', // Allow all origins for preflight
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
					'Access-Control-Max-Age': '86400',
				}
			});
		}

		// Allow public access to contact endpoints
		if (pathname === "/api/contact" && request.method === "POST") {
			try {
				const data = await request.json();
				console.log('Received Data:', data);

				const { name, email, message } = data;

				// Insert data into D1 database
				const insertQuery = `INSERT INTO Contacts (Name, Email, Message) VALUES (?, ?, ?)`;
				await env.DB.prepare(insertQuery)
					.bind(name, email, message)
					.run();

				return new Response(JSON.stringify({ success: true }), {
					status: 201,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*', // Allow all origins
					},
				});
			} catch (error) {
				console.error('Database insert error:', error);
				return new Response(JSON.stringify({ success: false, error: 'Failed to save message' }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				});
			}
		}

		if (pathname === "/api/contact" && request.method === "GET") {
			try {
				const { results } = await env.DB.prepare("SELECT * FROM Contacts").all();
				return new Response(JSON.stringify(results), {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*', // Allow all origins
					},
				});
			} catch (error) {
				console.error('Error fetching contacts:', error);
				return new Response(JSON.stringify({ success: false, error: 'Failed to fetch contacts' }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				});
			}
		}

		// For all other endpoints, enforce origin check
		if (requestOrigin !== frontendUrl) {
			return new Response('Forbidden: Unauthorized origin', {
				status: 403,
				headers: {
					'Access-Control-Allow-Origin': 'null',
					'Content-Type': 'text/plain',
				},
			});
		}

		// Forward other requests to the backend
		if (request.method === 'GET' || request.method === 'POST') {
			try {
				const url = new URL(request.url);
				const backendParsedUrl = new URL(backendUrl);
				url.hostname = backendParsedUrl.hostname;
				url.protocol = backendParsedUrl.protocol;
				url.port = backendParsedUrl.port || '';

				const modifiedRequest = new Request(url, {
					method: request.method,
					headers: request.headers,
					body: request.method === 'GET' || request.method === 'HEAD' ? null : await request.text(),
					redirect: 'manual'
				});

				const response = await fetch(modifiedRequest);
				const newHeaders = new Headers(response.headers);
				newHeaders.set('Access-Control-Allow-Origin', requestOrigin); // Allow the origin of the request

				return new Response(response.body, {
					status: response.status,
					statusText: response.statusText,
					headers: newHeaders
				});
			} catch (error) {
				console.error('Error forwarding request:', error);
				return new Response('Internal Server Error', { status: 500 });
			}
		}

		return new Response('Not Found', { status: 404 });
	},
};
