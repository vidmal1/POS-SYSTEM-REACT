import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NewProductCountProvider } from './components/NewProductCountContext';
import { CartProvider } from './components/CartContext';
import { Outlet } from 'react-router-dom';
import Footer from '../src/components/Footer';



function App() {
  return (
    <>
      <ToastContainer />
     
      <main>
    
        <NewProductCountProvider>
        
          <CartProvider>
            <Outlet />
          </CartProvider>
        </NewProductCountProvider>
        <Footer/>
      </main>
    </>
  );
}

export default App;
