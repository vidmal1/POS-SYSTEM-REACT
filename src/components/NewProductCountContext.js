
import React, { createContext, useContext, useState } from 'react';

const NewProductCountContext = createContext();

export const useNewProductCount = () => {
  return useContext(NewProductCountContext);
};

export const NewProductCountProvider = ({ children }) => {
  const [newProductCount, setNewProductCount] = useState(0);

  return (
    <NewProductCountContext.Provider value={{ newProductCount, setNewProductCount }}>
      {children}
    </NewProductCountContext.Provider>
  );
};
