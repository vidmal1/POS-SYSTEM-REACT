import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = ({ onClose, refreshUsers }) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function handleusername(event) {
        setUserName(event.target.value);
    }

    function handleemail(event) {
        setEmail(event.target.value);
    }

    function handlepassword(event) {
        setPassword(event.target.value);
    }

    function handleConfirmPassword(event) {
        setConfirmPassword(event.target.value);
    }

    function handleRole(event) {
        setRole(event.target.value);
    }

    function createUser(event) {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const data = {
            userName: userName,
            email: email,
            password: password,
            role: role,
        };
        axios.post("http://localhost:8080/users", data)
            .then(function (response) {
                toast.success("User created successfully!");
                setUserName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setRole("");
                onClose();
                refreshUsers();
            })
            .catch(function (error) {
                console.log(error);
                toast.error("Failed to create user.");
            });
    }

    return (
        <section id='signup'>
            <div className='fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
                <ToastContainer />
                <div className='mx-auto container p-4'>
                    <div className='bg-white  p-5 w-full max-w-sm mx-auto rounded'>
                        <div className='flex justify-between items-center'>
                            <h2 className='font-bold text-lg'>Create User</h2>
                            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                                <IoMdClose />
                            </div>
                        </div>
                        <form className='pt-6 flex flex-col gap-2' onSubmit={createUser}>
                            <div className='grid'>
                                <label>Name :</label>
                                <div className='bg-slate-100 p-2'>
                                    <input
                                        type='text'
                                        onChange={handleusername}
                                        placeholder='enter your name'
                                        value={userName}
                                        required
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                </div>
                            </div>
                            <div className='grid'>
                                <label>Email :</label>
                                <div className='bg-slate-100 p-2'>
                                    <input
                                        type='email'
                                        onChange={handleemail}
                                        placeholder='enter email'
                                        name='email'
                                        value={email}
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Password :</label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        onChange={handlepassword}
                                        placeholder='enter password'
                                        value={password}
                                        required
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                    <div
                                        className='cursor-pointer text-xl'
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        <span>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>Confirm Password :</label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        onChange={handleConfirmPassword}
                                        placeholder='re-enter password'
                                        value={confirmPassword}
                                        required
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                    <div
                                        className='cursor-pointer text-xl'
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    >
                                        <span>
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='grid'>
                                <label>User Role:</label>
                                <div className='bg-slate-100 p-2'>
                                    <select
                                        value={role}
                                        onChange={handleRole}
                                        className='w-full h-full outline-none bg-transparent border-none'
                                        required
                                    >
                                        <option value=''>Select Role</option>
                                        <option value='Admin'>Admin</option>
                                        <option value='Cashier'>Cashier</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='bg-red-600 text-white px-6 py-2 hover:bg-red-700 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
                            >
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;