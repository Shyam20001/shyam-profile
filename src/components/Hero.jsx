// src/components/Hero.jsx
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section id="hero" className="flex items-center justify-center h-screen">
      <motion.div
        className="text-center p-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-2xl transform transition-transform hover:scale-105"
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: 10 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h2>
        <p className="text-lg">I&apos;m a passionate developer specializing in modern web technologies.</p>
      </motion.div>
    </section>
  );
}

export default Hero;
