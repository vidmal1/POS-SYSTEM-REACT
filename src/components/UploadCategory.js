import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import { parseISO } from 'date-fns';

const UploadCategory = ({ onClose }) => {
    const [categoryName, setCategoryName] = useState("");
    const [date, setDate] = useState("");

    const handlecategoryname = (event) => {
        setCategoryName(event.target.value);
    }

    const handledate = (event) => {
        setDate(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            categoryName: categoryName,
            date: parseISO(date) // Convert string to LocalDate object
        };

        axios.post("http://localhost:8080/category", data)
            .then(function (response) {
                toast.success('Category added successfully!');
                setCategoryName("");
                setDate("");
            })
            .catch(function (error) {
                console.error('Error adding category:', error);
                toast.error('Failed to add category.');
            })
    }

    return (
        <div className='fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[50%]'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-lg'>Add Category</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <IoMdClose />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='grid p-4 gap-2'>
                    <label htmlFor='categoryName'>Category Name:</label>
                    <input
                        type='text'
                        id='categoryName'
                        placeholder='Enter Category Name'
                        value={categoryName}
                        onChange={handlecategoryname}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    <label htmlFor="date">Created At :</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={handledate}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    <button type='submit' className='bg-red-600 text-white px-6 py-2 hover:bg-red-700 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
                        Add
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UploadCategory;
