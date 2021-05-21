import React, { createContext, useState, useContext } from "react";
const storageContext = createContext();

export function StorageProvider({ children }) {
  const [store, setStore] = useState([]);

  return (
    <storageContext.Provider
      value={{
      store,
      setStore
      }}
    >
      {children}
    </storageContext.Provider>
  );
}
export function useStorage() {
  const context = useContext(storageContext);
  return context;
}
