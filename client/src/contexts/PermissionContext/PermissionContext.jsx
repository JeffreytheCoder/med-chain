import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [access, setAccess] = useState(false);
  const [requestDoctorAddress, setRequestDoctorAddress] = useState('');

  return (
    <MyContext.Provider value={{ access, setAccess, requestDoctorAddress, setRequestDoctorAddress }}>
      {children}
    </MyContext.Provider>
  );
};