import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import URL from '../../../API';

const RecentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false); 

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await axios.get(`${URL}/application`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
          },
        });
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
    console.log('Clicked button:', id, status); 
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.patch(`${URL}/application/update/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
      });
      if (response.status === 200) {
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
      const token = localStorage.getItem('token'); 
      const response = await axios.get(`${URL}/pet/${petId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setSelectedPet(response.data.pets[0]);
      setModalOpen(true); 
    } catch (error) {
      console.error('Error fetching pet data:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="bg-white border-[1px] border-gray-200/80 rounded-[10px] shadow-custom">
        <ToastContainer />
        {/* Modal for displaying pet details */}
        {modalOpen && selectedPet && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Pet Details
                    </h3>
                    <img src={selectedPet.url} alt={selectedPet.name} className="mx-auto my-4" style={{ maxWidth: '200px' }} />
                    <div className="mt-2">
                      <p className="text-sm text-gray-500"><strong>Name:</strong> {selectedPet.name}</p>
                      <p className="text-sm text-gray-500"> <strong>Type:</strong> {selectedPet.type}</p>
                      <p className="text-sm text-gray-500"><strong>Color:</strong> {selectedPet.color}</p>
                      <p className="text-sm text-gray-500"><strong>Age:</strong> {selectedPet.age}</p>
                      <p className="text-sm text-gray-500"><strong>Gender:</strong> {selectedPet.gender}</p>
                      <p className="text-sm text-gray-500"><strong>Description:</strong> {selectedPet.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={() => setModalOpen(false)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm" type="button">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
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
                      Aadhar Number
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{application.AadharId}</td>
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
    </div>
  );
};

export default RecentApplications;
