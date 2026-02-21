import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaDollarSign } from "react-icons/fa";
import RelatedProduct from "./RelatedProduct";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const url = "http://localhost:1000/api";

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const api = await axios.get(`${url}/product/${id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setProduct(api.data.product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchproduct();
  }, [id]);

  return (
    <>
    <div className="container my-5">
      <div className="row align-items-center shadow-lg p-4 rounded bg-light">
        {/* LEFT IMAGE */}
        <div className="col-md-5 text-center">
          <img
            src={product?.imgSrc}
            alt={product?.title}
            className="img-fluid rounded border"
            style={{ maxHeight: "320px", objectFit: "cover" }}
          />
        </div>

        {/* RIGHT DETAILS */}
        <div className="col-md-7">
          <h2 className="fw-bold mb-3">{product?.title}</h2>

          <p className="text-muted mb-4">{product?.description}</p>

          {/* PRICE */}
          <h1 className="text-success fw-bold d-flex align-items-center gap-2">
            <FaDollarSign />
            {product?.price}
          </h1>
          <h3>{product?.category}</h3>

          {/* BUTTONS */}
          <div className="mt-4 d-flex gap-3">
            <button className="btn btn-danger px-4 py-2 fw-semibold">
              Buy Now
            </button>

            <button className="btn btn-warning px-4 py-2 fw-semibold">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
     {/* <RelatedProduct category={product.category}/> */}
      {product && <RelatedProduct category={product.category} />}
     </>
  );
};

export default ProductDetail;
