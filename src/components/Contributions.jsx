// src/components/Contributions.jsx

function Contributions() {
  return (
    <section id="contributions" className="py-20 bg-gradient-to-b from-gray-500 to-gray-400">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-semibold text-center mb-12">My Contributions</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Example Contribution Item */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition">
            <h4 className="text-2xl font-bold">Open Source Project XYZ</h4>
            <p className="mt-2">Contributed to the development of feature ABC, enhancing performance by 30%.</p>
          </div>
          {/* Add more contribution items as needed */}
        </div>
      </div>
    </section>
  );
}

export default Contributions;
