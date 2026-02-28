import React, { useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast,Bounce } from 'react-toastify';


const AppState = (props) => {
  const url = "http://localhost:1000/api";
  const [products, setproducts] = useState([]);
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
    };
    fetchproduct();
  }, []);

// register user 
 const register = async (name,email,password) => {
      const api = await axios.post(`${url}/user/register`,
        {name,email,password},
        {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
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
      return api.data
        // console.log("user register",api);  
    };

  return (
    <AppContext.Provider value={{ products,register }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
