
// src/App.jsx
import Navbar from './components/Navbar'; 
import Hero from './components/Hero';
import Education from './components/Education';
import WorkExperience from './components/WorkExperience';
import TechnicalSkills from './components/TechnicalSkills';
import Contributions from './components/Contributions';
import BlogDocs from './components/BlogDocs';
import Contact from './components/Contact';
import SpinUp from './components/SpinUp';
import CallNow from './components/CallNow'
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white min-h-screen">
      <Navbar />
      <Hero />
      <Education />
      <WorkExperience />
      <TechnicalSkills />
      <Contributions />
      <BlogDocs />
      <SpinUp/>
      <Contact />
      <CallNow/>
      <Footer />
    </div>
  );
}

export default App;
