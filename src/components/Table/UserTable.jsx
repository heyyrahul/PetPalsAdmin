import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import URL from "../../../API";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data.user);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    return (
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) && (roleFilter === '' || user.role === roleFilter);
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleDelete = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedUserId(null);
  };
  
  const confirmDelete = () => {
    axios.delete(`${URL}/users/${selectedUserId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        setShowDeleteModal(false);
        const updatedUsers = users.filter(user => user._id !== selectedUserId);
        setUsers(updatedUsers);
        toast.success("User has been deleted.");
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user._id === userId);
    setEditedUser(userToEdit);
    setShowEditModal(true);
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setEditedUser(null);
  };

  const updateUser = () => {
    axios.patch(`${URL}/users/${editedUser._id}`, editedUser, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        const updatedUsers = users.map(user => {
          if (user._id === editedUser._id) {
            return editedUser;
          }
          return user;
        });
        setUsers(updatedUsers);
        setShowEditModal(false);
        setEditedUser(null);
        toast.success("User details updated successfully.");
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-white border-[1px] border-gray-200/80 rounded-[10px] shadow-custom">
        <div className="overflow-x-auto">
          <div className="flex justify-start gap-4 px-4 py-2">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Filter by role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {/* Table Header Rows */}
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      S.no.
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{indexOfFirstUser + index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => handleEdit(user._id)} className="text-indigo-600 hover:text-indigo-900 mr-2" style={{backgroundColor:"gray",borderRadius:"5px",width:"4rem",height:"2rem"}}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-900" style={{backgroundColor:"#D61A3C",borderRadius:"5px",width:"4rem",height:"2rem",color:"white"}}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="relative bg-white w-[400px] rounded-lg shadow-lg">
            <div className="p-6">
              <h2 className="text-lg font-semibold">Confirm Deletion</h2>
              <p className="mt-2">Are you sure you want to delete this user?</p>
              <div className="mt-4 flex justify-end">
                <button onClick={cancelDelete} className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="btn btn-danger" style={{backgroundColor:"#FF5C5C",borderRadius:"5px",width:"4.6rem"}}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="relative bg-white w-[400px] rounded-lg shadow-lg">
            <div className="p-6">
              <h2 className="text-lg font-semibold">Edit User</h2>
              {/* Form for editing user details */}
              <input type="text" value={editedUser.username} onChange={(e) => setEditedUser({...editedUser, username: e.target.value})} style={{width:"100%",borderRadius:"5px",borderColor:"gray",borderWidth:"2px"}} />
              <input type="email" value={editedUser.email} onChange={(e) => setEditedUser({...editedUser, email: e.target.value})} style={{width:"100%",borderRadius:"5px",margin:"10px 0px",borderColor:"gray",borderWidth:"2px"}}/>
              <input type="number" value={editedUser.age} onChange={(e) => setEditedUser({...editedUser, age: e.target.value})} style={{width:"100%",borderRadius:"5px",borderColor:"gray",borderWidth:"2px"}}/>
              <select value={editedUser.role} onChange={(e) => setEditedUser({...editedUser, role: e.target.value})}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <div className="mt-4 flex justify-end">
                <button onClick={cancelEdit} className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                  Cancel
                </button>
                <button onClick={updateUser} className="px-4 py-2 mr-2  text-gray-800 rounded-md hover:bg-gray-300" style={{backgroundColor:"#4CCD99"}}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Pagination */}
      <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastUser >= filteredUsers.length}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  );
};

export default UserTable;
