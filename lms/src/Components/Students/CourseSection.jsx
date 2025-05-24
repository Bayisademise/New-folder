import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import  {AppContext} from '../../Context/AppContext'
import CourseCard from './CourseCard'

const CourseSection = () => {
  const {allCourses} = useContext(AppContext)

  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-8000'> Learn form our best website</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>Discover our top-rated course are crafted to deliver result.</p>

<div className='grid grid-cols-auto px-4 md:px-0 md:my-16 my-10 gap-4'>
  {allCourses.slice(0,4).map((course,index)=> < CourseCard key = {index} course={course}/>)}
</div>
      <Link to={'/Course-list'} onClick={()=> scrollTo(0,0)} className='text-blue-500 border border-gray-500/30 px-10 py-3 rounded' >Show all course list</Link>
    </div>
  )
}

export default CourseSection