import React, { createContext, useState, useContext } from "react";
const storageContext = createContext();

export function StorageProvider({ children }) {
  const [store, setStore] = useState([]);
  const [rotativo,setRotativo] = useState([store[store.length-1]])
  const [del,setDel] = useState([])
  const [ajuste,setAjuste] = useState([])

  return (
    <storageContext.Provider
      value={{
      store,
      setStore,
      rotativo,
      setRotativo,
      del,
      setDel,
      ajuste,
      setAjuste
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
