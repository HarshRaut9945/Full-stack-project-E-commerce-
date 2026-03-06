import React, { useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const AppState = (props) => {
  const url = "http://localhost:1000/api";
  const [products, setproducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setisAuthentication] = useState(false);
  const [filteredData,Setfilterdata]=useState()
  useEffect(() => {
    const fetchproduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.products);
      setproducts(api.data.products);
      Setfilterdata(api.data.products)
    };
    fetchproduct();
  }, [token]);

  // register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      },
    );
    // alert(api.data.message);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
    // console.log("user register",api);
  };

  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      },
    );
    // alert(api.data.message);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setToken(api.data.token);
    setisAuthentication(true);
    localStorage.setItem('token',api.data.token)
    return api.data;
    // console.log("user register",api);
  };

  return (
    <AppContext.Provider
      value={{ products, register, login, url, token, setisAuthentication,isAuthenticated,filteredData,filteredData,Setfilterdata}}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
