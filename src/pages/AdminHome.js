import React, { useState, useEffect } from 'react';
import { FcSalesPerformance } from "react-icons/fc";
import { IoBagCheck } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import axios from 'axios';
import { useNewProductCount } from '../components/NewProductCountContext';
import { GiShoppingBag } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { CgListTree } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const { newProductCount, setNewProductCount } = useNewProductCount();
    const [allSales, setAllSales] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [invoiceCount, setInvoiceCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [todayDate, setTodayDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/invoices/today');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    useEffect(() => {
        const fetchAllSales = async () => {
          
          try {
            const response = await axios.get('http://localhost:8080/invoice');
            const sales = response.data;
            setInvoiceCount(response.data.length);
            const totalSales = sales.reduce((acc, invoice) => acc + invoice.totalPriceAfterDiscount, 0);
            setAllSales(totalSales);
          } catch (error) {
            console.error('Error fetching all sales:', error);
          }
        };
        
        const fetchProductCount = async () => {
          try {
            const response = await axios.get('http://localhost:8080/product');
            setProductCount(response.data.length);
          } catch (error) {
            console.error('Error fetching product count:', error);
          }
        };

        const fetchCategoryCount = async () => {
          try {
            const response = await axios.get('http://localhost:8080/category');
            setCategoryCount(response.data.length);
          } catch (error) {
            console.error('Error fetching product count:', error);
          }
        };
        
        const fetchUserCount = async () => {
          try {
            const response = await axios.get('http://localhost:8080/users');
            setUserCount(response.data.length);
          } catch (error) {
            console.error('Error fetching user count:', error);
          }
        };

        const getCurrentDate = () => {
          const dateOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
          const currentDate = new Date().toLocaleDateString('en-US', dateOptions);
          setTodayDate(currentDate);
      };

        fetchAllSales();
        fetchProductCount();
        fetchUserCount();
        getCurrentDate();
        fetchCategoryCount();
      }, []);

  return (
    <div className='container mx-auto px-1 py-1 h-[calc(100vh-140px)] overflow-y-scroll'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-green-200 p-4 rounded shadow-md flex items-center'>
          <FcSalesPerformance className='text-3xl text-green-600 mr-2' />
          <p className='font-bold text-lg'>All Sales: <span className='font-sans text-xl pl-3'>${allSales}</span></p>
        </div>
        <div className='bg-red-200 p-4 rounded shadow-md flex items-center'>
          <IoBagCheck className='text-3xl text-red-600 mr-2' />
          <p className='font-bold text-lg'>New Products ({newProductCount})</p>
        </div>
        <div className='bg-yellow-200 p-4 rounded shadow-md flex items-center'>
          <MdOutlineProductionQuantityLimits className='text-3xl text-yellow-600 mr-2' />
          <p className='font-bold text-lg'>Out Of Stocks</p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        <div className='bg-white p-4 rounded shadow-md flex items-center'>
          <GiShoppingBag className='text-3xl  mr-2 ' />
          <p className='font-bold text-lg'>Available Products:<span className='pl-3 text-2xl'>{productCount}</span></p>
          <button className='ml-auto bg-black text-white px-4 py-2 rounded' onClick={() => navigate('/admin/all-products')}>View</button>
        </div>
        <div className='bg-white p-4 rounded shadow-md flex items-center'>
          <FaUsers className='text-3xl mr-2 ' />
          <p className='font-bold text-lg'>Users:<span className='text-2xl pl-3'>{userCount}</span></p>
          <button className='ml-auto bg-black text-white px-4 py-2 rounded' onClick={() => navigate('/admin/all-users')}>View</button>
        </div>
        <div className='bg-white p-4 rounded shadow-md flex items-center'>
          <FaFileInvoiceDollar className='text-3xl mr-2 ' />
          <p className='font-bold text-lg'>Invoices:<span className='text-2xl pl-3'>{invoiceCount}</span></p>
          <button className='ml-auto bg-black text-white px-4 py-2 rounded'>View</button>
        </div>
        <div className='bg-white p-4 rounded shadow-md flex items-center'>
          <CgListTree className='text-3xl mr-2 ' />
          <p className='font-bold text-lg'>Categories:<span className='text-2xl pl-3'>{categoryCount}</span></p>
          <button className='ml-auto bg-black text-white px-4 py-2 rounded' onClick={() => navigate('/admin/category')}>View</button>
        </div>
      </div>
      <div>
      <p className='text-blue-700 font-serif text-2xl mt-4'>Today's <span className='text-red-600'>({todayDate})</span> Transactions</p>
      <table className='w-full userTable mt-3'>
                    <thead>
                        <tr className='bg-black text-white'>
                            <th className='px-4 py-2'>Invoice ID</th>
                            <th className='px-4 py-2'>Customer Name</th>
                            <th className='px-4 py-2'>Payment Method</th>
                            <th className='px-4 py-2'>Amount</th>
                            <th className='px-4 py-2'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td className='border px-4 py-2 font-serif'>{transaction.id}</td>
                                <td className='border px-4 py-2 font-serif'>{transaction.customerName}</td>
                                <td className='border px-4 py-2 font-serif'>{transaction.paymentMethod}</td>
                                <td className='border px-4 py-2 font-serif'>${transaction.totalPriceAfterDiscount}</td>
                                <td className='border px-4 py-2 font-serif'> <span className='p-1 bg-green-600 text-white rounded'>Paid</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

      </div>
      
    </div>
  );
}

export default AdminHome;
