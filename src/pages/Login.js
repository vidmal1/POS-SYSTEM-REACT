import React, { useContext, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import loginIcons from '../assest/signin.gif';
import pos from '../assest/3849523.jpg';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false)
  return (

    <section id='login' className='flex justify-center items-center h-screen'>
      


      <div className='flex  container justify-center items-center space-x-52'>

      <div className='mt-7'>

           <h className=' text-red-500 pl-20 pb-6'>POS (Point Of Sales)</h>

          <img src={pos} alt='pos image' className='w-80 h-80' />
        </div>

        <div className='bg-white p-2 p-5 w-full max-w-sm mx-auto rounded '>

          <div className='w-20 h-20 mx-auto'>

            <img src={loginIcons} alt='login icon' />
          </div>

          <form className='pt-6 flex flex-col gap-3' >
            <div className='grid'>
              <label>Email :</label>
              <div className='bg-slate-100  p-2'> <input type='email'
                placeholder='enter email'
                className='w-full h-full outline-none bg-transparent' />
              </div>

            </div>

            <div>
              <label>Password :</label>
              <div className='bg-slate-100 p-2 flex'><input type={showPassword ? "text" : "password"}
                placeholder='enter password'

                className='w-full h-full outline-none bg-transparent' />

                <div className='cursor-pointer text-xl ' onClick={() => setShowPassword((preve) => !preve)}>

                  <span>
                    {
                      showPassword ? (
                        <FaEyeSlash />
                      )
                        :
                        (
                          <FaEye />
                        )
                    }



                  </span>



                </div>



              </div>

              <div className='grid'>
                <label>User Role:</label>
                <div className='bg-slate-100 p-2 '>
                  <select className='w-full h-full outline-none bg-transparent border-none'>
                    <option value='admin'>Admin</option>
                    <option value='cashier'>Cashier</option>
                  </select>
                </div>
              </div>
              <div>
                <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                  forgot password ?

                </Link>



              </div>

            </div>




            <button className='bg-red-600 text-white px-6 py-2 hover:bg-red-700 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>


          </form>


        </div>


      </div>


    </section>


  )
}

export default Login