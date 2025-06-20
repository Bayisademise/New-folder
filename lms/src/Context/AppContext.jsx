import React, { createContext, useEffect, useState } from 'react'; // Add React
import { dummyCourses } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourse] = useState([]); // Note: Typo in setEnrolledCourse

  // Fetch all courses
  const fetchAllCourses = () => {
    if (!dummyCourses || !Array.isArray(dummyCourses)) {
      console.error("Invalid dummyCourses data");
      setAllCourses([]);
      return;
    }
    setAllCourses(dummyCourses);
  };

  // Function to calculate average rating of course
  const calculateRating = (course) => {
    if (!course?.courseRatings?.length) {
      return 0;
    }
    const totalRating = course.courseRatings.reduce((sum, rating) => sum + (rating.rating || 0), 0);
    return totalRating / course.courseRatings.length;
  };

  // Function to calculate chapter time
  const calculateChapterTime = (chapter) => {
    if (!chapter?.chapterContent?.length) {
      return "0 min";
    }
    const time = chapter.chapterContent.reduce((sum, lecture) => sum + (lecture.lectureDuration || 0), 0);
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate course duration
  const calculateCourseDuration = (course) => {
    if (!course?.courseContent?.length) {
      return "0 min";
    }
    const time = course.courseContent.reduce((sum, chapter) => {
      if (!chapter?.chapterContent?.length) return sum;
      return sum + chapter.chapterContent.reduce((lecSum, lecture) => lecSum + (lecture.lectureDuration || 0), 0);
    }, 0);
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate number of lectures in the course
  const calculateNoOfLecture = (course) => {
    if (!course?.courseContent?.length) {
      return 0;
    }
    return course.courseContent.reduce((total, chapter) => {
      return total + (chapter.chapterContent?.length || 0);
    }, 0);
  };

  // Fetch Enrolled Course
  const fetchUserEnrolledCourse = async () => {
    setEnrolledCourse(dummyCourses); // Note: Fix typo if needed
  };

  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourse();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateNoOfLecture,
    calculateChapterTime,
    calculateCourseDuration,
    enrolledCourses,
    fetchUserEnrolledCourse,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;