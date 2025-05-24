import React from 'react'
import Hero from '../../Components/Students/Hero'
import University from '../../Components/Students/University'
import CourseSection from '../../Components/Students/CourseSection'
import TestMonialSection from '../../Components/Students/TestMonialSection'
import CallToAction from '../../Components/Students/CallToAction'
import Footer from '../../Components/Students/Footer'
import Loading from '../../Components/Students/Loading'



const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero />
      <University />
      <CourseSection />
      <TestMonialSection />
      <CallToAction />

      <Footer />
      <Loading />
 
    </div>
  )
}

export default Home