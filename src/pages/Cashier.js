import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { MdLogout } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export const Cashier = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className='min-h-[calc(100vh-120px)] lg:flex'>
        <aside className='bg-white min-h-full w-full max-w-60 rounded-md customShadow text-lg font-bold'>
          <div className='p-8'>
            <nav className='flex flex-col space-y-3'>
            <Link to="" className='flex items-center justify-start hover:bg-gray-100 p-3 rounded-md' onClick={() => navigate('/cashier')}>
                <IoMdHome className='mr-2 text-xl' />
                Home
              </Link>
              <Link to="/" className='flex items-center justify-start hover:bg-gray-100 p-3 rounded-md'>
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
  )
}
