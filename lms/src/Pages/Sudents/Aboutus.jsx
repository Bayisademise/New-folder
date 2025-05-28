import React from 'react'
import Footer from '../../Components/Students/Footer'

import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Aboutus = () => {
  return (
   <div className="min-h-screen bg-white text-default">
      
      <section className="py-10 px-8 md:px-36">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">About Us</h1>
<img
          src={assets.about || 'https://via.placeholder.com/600x300?text=About+Us'} // Fallback placeholder
          alt="About Us"
          className="w-full max-w-2xl mx-auto mb-6 rounded-lg shadow-md"
        />
        <p className="text-gray-700 text-sm md:text-base mb-4">
          We are a platform dedicated to empowering students and educators. Our mission is to provide accessible, high-quality education through innovative tools and resources. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nisi qui fugiat porro sed delectus veniam blanditiis.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            to="/Course-list"
            className="bg-blue-600 text-white px-6 py-3 rounded inline-block text-sm hover:bg-blue-700 transition"
          >
            Explore Our Courses
          </Link>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Placeholder promotional video link
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm hover:text-blue-800 transition"
          >
            Watch Our Roadmap Video
          </a>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Aboutus