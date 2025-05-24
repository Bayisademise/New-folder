import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import SearchBar from '../../Components/Students/SearchBar';
import CourseCard from '../../Components/Students/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../Components/Students/Footer';
import Loading from '../../Components/Students/Loading';

const CourseList = () => {
  const navigate = useNavigate();
  const { allCourses, loading, error } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (!loading && allCourses && allCourses.length > 0) {
      const tempCourse = allCourses.slice();
      input
        ? setFilteredCourse(
            tempCourse.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourse);
    } else if (!loading && (!allCourses || allCourses.length === 0)) {
      setFilteredCourse([]);
    }
  }, [allCourses, input, loading]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">{error}</div>;
  }

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
            <p className="text-gray-500">
              <span
                className="text-blue-800 cursor-pointer"
                onClick={() => navigate('/')}
              >
                Home
              </span>{' '}
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>
        {input && (
          <div className="inline-flex items-center gap-4 py-2 border mt-8 -mb-8 text-gray-600">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt="Clear search"
              className="cursor-pointer"
              onClick={() => navigate('/Course-list')}
            />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredCourse.length > 0 ? (
            filteredCourse.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseList;