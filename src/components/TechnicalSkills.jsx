// src/components/TechnicalSkills.jsx

function TechnicalSkills() {
  const skills = [
    { name: 'React', level: '90%' },
    { name: 'Tailwind CSS', level: '85%' },
    { name: 'Node.js', level: '80%' },
    { name: 'GraphQL', level: '75%' },
    // Add more skills as needed
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-600 to-gray-500">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-semibold text-center mb-12">Technical Skills</h3>
        <div className="space-y-6">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-2">
                <span>{skill.name}</span>
                <span>{skill.level}</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
                  style={{ width: skill.level }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechnicalSkills;
