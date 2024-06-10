import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit, MdDelete } from "react-icons/md";
import ChangeUser from '../components/ChangeUser';
import { toast } from 'react-toastify';
import { IoIosAddCircleOutline } from "react-icons/io";
import SignUp from '../pages/SignUp';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [edit, setEdit] = useState(null);
  const [openCreateUser, setOpenCreateUser] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateUserInState = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userId === updatedUser.userId ? updatedUser : user
      )
    );
    setOpenUpdate(false);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter(user => user.userId !== userId));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>User Information</h2>
        <button className='border-2 py-1 px-3 rounded-full flex items-center bg-red-200 border-red-200 font-bold hover:text-white hover:bg-red-600' onClick={() => setOpenCreateUser(true)}>
          <IoIosAddCircleOutline className='mr-2' /> Add New User
        </button>
      </div>

      {openCreateUser && (
        <SignUp onClose={() => setOpenCreateUser(false)} refreshUsers={fetchData} />
      )}

      <table className='w-full userTable mt-3'>
        <thead>
          <tr className='bg-black text-white'>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className='userAction'>
                <button
                  className='bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-white'
                  onClick={() => {
                    setEdit(user.userId);
                    setOpenUpdate(true);
                  }}
                >
                  <MdEdit />
                </button>
              </td>
              <td>
                <button
                  className='bg-red-200 p-2 rounded-full cursor-pointer hover:bg-red-400 hover:text-white'
                  onClick={() => deleteUser(user.userId)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openUpdate && (
        <ChangeUser
          edit={edit}
          onClose={() => setOpenUpdate(false)}
          onUpdateUser={updateUserInState}
        />
      )}
    </div>
  );
};

export default AllUsers;
