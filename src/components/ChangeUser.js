import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangeUser = ({ edit, onClose, onUpdateUser }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${edit}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [edit]);

  const updateUser = (event) => {
    event.preventDefault();

    const data = {
      userName: event.target.name.value,
      email: event.target.email.value,
      role: event.target.role.value,
    };

    axios.put(`http://localhost:8080/users/${edit}`, data)
      .then(function (response) {
        console.log(response);
        onUpdateUser(response.data); 
        toast.success("User updated successfully!");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Error updating user!");
      });
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
        <button className='block ml-auto' onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className='pb-4 text-lg font-medium text-center'>Change User</h1>
        
        <form className='pt-6 flex flex-col gap-2' onSubmit={updateUser}>
          <div className='grid'>
            <label>Name :</label>
            <div className='bg-slate-100 p-2'>
              <input type='text' 
                placeholder='Enter your name'
                name='name'
                defaultValue={userData.userName}
                required
                className='w-full h-full outline-none bg-transparent' 
              />
            </div>
          </div>

          <div className='grid'>
            <label>Email :</label>
            <div className='bg-slate-100 p-2'>
              <input type='email'
                placeholder='Enter email'
                name='email'
                defaultValue={userData.email}
                className='w-full h-full outline-none bg-transparent' 
              />
            </div>
          </div>

          <div className='grid'>
            <label>User Role:</label>
            <div className='bg-slate-100 p-2'>
              <select 
                name='role'
                className='w-full h-full outline-none bg-transparent border-none'
                defaultValue={userData.role}
              >
                <option value='Admin'>Admin</option>
                <option value='Cashier'>Cashier</option>
              </select>
            </div>
          </div>

          <button type='submit' className='bg-red-600 text-white px-6 py-2 hover:bg-red-700 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeUser;
