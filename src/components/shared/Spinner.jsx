// src/components/shared/Spinner.js
import React from 'react';

const Spinner = ({ color = 'text-primary', size = 'h-8 w-8' }) => {
  return (
    <div
      className={`border-4 border-t-transparent border-gray-200 rounded-full ${size} ${color} animate-spin`}
    ></div>
  );
};

export default Spinner;
