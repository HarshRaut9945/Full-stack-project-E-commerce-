import React, { useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { useEffect } from "react";

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

  return (
    <AppContext.Provider value={{ products }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
