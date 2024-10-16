// src/components/Education.jsx

function Education() {
  return (
    <section id="education" className="py-20 bg-gradient-to-b from-gray-800 to-gray-700">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-semibold text-center mb-12">Education</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Example Education Item */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-lg shadow-lg transform hover:translate-y-2 transition">
            <h4 className="text-2xl font-bold">Bachelor of Science in Computer Science</h4>
            <p className="mt-2">University XYZ, 2015 - 2019</p>
            <p className="mt-2">GPA: 3.8/4.0</p>
          </div>
          {/* Add more education items as needed */}
        </div>
      </div>
    </section>
  );
}

export default Education;
