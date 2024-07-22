import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { router } from "expo-router";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => { // Ultra important, change localhost to your ipv4 address, if not, you will get Error fetching data: [TypeError: Network request failed]
    fetch("http://192.168.1.4:3000/api/data")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Social Service Offer has been fetched successfully"); // Log fetched data
        setData(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const logout = async () => {
    try { 
      setUser(null);
      setIsLogged(false);
      router.replace('/sign-in');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        data,
        setData,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
