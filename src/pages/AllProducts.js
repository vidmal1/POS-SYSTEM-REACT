import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import UploadProducts from '../components/UploadProducts';
import EditProduct from '../components/EditProduct';
import { MdEdit, MdDelete } from "react-icons/md";
import axios from 'axios';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductOpen, setEditProductOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEditClick = (productId) => {
    setEditProductId(productId);
    setEditProductOpen(true);
  };

  const handleDeleteClick = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/product/${productId}`);
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Stock Inventory</h2>
        <button className='border-2 py-1 px-3 rounded-full flex items-center bg-red-200 border-red-200 font-bold hover:text-white hover:bg-red-600' onClick={() => setOpenUploadProduct(true)}>
          <IoIosAddCircleOutline className='mr-2' /> Add New Product
        </button>
      </div>
      {openUploadProduct && (
        <UploadProducts onClose={() => setOpenUploadProduct(false)} onUploadSuccess={fetchProducts} />
      )}
      {editProductOpen && (
        <EditProduct productId={editProductId} onClose={() => setEditProductOpen(false)} onUpdateProduct={fetchProducts} />
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {products.map(product => (
          <div key={product.id} className='bg-white p-4 rounded text-center'>
            <h3 className='font-bold text-lg'>{product.productName}</h3>
            <p className='text-sm text-gray-600'>Brand: {product.brandName}</p>
            <p className='text-sm text-gray-600'>Category: {product.category}</p>
            <p className='text-sm text-gray-600'>Price: ${product.price}</p>
            <p className='text-sm text-gray-600'>QOH: {product.qoh}</p>
            <div className='flex flex-wrap gap-2 mt-2 justify-center'>
              {product.productImageUrls && product.productImageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Product ${index}`} className='w-24 h-24 object-cover' />
              ))}
            </div>
            <div className='text-center mt-3 space-x-4'>
              <button
                className='bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-white'
                onClick={() => handleEditClick(product.id)}
              >
                <MdEdit />
              </button>
              <button
                className='bg-red-200 p-2 rounded-full cursor-pointer hover:bg-red-400 hover:text-white'
                onClick={() => handleDeleteClick(product.id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
