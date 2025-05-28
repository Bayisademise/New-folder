import React from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import Home from './Pages/Sudents/Home';
import CourseList from './Pages/Sudents/CourseList';
import CourseDetail from './Pages/Sudents/CourseDetail';
import MyEnrollement from './Pages/Sudents/MyEnrollement';
import Player from './Pages/Sudents/Player';
import Educator from './Pages/Educator/Educator';
import AddCourse from './Pages/Educator/AddCourse';
import MyCourse from './Pages/Educator/MyCourse';
import SudentEnrollement from './Pages/Educator/SudentEnrollement';
import Navbar from './Components/Students/Navbar';
import Loading from './Components/Students/Loading';
import Footer from './Components/Students/Footer';
import "quill/dist/quill.snow.css"
import Dashboard from './Pages/Educator/Dashboard';
import Aboutus from './Pages/Sudents/AboutUs';
import Homes from './Pages/Sudents/Homes';

const App = () => {
  const isEducatorRoute = useMatch('/educator/*');
  return (
    <div className="text-default min-h-screen bg-white">
      {!isEducatorRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Course-list/:input?" element={<CourseList />} />
        <Route path="/Course/:input" element={<CourseDetail />} />
        <Route path="/my-enrollment" element={<MyEnrollement />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path='/load' element ={<Loading />}/>
        <Route  path='/about' element = {<Aboutus />}/>
         <Route  path='/homess' element = {<Homes />}/>
        <Route path='/footer' element ={<Footer />}/>
        <Route path="/educator" element={<Educator />}>
          <Route path='/educator' element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-course" element={<MyCourse />} />
          <Route path="student-enrollment" element={<SudentEnrollement />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;