import React from 'react';
import { assets } from '../../assets/assets';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div className='relative flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>
      <video
        className='absolute top-0 left-0 w-full h-full object-cover z-[-1]'
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://youtu.be/pZQeBJsGoDQ" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='relative z-10'>
        <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>
          Empower Your Future with the <br />courses design to{' '}
          <span className='text-red-600'>
            <br /> fit your choice.
          </span>
          <img
            src={assets.sketch}
            alt="sketch"
            className='md:block hidden absolute -bottom-7 right-0'
          />
        </h1>
        <h2 className='md:block md:text-3xl text-gray-500 max-w-2xl mx-auto font-semibold'>
          <span className='text-green-600'>
            WE tray to give some online education compromise with world knowledge
          </span>
        </h2>
        <p className='md:hidden text-gray-500 max-w-sm mx-auto'>
          by online education you can achive your vision
        </p>
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;