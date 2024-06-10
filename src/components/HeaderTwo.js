// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { BiSolidBellRing } from "react-icons/bi";

const HeaderTwo = () => {
  const [currentTime, setCurrentTime] = useState('');


  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
      setCurrentTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`);
    };

    updateTime();

  }, []);

  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center justify-between'>
        <div className='pt-1 pb-1 pl-2 pr-40 text-lg text-white bg-red-600 rounded ml-36'>
          <p>POS (Point Of Sales) v3.0</p>
        </div>
        <div className='flex items-center space-x-8 ml-auto'>
          <div className='bg-red-600 text-white rounded pt-1 pb-1 pl-2 pr-2'>
            <p className='text-lg'>{currentTime}</p>
          </div>
          <div className='relative text-2xl'>
            <span><BiSolidBellRing /></span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderTwo;
