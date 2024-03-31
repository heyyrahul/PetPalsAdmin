import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null); // State to hold selected pet data

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://rich-gray-lovebird-tux.cyclic.app/application');
        const filteredApplications = response.data.application.filter(app => app.status === 'Applied');
        setApplications(filteredApplications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    console.log('Clicked button:', id, status); // Debugging statement
    try {
      const response = await axios.patch(`https://rich-gray-lovebird-tux.cyclic.app/application/update/${id}`, { status });
      if (response.status === 200) {
        // Assuming the patch request is successful, remove the application from the list
        setApplications(applications.filter(app => app._id !== id));
        if (status === 'Accept') {
          toast.success('Application has been approved');
        } else if (status === 'Reject') {
          toast.error('Application has been rejected');
        }
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleViewPet = async (petId) => {
    try {
      const response = await axios.get(`https://rich-gray-lovebird-tux.cyclic.app/pet/${petId}`);
      setSelectedPet(response.data.pet);
      // Display pet data in a modals or any other UI component
      console.log('Selected pet:', response.data.pet);
    } catch (error) {
      console.error('Error fetching pet data:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white border-[1px] border-gray-200/80 rounded-[10px] shadow-custom">
      <ToastContainer />
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    View Pet
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map(application => (
                  <tr key={application._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{application.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{application.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{application.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{application.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">{application.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-4">
                      {application.status === 'Applied' && (
                        <>
                          <button onClick={() => handleStatusChange(application._id, 'Accept')} className="text-black bg-green-500 px-4 py-1 rounded-md hover:bg-green-600" style={{backgroundColor: '#4CCD99'}}>Approve</button>
                          <button onClick={() => handleStatusChange(application._id, 'Reject')} className="text-black bg-red-500 px-4 py-1 rounded-md hover:bg-red-600" style={{backgroundColor: '#FF5C5C'}}>Reject</button>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleViewPet(application.petId)} className="text-blue-500 hover:text-blue-700" style={{backgroundColor: '#ACE2E1', borderRadius: '5px', padding: '5px 10px'}}>View Pet</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentApplications;
