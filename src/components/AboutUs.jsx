import React from 'react';
import { motion } from 'framer-motion';
import siddhaImage from '../assets/siddha.png';
import rentImage from '../assets/rent.png';
import famImage from '../assets/fam.png';



const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-300 mb-4">
          About RentLoop
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          RentLoop is your one-stop rental platform built for ease, trust, and accessibility. 
          Whether you're renting out items or looking to borrow, we make the process smooth and secure with digital KYC, smart listings, and instant access.
        </p>
      </motion.div>

      {/* Vision Image & Text Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
  <motion.img
    src={rentImage}
    alt="RentLoop Rental Concept"
    className="rounded-2xl shadow-lg"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  />

  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4 }}
  >
    <h2 className="text-2xl font-bold mb-2 text-indigo-500">Our Mission</h2>
    <p className="text-gray-700 dark:text-gray-300 text-md">
      RentLoop aims to empower the everyday Indian, especially from middle-class communities, 
      by providing a smarter way to rent and lend. No middlemen, no stress — just reliable rentals.
    </p>
  </motion.div>
</div>


      {/* Siddha Section (Self Dabba 💪) */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-indigo-50 dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-12"
      >
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300 mb-2 text-center">
          Meet the Visionary: <span className="text-pink-500">Siddha Ganesh Angara</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-6 mt-6 items-center">
          <img
  src={siddhaImage}

            alt="Siddha Ganesh"
            className="w-36 h-36 rounded-full shadow-md border-4 border-indigo-300"
          />
          <div className="text-md text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              I’m <strong className="text-indigo-600 dark:text-indigo-300">Siddha Ganesh Angara</strong>, a driven Computer Science student at <strong>VIT</strong>. 
              I built RentLoop not just as a project, but as a mission — to give back to the community I come from.
            </p>
            <p className="mt-3">
              My passion lies in solving real-world problems through tech. 
              I dream big and build fast — focused on making life better for students, working-class folks, and families who deserve digital tools just as powerful as the big players use.
            </p>
            <p className="mt-3 italic text-sm text-gray-500 dark:text-gray-400">
              (Also, I lowkey believe this is just the start — watch out for what’s next 😉)
            </p>
          </div>
        </div>
      </motion.div>

      {/* Final Image Section */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="flex flex-col md:flex-row items-center gap-6 mt-16 px-4"
>
  {/* Family Image */}
  <img
    src={famImage}
    alt="Family Community"
    className="w-40 h-auto rounded-xl shadow-md"
  />

  {/* Custom Message */}
  <div className="text-left">
    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 mb-2">
      Community First
    </h3>
    <p className="text-gray-700 dark:text-gray-300 max-w-xl text-md italic">
      At RentLoop, we believe in building for the backbone of our society — families.
      Because a safe, affordable rental system isn’t a luxury — it’s a necessity.
    </p>
  </div>
</motion.div>

    </div>
  );
};

export default AboutUs;
