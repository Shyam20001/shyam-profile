// import { useState } from 'react'
// import axios from 'axios';
// import reactLogo from './assets/react.svg'
// import appLogo from '/favicon.svg'
// import PWABadge from './PWABadge.jsx'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)
//   const [responseData, setResponseData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleGetRequest = () => {
//     setLoading(true);
//     setError(null);

//     axios
//       .get(`${import.meta.env.VITE_URL}/healthz`) // Replace with your URL
//       .then((response) => {
//         setResponseData(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   };

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={appLogo} className="logo" alt="shyam-profile logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>shyam-profile</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <div>
//       <button onClick={handleGetRequest} disabled={loading}>
//         {loading ? 'Loading...' : 'Fetch Data'}
//       </button>

//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}

//       {responseData && (
//         <div>
//           <h3>Response Data:</h3>
//           <pre>{JSON.stringify(responseData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//       <PWABadge />
//     </>
//   )
// }

// export default App
// src/components/SpinUp.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function SpinUp() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the GET request
  const handleGetRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/healthz`);
      setResponseData(response.data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically trigger the fetch request when the component mounts
  useEffect(() => {
    handleGetRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="spinup"
      className="py-20 bg-gradient-to-b from-gray-300 to-gray-200"
    >
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-600">
            App&apos;s Architecture
          </h1>
          <p className="mt-2 text-lg text-gray-700">
            Showcasing Expertise in Modern Web Development
          </p>
        </div>

        {/* Article Section */}
        <article className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Behind the Scenes: My Portfolio&apos;s Architecture
          </h2>
          <p className="text-gray-700 mb-4">
            Welcome to my portfolio! This React CSR PWA is meticulously crafted
            to demonstrate my proficiency in modern web development
            technologies. Here&apos;s an insight into the robust infrastructure
            that powers this platform:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Frontend:</strong> Built with React and Tailwind CSS,
              ensuring a responsive and visually appealing user interface across
              all devices, from compact 3-inch screens to expansive displays.
            </li>
            <li>
              <strong>Backend:</strong> Powered by a high-speed Hono Node.js
              clustered server, deployed on Render for optimal performance and
              scalability.
            </li>
            <li>
              <strong>Security:</strong> Enhanced security measures are in
              place, including a proxy layer using Cloudflare Workers. This
              setup not only fortifies the application against potential threats
              but also optimizes request routing for faster response times.
            </li>
            <li>
              <strong>Deployment:</strong> The seamless integration between the
              frontend and backend ensures that the portfolio operates smoothly
              as a Progressive Web App (PWA), offering offline capabilities and
              a native app-like experience.
            </li>
          </ul>
          <p className="text-gray-700">
            This architecture reflects my commitment to building secure,
            efficient, and user-centric web applications. Feel free to explore
            and interact with the components to get a firsthand experience of
            the technologies in action.
          </p>
        </article>

        {/* Action Section */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleGetRequest}
            disabled={loading}
            className="mb-6 px-6 py-3 bg-indigo-600 text-black rounded-lg shadow-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Spinning UP" : "Server ON"}
          </button>

          {error && <p className="text-red-500 mb-4">Error: {error}</p>}

          {responseData && (
            <div className="w-full max-w-2xl bg-yellow-300 shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-black">
                Response Data:
              </h3>
              <pre className="bg-gray-900 text-green-900 p-4 rounded-md overflow-x-auto">
                {JSON.stringify(responseData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SpinUp;
