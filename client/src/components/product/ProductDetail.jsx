import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const ProductDetail = () => {
    const [product, setproducts] = useState([]);
  const { id } = useParams();
  const url = "http://localhost:1000/api";
  useEffect(() => {
    const fetchproduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log(api.data);
    //   setproducts(api.data.products);
    };
    fetchproduct();
  }, [id]);
  return <div>productDetail={id}</div>;
};

export default ProductDetail;
