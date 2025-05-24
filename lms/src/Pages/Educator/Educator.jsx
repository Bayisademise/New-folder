import React from 'react'
import { Outlet } from 'react-router-dom'
import Nabar from '../../Components/Educator/Nabar'
import Sidebar from '../../Components/Educator/Sidebar'
import Footer from '../../Components/Educator/Footer'



const Educator = () => {
  return (
    
        <div className='text-default min-h-screen bg-white'>
          <Nabar />
        <div className='flex'>
          <Sidebar />
          <div className='flex-1'>
            {<Outlet />}
            </div>
        </div>
       <Footer />
        </div>
    
  )
}

export default Educator