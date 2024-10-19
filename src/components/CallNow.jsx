// src/components/EndBar.jsx
import { motion } from "framer-motion";
import { FaGithub, FaPhone, FaEnvelope, FaLinkedin } from "react-icons/fa";

function CallNow() {
  return (
    <section id="callnow">
      <footer className="flex items-center justify-center p-6 bg-gray-800 text-white">
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://github.com/Shyam20001" // Replace with your GitHub link
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gray-700 py-2 px-4 rounded-lg hover:bg-gray-600 transition"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          {/* <a
          href="https://instagram.com/yourusername" // Replace with your Instagram link
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-gray-700 py-2 px-4 rounded-lg hover:bg-gray-600 transition"
        >
          <FaInstagram className="h-5 w-5" />
        </a> */}
          <a
            href="https://www.linkedin.com/in/shyam-m-136014250" // Replace with your LinkedIn link
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gray-700 py-2 px-4 rounded-lg hover:bg-gray-600 transition"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a
            href="tel:+919087095331"
            className="bg-blue-500 py-2 px-4 rounded-lg hover:bg-blue-400 transition flex items-center space-x-2"
          >
            <FaPhone className="h-5 w-5" />
          </a>
          <a
            href="mailto:mshayam41@gmail.com"
            className="bg-green-500 py-2 px-4 rounded-lg hover:bg-green-400 transition flex items-center space-x-2"
          >
            <FaEnvelope className="h-5 w-5" />
          </a>
        </motion.div>
      </footer>
    </section>
  );
}

export default CallNow;
