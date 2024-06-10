// src/components/CashierHome.js
import React, { useState, useEffect } from 'react';
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import axios from 'axios';
import { useCart } from '../components/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CashierHome = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

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

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success('Product added to cart successfully!');
  };


  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Stock Inventory</h2>
        <Link to="checkout" className='border-2 py-1 px-3 rounded-full flex items-center bg-red-200 border-red-200 font-bold hover:text-white hover:bg-red-600'>
          <MdOutlineShoppingCartCheckout className='mr-2 text-xl' /> Check Out
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
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
                className='bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-600 hover:text-white'
                onClick={() => handleAddToCart(product)}
              >
                <BsCartPlus className='text-xl' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CashierHome;
