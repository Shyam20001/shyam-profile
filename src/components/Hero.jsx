// src/components/Hero.jsx
import { motion } from "framer-motion";

function Hero() {
  return (
    <section id="hero" className="flex items-center justify-center h-screen">
      <motion.div
        className="text-center p-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-2xl transform transition-transform hover:scale-105"
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: 10 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-4">Welcome Fellas..!!</h2>
        <p className="text-lg">
          Hi, I’m Shyam, a passionate Node.js architect driven by pure
          enthusiasm for modern web technologies. With expertise in Node, Bun,
          Deno, and serverless runtimes like Cloudflare, Vercel, and Netlify, I
          thrive on crafting efficient solutions. My experience with Docker
          monorepos and React Native has shaped me into a versatile developer.
          As I like to say, “I can do this all day!”
        </p>
      </motion.div>
    </section>
  );
}

export default Hero;
