// src/context/IdContext.js

import React, { createContext, useState } from 'react';

// Create a Context for the ID
export const IdContext = createContext();

// Create a provider component
export const IdProvider = ({ children }) => {
  const [generatedId, setGeneratedId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [orderDate, setOrderDate] = useState(null);

  return (
    <IdContext.Provider value={{ generatedId, setGeneratedId, customerId, setCustomerId,orderDate,setOrderDate}}>
      {children}
    </IdContext.Provider>
  );
};
