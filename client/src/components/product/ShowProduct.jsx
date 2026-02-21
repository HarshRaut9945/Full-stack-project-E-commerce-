import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

const ShowProduct = () => {
  const { products } = useContext(AppContext);

  return (
    <div className="container py-4">
      <div className="row g-4 justify-content-center">
        {products?.map((product) => (
          <div
            key={product.id}
            className="col-xl-3 col-lg-4 col-md-6 d-flex justify-content-center"
          >
            <div className="card shadow-lg border-0 h-100 bg-dark text-light product-card">
              
              {/* Image */}
              <div className="text-center p-3">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="img-fluid rounded product-img"
                />
              </div>

              {/* Body */}
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title fw-semibold mb-3">
                  {product.title}
                </h5>

                <div className="mt-auto">
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-primary px-3">
                      ${product.price}
                    </button>

                    <button className="btn btn-warning fw-semibold">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Custom Styles */}
      <style>
        {`
        .product-card {
          border-radius: 14px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.4);
        }

        .product-img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border: 2px solid #ffc107;
        }
        `}
      </style>
    </div>
  );
};

export default ShowProduct;