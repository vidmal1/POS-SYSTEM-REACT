import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaUserFriends } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { CgListTree } from "react-icons/cg";
import Header from '../components/Header';
import { MdLogout } from "react-icons/md";
import { IoMdHome } from "react-icons/io";


const Admin = () => {
  return (
    <div>
      <Header />
      <div className='min-h-[calc(100vh-120px)] lg:flex '>
        <aside className='bg-white min-h-full w-full max-w-60  customShadow text-lg font-bold'>
          <div className='p-8 '>
          <div className='mb-8'>
              <h2 className='text-2xl font-bold text-center border-b border-gray-700 pb-4'>Admin Panel</h2>
            </div>
            <nav className='flex flex-col space-y-3'>
            <Link to="home" className='flex items-center justify-start hover:bg-gray-100 p-3 rounded-md'>
                <IoMdHome className='mr-2 text-xl' />
                Home
              </Link>
              <Link to="all-users" className='flex items-center justify-start hover:bg-gray-100 p-3 rounded-md'>
                <FaUserFriends className='mr-2 text-xl' />
                Users
              </Link>
              <Link to="all-products" className='flex items-center justify-start hover:bg-gray-100 p-3 rounded-md'>
                <AiFillProduct className='mr-2 text-xl' />
                Products
              </Link>
              <Link to="category" className='flex items-center justify-start hover:bg-gray-100 p-3 rounded-md'>
                <CgListTree className='mr-2 text-xl' />
                Category
              </Link>
              <Link to="/" className='flex items-center justify-start hover:bg-gray-100 p-3 rounded-md text-red-500'>
               <MdLogout className='mr-2 text-xl'/>
                LogOut
              </Link>
            </nav>
          </div>
        </aside>
        <main className='w-full h-full p-2 bg-gray-100'>
         
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Admin;
