"use client";

import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState(null);
  axios.interceptors.request.use(
    (config) => {
      const userToken = Cookies.get("token");
      config.headers.set("token", userToken);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          "https://hurd-tsonh.vercel.app/resident/check"
        );
        setUserData(data.username);
        setRole(data.role);
      } catch (error) {
        console.log(error, "asdfasdf");
      }
    };
    getUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        role,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
