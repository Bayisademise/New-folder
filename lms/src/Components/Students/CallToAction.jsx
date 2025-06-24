import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    alert('Great start!'); // Display "Great start" message
    navigate('/getstarted'); // Programmatically navigate to /getstarted
  };

  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">
        Learn anything, anytime, anywhere
      </h1>
      <p className="text-gray-500 sm:text-sm">Education is the first choice to become knowledgeable</p>
      <div className="flex items-center font-medium gap-6 mt-4">
        <button
          onClick={handleGetStarted}
          className="px-10 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Get Started
        </button>
        <Link
          to="/learnmore"
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          Learn more
          <img src={assets.arrow_icon} alt="arrow_icon" />
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;