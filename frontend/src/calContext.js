import React, { createContext, useContext, useState } from 'react';

const Calcontext = createContext();

export const useCal = () => useContext(Calcontext);

export const CalProvider = ({ children }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const value = {
    currentMonth,
    setCurrentMonth,
    currentYear,
    setCurrentYear
  };

  return (
    <Calcontext.Provider value={value}>
      {children}
    </Calcontext.Provider>
  );
};
