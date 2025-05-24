import React, { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import { assets } from '../../assets/assets';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return {
              ...chapter,
              chapterContent: chapter.chapterContent.filter((_, index) => index !== lectureIndex),
            };
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureDuration || !lectureDetails.lectureUrl) {
      alert('Please fill in all lecture details.');
      return;
    }
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          return {
            ...chapter,
            chapterContent: [
              ...chapter.chapterContent,
              {
                ...lectureDetails,
                lectureDuration: Number(lectureDetails.lectureDuration),
                lectureOrder:
                  chapter.chapterContent.length > 0
                    ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                    : 1,
                lectureId: uniqid(),
              },
            ],
          };
        }
        return chapter;
      })
    );
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseTitle || !coursePrice || !chapters.length) {
      alert('Please fill in all required fields and add at least one chapter.');
      return;
    }
    const courseDescription = quillRef.current ? quillRef.current.root.innerHTML : '';
    const course = {
      id: uniqid(),
      courseTitle,
      coursePrice: Number(coursePrice),
      discount: Number(discount),
      courseDescription,
      chapters,
      thumbnail: image ? URL.createObjectURL(image) : '',
    };
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    localStorage.setItem('courses', JSON.stringify([...courses, course]));
    alert('Course added successfully!');
    setCourseTitle('');
    setCoursePrice(0);
    setDiscount(0);
    setImage(null);
    setChapters([]);
    if (quillRef.current) {
      quillRef.current.setContents([]);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Enter course description...',
      });
    }
    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 p-4 pt-8 pb-0'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='courseTitle' className='font-semibold'>Course Title</label>
          <input
            id='courseTitle'
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type='text'
            placeholder='Enter Course Title'
            className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500'
            required
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Course Description</label>
          <div ref={editorRef} className='border border-gray-500 rounded'></div>
        </div>
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='coursePrice' className='font-semibold'>Course Price ($)</label>
            <input
              id='coursePrice'
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type='number'
              min='0'
              placeholder='0'
              className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500'
              required
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='discount' className='font-semibold'>Discount (%)</label>
            <input
              id='discount'
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              type='number'
              min='0'
              max='100'
              placeholder='0'
              className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='thumbnailImage' className='font-semibold'>Course Thumbnail</label>
            <div className='flex items-center gap-3'>
              <label htmlFor='thumbnailImage' className='cursor-pointer'>
                <img
                  src={assets.file_upload_icon}
                  alt='Upload thumbnail'
                  className='p-3 bg-blue-500 rounded'
                />
                <input
                  id='thumbnailImage'
                  onChange={(e) => setImage(e.target.files[0])}
                  type='file'
                  accept='image/*'
                  hidden
                />
              </label>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt='Course thumbnail preview'
                  className='w-16 h-16 object-cover rounded'
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <h3 className='font-semibold mb-2'>Course Content</h3>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.chapterId} className='bg-white border rounded-lg mb-4'>
              <div className='flex justify-between items-center p-4 border-b'>
                <div className='flex items-center'>
                  <img
                    onClick={() => handleChapter('toggle', chapter.chapterId)}
                    src={assets.dropdown_icon}
                    width={14}
                    alt='Toggle chapter'
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed ? '-rotate-90' : ''
                    }`}
                  />
                  <span className='font-semibold'>
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className='text-gray-500'>
                    {chapter.chapterContent.length} Lecture{chapter.chapterContent.length !== 1 ? 's' : ''}
                  </span>
                  <img
                    onClick={() => handleChapter('remove', chapter.chapterId)}
                    src={assets.cross_icon}
                    alt='Delete chapter'
                    className='cursor-pointer'
                  />
                </div>
              </div>
              {!chapter.collapsed && (
                <div className='p-4'>
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lecture.lectureId} className='flex justify-between items-center mb-2'>
                      <div className='flex items-center gap-2'>
                        <span>
                          {lectureIndex + 1}. {lecture.lectureTitle}
                        </span>
                        <span>- {lecture.lectureDuration} mins</span>
                        {lecture.lectureUrl && (
                          <>
                            <span>-</span>
                            <a
                              href={lecture.lectureUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-blue-500'
                            >
                              Link
                            </a>
                          </>
                        )}
                        <span>- {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}</span>
                      </div>
                      <img
                        src={assets.cross_icon}
                        alt='Delete lecture'
                        className='cursor-pointer'
                        onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}
                      />
                    </div>
                  ))}
                  <div
                    className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2'
                    onClick={() => handleLecture('add', chapter.chapterId)}
                  >
                    <span>+</span>
                    <span>Add Lecture</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer'
            onClick={() => handleChapter('add')}
          >
            <span>+</span>
            <span>Add Chapter</span>
          </div>
        </div>
        {showPopup && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
              <div className='mb-2'>
                <h3 className='text-lg font-semibold mb-4'>Add New Lecture</h3>
                <img
                  onClick={() => setShowPopup(false)}
                  src={assets.cross_icon}
                  alt='Close popup'
                  className='absolute top-4 right-4 w-4 cursor-pointer'
                />
              </div>
              <div className='mb-2'>
                <label className='block font-semibold'>Lecture Title</label>
                <input
                  type='text'
                  className='mt-1 block w-full border rounded py-1 px-2'
                  value={lectureDetails.lectureTitle}
                  onChange={(e) =>
                    setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })
                  }
                  required
                />
              </div>
              <div className='mb-2'>
                <label className='block font-semibold'>Duration (minutes)</label>
                <input
                  type='number'
                  placeholder='Duration'
                  className='mt-1 block w-full border rounded py-1 px-2'
                  value={lectureDetails.lectureDuration}
                  onChange={(e) =>
                    setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })
                  }
                  min="1"
                  required
                />
              </div>
              <div className='mb-2'>
                <label className='block font-semibold'>Lecture URL</label>
                <input
                  type='url'
                  className='mt-1 block w-full border rounded py-1 px-2'
                  value={lectureDetails.lectureUrl}
                  onChange={(e) =>
                    setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })
                  }
                  placeholder='https://example.com/lecture'
                />
              </div>
              <div className='mb-4'>
                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    id='previewFree'
                    className='scale-125'
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })
                    }
                  />
                  Available for Free Preview
                </label>
              </div>
              <div className='flex justify-between gap-2'>
                <div>
                  <button
                    type='button'
                    className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button
                    type='button'
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                    onClick={addLecture}
                  >
                    Add Lecture
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <button type='submit' className='bg-black text-white w-max py-2.5 px-4 rounded my-4'>
          Create Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;