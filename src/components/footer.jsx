import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full text-center py-4 mt-10 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
      © {new Date().getFullYear()} RentLoop. All rights reserved.
    </footer>
  );
};

export default Footer;
