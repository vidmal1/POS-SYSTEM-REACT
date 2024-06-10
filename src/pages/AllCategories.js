import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { IoIosAddCircleOutline } from "react-icons/io";
import UploadCategory from '../components/UploadCategory';

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [openUploadCategory,setOpenUploadCategory] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8080/category/${categoryId}`);
      setCategories((prevCategories) => prevCategories.filter(category => category.categoryId !== categoryId));
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Product Category List</h2>
        <button className='border-2 py-1 px-3 rounded-full flex items-center bg-red-200 border-red-200 font-bold hover:text-white hover:bg-red-600' onClick={()=>setOpenUploadCategory(true)}>
          <IoIosAddCircleOutline className='mr-2' /> Add New Category</button>
      </div>
      {
       openUploadCategory && (
          
          <UploadCategory onClose={()=>setOpenUploadCategory(false)}/>

        )
      }

      <table className='w-full categoryTabletwo mt-2'>
        <thead>
          <tr className='bg-black text-white'>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.map((category) => (
            <tr key={category.categoryId}>
              <td>{category.categoryId}</td>
              <td>{category.categoryName}</td>
              <td>{category.date}</td>
              <td className='categoryAction'>
                <button
                  className='bg-red-200 p-2 rounded-full cursor-pointer hover:bg-red-400 hover:text-white'
                  onClick={() => deleteCategory(category.categoryId)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCategories;
