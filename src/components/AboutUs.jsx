import React from 'react';
import { motion } from 'framer-motion';
import siddhaImage from '../assets/siddha.png';
import rentImage from '../assets/rent.png';
import famImage from '../assets/fam.png';
import { Lightbulb, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Framer-motion variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Intro Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-16"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold text-indigo-600 dark:text-indigo-300 mb-4"
        >
          About RentLoop
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
        >
          RentLoop is your one-stop rental platform built for ease, trust, and accessibility. 
          Whether you're renting out items or looking to borrow, we make the process smooth and secure with digital KYC, smart listings, and instant access.
        </motion.p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
      >
        <div className="relative">
          <img
            src={rentImage}
            alt="RentLoop Rental Concept"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Our Mission: Empowering Communities
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            RentLoop aims to empower the everyday Indian, especially from middle-class communities, by providing a smarter way to rent and lend. 
            We're here to build a reliable rental ecosystem with **no middlemen** and **no stress**—just trusted, accessible rentals for everyone.
          </p>
        </div>
      </motion.div>

      {/* Meet the Founder Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-indigo-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl mb-20 relative"
      >
        <div className="absolute top-0 right-8 transform -translate-y-1/2">
          <Lightbulb className="w-16 h-16 text-indigo-400 opacity-30" />
        </div>
        <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-300 mb-6">
          Meet the Visionary
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img
            src={siddhaImage}
            alt="Siddha Ganesh Angara"
            className="w-40 h-40 rounded-full shadow-lg border-4 border-indigo-400"
          />
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="mb-3 text-lg">
              I’m <strong className="text-indigo-600 dark:text-indigo-300">Siddha Ganesh Angara</strong>, a driven Computer Science student at **VIT**. I built RentLoop not just as a project, but as a mission—to give back to the community I come from.
            </p>
            <p className="mb-3 text-lg">
              My passion lies in solving real-world problems through tech. I dream big and build fast—focused on making life better for students, working-class folks, and families who deserve digital tools just as powerful as the big players use.
            </p>
            <p className="mt-4 italic text-sm text-gray-500 dark:text-gray-400">
              This is just the start. Watch out for what’s next 😉
            </p>
          </div>
        </div>
      </motion.div>

      {/* Community Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
      >
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Building for the Community
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            At RentLoop, we believe in building for the backbone of our society—**families**. A safe, affordable rental system isn’t a luxury; it’s a necessity. We're dedicated to creating a platform that everyone can trust and rely on, fostering a sense of shared community.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <img
            src={famImage}
            alt="Family Community"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center bg-indigo-600 dark:bg-indigo-800 rounded-3xl py-12 px-6 text-white shadow-2xl"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Join the RentLoop Community
        </h3>
        <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
          Whether you're looking to save money or make some extra cash, your journey starts here.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-indigo-600 font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
        >
          Get Started Today
          <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
};

export default AboutUs;