// src/components/WorkExperience.jsx

function WorkExperience() {
  return (
    <section id="work" className="py-20 bg-gradient-to-b from-gray-700 to-gray-600">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-semibold text-center mb-12">Work Experience</h3>
        <div className="space-y-8">
          {/* Example Work Experience Item */}
          <div className="bg-gradient-to-r from-pink-500 to-red-500 p-6 rounded-lg shadow-lg transform hover:translate-y-2 transition">
            <h4 className="text-2xl font-bold">Node Js Architech at UniqueForce Technology, South-India</h4>
            <p className="mt-2">June 2023 - Present</p>
            <p className="mt-2">
              Working and guiding a team of developers in building scalable web applications using React and Node.js with Super fast frameworks such as Hono, Elysia, Next Js and UWS.
            </p>
          </div>
          {/* Add more work experience items as needed */}
        </div>
      </div>
    </section>
  );
}

export default WorkExperience;
