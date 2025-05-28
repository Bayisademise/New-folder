import React from 'react'
import Footer from '../../Components/Students/Footer'
import { assets } from '../../assets/assets'

const Homes = () => {
  return (
    
<div className="min-h-screen bg-white text-default">
     
      <section className="py-10 px-8 md:px-36 text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">Welcome to Our Learning Platform</h1>
        <p className="text-gray-700 text-sm md:text-base mb-6">
          Discover courses, connect with educators, and enhance your learning journey.
        </p>
        <img src={assets.logo} alt="platform_logo" className="mx-auto mb-6 w-32" />
        <a
          href="/Course-list"
          className="bg-blue-600 text-white px-6 py-3 rounded inline-block"
        >
          Explore Courses
        </a>
      </section>
      <Footer />
      </div>


  )
}

export default Homes