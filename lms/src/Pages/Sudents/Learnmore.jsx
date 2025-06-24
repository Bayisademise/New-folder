import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Learnmore = () => {
  return (
    <div className="flex flex-col items-center gap-8 pt-16 pb-24 px-8 md:px-36 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-4xl text-gray-800 font-semibold text-center">
        Explore Our Cutting-Edge LMS Platform
      </h1>
      <p className="text-gray-500 text-sm md:text-base text-center max-w-2xl">
        Discover a transformative learning experience with our LMS. From flexible course schedules to real-time progress tracking and a global learning community, our platform empowers you to achieve mastery at your own pace, anywhere in the world.
      </p>
      <div className="w-full max-w-3xl mt-8">
        <video
          className="w-full rounded-lg shadow-md"
          controls
          poster={assets.logo} // Replace with a thumbnail if available
        >
          {/* Add your video source here, e.g., <source src={assets.platform_demo} type="video/mp4" /> */}
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="text-gray-500 text-sm text-center mt-4">
          See our LMS in action with this platform overview video.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full max-w-5xl">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <img src={assets.logo} alt="course_icon" className="w-16 h-16 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Diverse Course Catalog</h3>
          <p className="text-gray-500 text-sm text-center mt-2">
            Explore thousands of courses across disciplines, from technology to humanities, designed for all skill levels.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <img src={assets.logo} alt="progress_icon" className="w-16 h-16 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Real-Time Progress Tracking</h3>
          <p className="text-gray-500 text-sm text-center mt-2">
            Stay motivated with detailed analytics and progress reports to monitor your learning journey.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <img src={assets.logo} alt="community_icon" className="w-16 h-16 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Global Learning Community</h3>
          <p className="text-gray-500 text-sm text-center mt-2">
            Collaborate with learners and educators worldwide to share insights and grow together.
          </p>
        </div>
      </div>
      <Link
        to="/getstarted"
        className="px-10 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors mt-8"
      >
        Start Learning Now
      </Link>
    </div>
  );
};

export default Learnmore;