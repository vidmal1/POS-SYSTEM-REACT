import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";

const Checkout = () => {
  const { cart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const navigate = useNavigate();

  const incrementQuantity = (id, currentQuantity) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const decrementQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const getTotalPriceAfterDiscount = () => {
    const totalPrice = getTotalPrice();
    const discountAmount = (totalPrice * discountPercentage) / 100;
    return totalPrice - discountAmount;
  };

  const handleCreateInvoice = async () => {
    const invoice = {
      customerName,
      createdTime: new Date().toISOString(),
      paymentMethod,
      totalPriceBeforeDiscount: getTotalPrice(),
      totalPriceAfterDiscount: getTotalPriceAfterDiscount(),
      discountPercentage,
      items: cart.map(item => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      const response = await axios.post('http://localhost:8080/invoice', invoice);
      toast.success('Invoice created successfully!');
      clearCart();
      navigate('/cashier');
    } catch (error) {
      toast.error('Error creating invoice');
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="w-4/6">
        <div className='bg-green-600 py-2 px-4 flex justify-between items-center'>
          <h2 className='font-bold text-lg text-white'>Check Out</h2>
          <button className='border-2 py-1 px-3 rounded-full flex items-center bg-green-100 border-red-200 font-bold hover:text-white hover:bg-red-600' onClick={() => navigate('/cashier')}>
            Back to Stock
          </button>
        </div>
        <div className='h-[calc(100vh-180px)] overflow-y-scroll'>
          {cart.map((item) => (
            <li key={item.id} className="pt-2 flex items-center py-1">
              <div className="bg-white pr-96 rounded shadow flex">
                <img src={item.productImageUrls[0]} alt={item.productName} className="w-32 h-32 object-cover rounded" />
                <div className='pl-5 grid'>
                  <h3 className="text-xl font-bold">{item.productName}</h3>
                  <p className="text-md text-gray-600">{item.category}</p>
                  <p className="text-2xl text-red-600 font-bold">${item.price}</p>
                  <div className='flex justify-center items-center rounded'>
                    <button
                      className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 ml-0.5 "
                      onClick={() => decrementQuantity(item.id, item.quantity)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="border-none p-2 w-16 text-center"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      min="1"
                    />
                    <button
                      className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6"
                      onClick={() => incrementQuantity(item.id, item.quantity)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
      <div className="w-2/6 flex flex-col items-center">
        <div className="ml-2 p-2 invoice-form border border-gray-300 rounded-lg bg-gray-50">
          <h2 className="text-lg font-bold mb-4">Create Invoice</h2>
          <label htmlFor='cusname'>Customer Name</label>
          <input
            type="text"
            id='cusname'
            placeholder="Customer Name"
            className="mb-2 p-2 mt-2 border border-gray-300 rounded w-full"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <label htmlFor='discount'>Discount</label>
          <input
            type="number"
            id='discount'
            placeholder="Discount (%)"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(parseInt(e.target.value))}
            className="mb-2 mt-2 p-2 border border-gray-300 rounded w-full"
          />
          <label htmlFor='method'>Payment Method</label>
          <select             className="mb-2 mt-2 p-2 border border-gray-300 rounded w-full"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Cash">Cash</option>
            <option value="POS">POS</option>
          </select>
          <h3 className="mt-4 text-lg font-bold bg-red-600 rounded p-2 text-center text-white">Total Price (Before Discount)</h3>
          <p className="mt-2 text-2xl font-bold text-center">${getTotalPrice()}</p>
          <h3 className="mt-4 text-lg font-bold bg-red-600 rounded p-2 text-center text-white">Total Price (After Discount)</h3>
          <p className="mt-2 text-2xl font-bold text-center">${getTotalPriceAfterDiscount()}</p>
          <button
            className="mt-7 bg-black text-white py-2 px-4 rounded w-full"
            onClick={handleCreateInvoice}
          >
            Create Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

