import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadimage from '../helpers/uploadimage';
import { MdDelete } from "react-icons/md";
import DisplayImage from './DisplayImage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNewProductCount } from '../components/NewProductCountContext';

const UploadProducts = ({ onClose, onUploadSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploadproductimageinput, setuploadproductimageinput] = useState('');
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const { setNewProductCount } = useNewProductCount();

  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [price, setPrice] = useState("");
  const [qoh, setQoh] = useState("");
  const [productImage, setProductImage] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      productName,
      brandName,
      category: selectedCategory,
      productImageUrls: productImage,
      price,
      qoh,


    };

    axios.post("http://localhost:8080/product", data)
      .then(response => {
        console.log(response.data);
        toast.success("Product created successfully!");
        setProductName("");
        setBrandName("");
        setSelectedCategory("");
        setPrice("");
        setQoh("");
        setProductImage([]);
        setNewProductCount((prevCount) => prevCount + 1);
        onUploadSuccess(); // Call the callback to fetch products again
        onClose(); // Close the modal
      })
      .catch(error => {
        console.error(error);
        toast.error("Failed to create product.");
      });

      
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    setuploadproductimageinput(file.name);
    console.log("file", file);
  
    const uploadImageCloudinary = await uploadimage(file);
    const newProductImage = [...productImage, uploadImageCloudinary.url]; // Create a new array with the new image URL
    setProductImage(newProductImage);
    console.log("upload image", uploadImageCloudinary.url);
    
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...productImage];
    newProductImage.splice(index, 1);
    setProductImage(newProductImage);
  };

  return (
    <div className='fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg ml-3'>Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <IoMdClose />
          </div>
        </div>
        <form className='grid p-4 gap-2 overflow-scroll h-full' onSubmit={handleSubmit}>
          <label htmlFor='ProductName'>Product Name:</label>
          <input
            type='text'
            id='ProductName'
            placeholder='Enter Product Name'
            name='productName'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className='p-2 bg-slate-100 border rounded'
            required
          />
          <label htmlFor='brandName' className='mt-3'>Brand Name:</label>
          <input
            type='text'
            id='brandName'
            placeholder='Enter Brand Name'
            name='brandName'
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className='p-2 bg-slate-100 border rounded'
            required
          />
          
          <label htmlFor='category' className='mt-3'>Category:</label>
          <select
            id='category'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='p-2 bg-slate-100 border rounded'
            required
          >
            <option value=''>Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>

          <label htmlFor='productImage' className='mt-3'>Product Image:</label>
          <label htmlFor='UploadImage'>
            <div className='p-2 bg-slate-100 border rounded h-48 w-full flex justify-center text-center cursor-pointer'>
              <div className='text-slate-500 flex justify-center items-center flex-col'>
                <span className='text-5xl'><FaCloudUploadAlt /></span>
                <p>Upload product image</p>
                <input type='file' id='UploadImage' className='hidden' onChange={handleUploadProduct} />
              </div>
            </div>
          </label>
          <div>
            {productImage.length > 0 ? (
              <div className='flex items-center gap-2'>
                {productImage.map((el, index) => (
                  <div className='relative group' key={index}>
                    <img
                      src={el}
                      alt={el}
                      width={80}
                      height={80}
                      className='bg-slate-100 border cursor-pointer'
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-red-600 text-xs'>*Please upload product image</p>
            )}
          </div>
          <label htmlFor='price' className='mt-3'>Price:</label>
          <input
            type='number'
            id='price'
            placeholder='Enter price'
            name='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='p-2 bg-slate-100 border rounded'
            required
          />
          <label htmlFor='qoh' className='mt-3'>Q.O.H:</label>
          <input
            type='number'
            id='qoh'
            placeholder='Enter Q.O.H'
            name='qoh'
            value={qoh}
            onChange={(e) => setQoh(e.target.value)}
            className='p-2 bg-slate-100 border rounded'
            required
          />
          <button type='submit' className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 mt-6'>
            Upload Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
}

export default UploadProducts;
