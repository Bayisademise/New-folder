import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../Context/AppContext';
import { useParams } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Footer from '../../Components/Students/Footer';
import Rating from '../../Components/Students/Rating';

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [videoError, setVideoError] = useState(null);

  const getCourseData = () => {
    const course = enrolledCourses.find((course) => course._id === courseId);
    if (course) {
      setCourseData(course);
    } else {
      console.warn('Course not found for ID:', courseId);
    }
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})|youtu\.be\/([0-9A-Za-z_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  const handleVideoError = (event) => {
    console.error('YouTube Player Error:', event);
    setVideoError('Failed to load video. Please try another lecture or check the URL.');
  };

  const handleVideoReady = (event) => {
    console.log('YouTube Player Ready:', event);
    setVideoError(null); // Clear any previous errors
    // Optional: Auto-play video when ready
    // event.target.playVideo();
  };

  useEffect(() => {
    console.log('Course ID:', courseId);
    console.log('Enrolled Courses:', enrolledCourses);
    getCourseData();
  }, [enrolledCourses, courseId]);

  useEffect(() => {
    if (playerData) {
      console.log('Player Data:', playerData);
      console.log('Video ID:', getYouTubeVideoId(playerData.lectureUrl));
    }
  }, [playerData]);

  return (
    <>
    <div className="p-4 sm:p-10 md:px-36 flex flex-col-reverse md:grid md:grid-cols-2 gap-10">
      {/* Left column: Course Structure */}
      <div className="text-yellow-800">
        <h2 className="text-xl font-semibold">Course Structure</h2>
        <div className="pt-5">
          {courseData ? (
            courseData.courseContent.map((chapter, index) => (
              <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      className={`transform transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                      src={assets.down_arrow_icon}
                      alt="Toggle section"
                      width={16}
                      height={16}
                    />
                    <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                  </div>
                  <p className="text-sm md:text-base">
                    {chapter.chapterContent.length} lecture{chapter.chapterContent.length !== 1 ? 's' : ''} -{' '}
                    {calculateChapterTime(chapter)}
                  </p>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections[index] ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <ul className="list-disc md:pl-4 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className="flex items-start gap-2 py-1">
                        <img
                          src={lecture.completed ? assets.blue_tick_icon : assets.play_icon}
                          alt={lecture.completed ? 'Completed' : 'Play'}
                          className="w-4 h-4 mt-1"
                        />
                        <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-base">
                          <p>{lecture.lectureTitle}</p>
                          <div className="flex gap-2">
                            {lecture.lectureUrl && (
                              <button
                                onClick={() => {
                                  console.log('Selected Lecture URL:', lecture.lectureUrl);
                                  setPlayerData({
                                    ...lecture,
                                    chapter: index + 1,
                                    lecture: i + 1,
                                  });
                                }}
                                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                              >
                                Watch
                              </button>
                            )}
                            <p>
                              {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                units: ['h', 'm'],
                              })}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p>Loading course data...</p>
          )}
        </div>
        <div className="flex items-center gap-2 mt-5">
          <h1 className="text-xl font-bold">Rate this course:</h1>
          <Rating  initialRating={0}/>
          {/* Add rating component here if needed */}
        </div>
      </div>

      {/* Right column: Video Player */}
      <div className="md:mt-0">
        {playerData && getYouTubeVideoId(playerData.lectureUrl) ? (
          <div>
            <YouTube
              videoId={getYouTubeVideoId(playerData.lectureUrl)}
              iframeClassName="w-full aspect-video rounded-lg"
              opts={{
                height: '100%',
                width: '100%',
                playerVars: {
                  autoplay: 0, // Set to 1 to auto-play (if desired)
                  controls: 1, // Show player controls
                  rel: 0, // Disable related videos
                  modestbranding: 1, // Minimize YouTube branding
                },
              }}
              onError={handleVideoError}
              onReady={handleVideoReady}
            />
            {videoError && <p className="text-red-500 mt-2">{videoError}</p>}
            <div className="flex justify-between items-center mt-2">
              <p className="text-base font-medium">
                {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
              </p>
              <button className="text-blue-600 hover:text-blue-700">
                {playerData.completed ? 'Completed' : 'Mark as Completed'}
              </button>
            </div>
          </div>
        ) : (
          <img
            src={courseData ? courseData.courseThumbnail : assets.placeholder}
            alt={courseData ? courseData.courseTitle : 'Course Thumbnail'}
            className="w-full aspect-video object-cover rounded-lg"
          />
        )}
      </div>

    </div>
    <Footer />
    </>
  );
};

export default Player;