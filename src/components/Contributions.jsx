// src/components/Contributions.jsx

function Contributions() {
  return (
    <section
      id="contributions"
      className="py-20 bg-gradient-to-b from-gray-500 to-gray-400"
    >
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-semibold text-center mb-12">
          My Contributions
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Example Contribution Item */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition">
            <h4 className="text-2xl font-bold">ITK EduTech</h4>
            <p className="mt-2">
              Contributed to the development of feature by making simple js
              library that parses the request body and check for type
              validations that is been used in Zoho-API, enhancing performance
              by 30%.
            </p>
          </div>
          <div className="bg-gradient-to-r from-violet-400 to-gray-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition">
            <h4 className="text-2xl font-bold">
              Spring Docker-Deploy on Render
            </h4>
            <p className="mt-2">
              Assisted my ex-colleague, a Spring developer, by creating a
              Dockerfile to set up the environment correctly for his personal
              site. This streamlined the deployment process on Render, ensuring
              compatibility with the Linux-based cloud environment. My
              contribution helped him overcome the challenges he faced during
              the deployment.
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition">
            <h4 className="text-2xl font-bold">NAPI-RS Starter for Node.js</h4>
            <p className="mt-2">
              Developed a NAPI-RS starter compatible with both Bun and Node.js.
              This starter was used to teach my developers how to increase CPU
              throughput, enhancing performance in CPU-bound tasks. Previously
              optimized for I/O, this setup now allows for significantly faster
              processing in compute-intensive scenarios.
            </p>
          </div>

          {/* Add more contribution items as needed */}
        </div>
      </div>
    </section>
  );
}

export default Contributions;
