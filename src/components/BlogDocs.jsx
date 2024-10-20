// src/components/BlogDocs.jsx
import { useState } from "react";
import Modal from "./Modal"; // Import the Modal component
import ReactMarkdown from "react-markdown"; // Import react-markdown
import axios from "axios"; // Import axios for HTTP requests

function BlogDocs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [fetchData, setFetchData] = useState(null); // State to store fetch results
  const [fetchError, setFetchError] = useState(null); // State to store fetch errors
  const [fetchTime, setFetchTime] = useState(null); // State to store fetch time

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Node + Rust Fusion",
      summary:
        "As a passionate Node.js Developer I created an architecture with Node.js + Rust tokio runtime.",
      content: `
 ### Introduction
 Everyone knows that Node.js runs on a single main thread, which excels at I/O-intensive operations but struggles with CPU-intensive tasks. Fortunately, I have discovered a solution to enhance server performance by up to 4x.

 ### Rust Napi
 - **Napi-RS:** Rust N-API (or napi-rs) is a tool that allows developers to create native Node.js modules using Rust. This can be particularly beneficial because Rust provides performance and memory safety advantages.
 - **Performance:** Rust is known for its speed and efficiency. By leveraging Rust for performance-critical parts of your application, you can significantly enhance the performance of Node.js applications.
 - **Safety:** Rust's ownership model helps prevent common programming errors, such as null pointer dereferences and buffer overflows, which can lead to more stable and secure Node.js applications.
 - **Cross-Platform Support:** Like Node.js, Rust is cross-platform, meaning that modules can be compiled and run on various operating systems without major changes. Which better suits with Node/Deno/Bun Runtimes
 ### **Bench marks** (FIBONACCI OF 30) Click The Data BUTTON then ReadMore...
 `,
    },
    //     {
    //       id: 2,
    //       title: 'Optimizing Web Performance',
    //       summary: 'Strategies and best practices to enhance the performance of your web applications.',
    //       content: `
    //  ### Introduction
    //  Web performance optimization is crucial for providing a smooth user experience and improving SEO rankings.
    //  ### Techniques
    //  - **Code Splitting:** Break down your code into smaller chunks to load only what's necessary.
    //  - **Lazy Loading:** Delay loading images and other resources until they are needed.
    //  - **Minification:** Reduce the size of your CSS, JavaScript, and HTML files.
    //  ### Tools
    //  - **Lighthouse:** An open-source tool for improving the quality of web pages.
    //  - **Webpack Bundle Analyzer:** Visualize the size of webpack output files.
    //  ### Conclusion
    //  By implementing these strategies, you can significantly improve the speed and responsiveness of your web applications.
    //  `,
    //     },
    // Add more blog posts as needed
  ];

  // Function to handle opening the modal with selected post
  const handleReadMore = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setFetchData(null);
    setFetchError(null);
    setFetchTime(null);
  };

  // Function to fetch data from the specified URL
  const fetchDataFromUrl = async (url) => {
    const startTime = performance.now(); // Start time for analytics
    try {
      const response = await axios.get(url);
      const endTime = performance.now(); // End time for analytics
      setFetchData(response.data);
      setFetchTime((endTime - startTime).toFixed(2)); // Calculate time taken
      setFetchError(null); // Clear any previous errors
    } catch (error) {
      setFetchError(error.message);
      setFetchData(null); // Clear previous data on error
      setFetchTime(null); // Clear previous time on error
    }
  };

  return (
    <section
      id="blog"
      className="py-20 bg-gradient-to-b from-gray-400 to-gray-300"
    >
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-semibold text-center mb-12">
          Blog & Research
        </h3>
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gradient-to-r from-blue-400 to-indigo-500 p-6 rounded-lg shadow-lg transform hover:translate-y-2 transition cursor-pointer"
            >
              <h4 className="text-2xl font-bold">{post.title}</h4>
              <p className="mt-2">{post.summary}</p>
              <button
                onClick={() => handleReadMore(post)}
                className="text-blue-200 mt-4 inline-block hover:underline"
              >
                Read More &rarr;
              </button>
              {/* Conditional rendering for the fetch buttons only for id: 1 */}
              {post.id === 1 && (
                <div className="mt-4 flex flex-wrap space-x-2">
                  <button
                    onClick={() =>
                      fetchDataFromUrl(`${import.meta.env.VITE_URL}/rust-rs`)
                    }
                    className="bg-orange-600 text-white py-2 px-3 rounded-lg hover:bg-black transition w-full sm:w-auto"
                  >
                    Rust.rs Data
                  </button>
                  <button
                    onClick={() =>
                      fetchDataFromUrl(`${import.meta.env.VITE_URL}/node-js`)
                    }
                    className="bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-black transition w-full sm:w-auto"
                  >
                    Node.js Data
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for displaying blog post content */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedPost ? selectedPost.title : ""}
      >
        {selectedPost && (
          <div className="prose dark:prose-dark max-w-none">
            <ReactMarkdown>{selectedPost.content}</ReactMarkdown>

            {/* Display fetch results if available */}
            {fetchData && (
              <div className="mt-4">
                <h5 className="text-lg font-bold">Fetch Results:</h5>
                <pre className="bg-green-800 p-4 rounded-lg">
                  {JSON.stringify(fetchData, null, 2)}
                </pre>
                {fetchTime && (
                  <p className="text-sm text-white">
                    Time Taken: {fetchTime} ms
                  </p>
                )}
              </div>
            )}

            {/* Display fetch error if available */}
            {fetchError && (
              <div className="mt-4 text-red-600">
                <p>Error: {fetchError}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}

export default BlogDocs;
