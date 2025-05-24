import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../Components/Students/Loading';

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    console.log('enrolledStudentsData:', dummyDashboardData.enrolledStudentsData); // Debugging
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center">
          <StaticCard icon={assets.patients_icon} value={dashboardData.enrolledStudentsData.length} label="Total Enrollment" />
          <StaticCard icon={assets.earning_icon} value={`${currency} ${dashboardData.totalEarnings}`} label="Total Earning" />
          <StaticCard icon={assets.appointments_icon} value={dashboardData.totalCourses || 0} label="Total Courses" />
        </div>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <h3 className="text-2xl font-medium text-gray-600 self-start mb-3">Latest Enrollments</h3>
          <table className="table-fixed md:table-auto w-full overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
                <th className="px-4 py-3 font-semibold">Student Name</th>
                <th className="px-4 py-3 font-semibold">Course Title</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <TableRow key={index} index={index} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StaticCard = ({ icon, value, label }) => (
  <div className="flex items-center gap-3 shadow-card border-blue-500 p-4 w-56 rounded-md">
    <img src={icon} alt={label} className="w-8 h-8" />
    <div>
      <p className="text-2xl font-medium text-gray-600">{value}</p>
      <p className="text-base text-gray-500">{label}</p>
    </div>
  </div>
);

const TableRow = ({ index, item }) => (
  <tr key={index} className='border-b border-gray-500/20'>
                    <td className='px-4 py-3 text-center hidden sm:table-cell'>{index + 1}</td>
                    <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                      <img src={(item.student || item['student ']).imageUrl} alt="profile" className='w-9 h-9 rounded-full' />
                      <span className='truncate'>{(item.student || item['student ']).name}</span>
                    </td>
                    <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
                  </tr>
);

export default Dashboard;