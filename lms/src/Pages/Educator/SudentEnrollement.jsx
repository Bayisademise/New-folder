import React, { useEffect, useState } from 'react';
import { assets, dummyStudentEnrolled } from '../../assets/assets';
import Loading from '../../Components/Students/Loading';

const StudentEnrollment = () => {
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEnrolledStudents = async () => {
    try {
      setLoading(true);
      // Placeholder for API call; replace with your endpoint
      // const response = await fetch('https://your-api-endpoint.com/enrolled-students', {
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // if (!response.ok) throw new Error('Failed to fetch enrolled students');
      // const data = await response.json();
      // setEnrolledStudents(data);

      // Using dummy data as fallback
      console.log('enrolledStudents:', dummyStudentEnrolled); // Debugging
      setEnrolledStudents(dummyStudentEnrolled);
    } catch (err) {
      setError(err.message);
      setEnrolledStudents(dummyStudentEnrolled); // Fallback to dummy data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return enrolledStudents.length ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4" role="grid" aria-label="Enrolled Students Table">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell" scope="col">#</th>
              <th className="px-4 py-3 font-semibold" scope="col">Student Name</th>
              <th className="px-4 py-3 font-semibold" scope="col">Course Title</th>
              <th className="px-4 py-3 font-semibold hidden sm:table-cell" scope="col">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-500">
            {enrolledStudents.map((item, index) => (
              <TableRow key={item.id || index} index={index} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="p-4 text-gray-500">No enrolled students found.</div>
  );
};

const TableRow = ({ index, item }) => (
  <tr className="border-b border-gray-500/20">
    <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
    <td className="md:px-4 px-3 py-3 flex items-center space-x-3">
      <img src={(item.student || item['student ']).imageUrl} alt="profile" className='w-9 h-9 rounded-full' />
      <span className='truncate'>{(item.student || item['student ']).name}</span>
    </td>
    <td className="px-4 py-3 truncate">{item.courseTitle || 'N/A'}</td>
    <td className="px-4 py-3 hidden sm:table-cell">
      {item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : 'N/A'}
    </td>
  </tr>
);

export default StudentEnrollment;