import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

const RelatedProduct = ({ category, currentId }) => {
  const { products } = useContext(AppContext);
  const [relatedproduct, setrelatedProduct] = useState([]);

  useEffect(() => {
    if (!category || !products) return;

    const filtered = products.filter(
      (data) =>
        data.category?.toLowerCase() === category.toLowerCase() &&
        data._id !== currentId
    );

    setrelatedProduct(filtered);
  }, [category, products, currentId]);

  return (
    <div className="container text-center">
      <h2 className="fw-bold mb-4">Related Products</h2>

      <div className="row g-4 justify-content-center">
        {relatedproduct.map((product) => (
          <div
            key={product._id}
            className="col-xl-3 col-lg-4 col-md-6 d-flex justify-content-center"
          >
            <div className="card shadow-lg border-0 h-100 bg-dark text-light product-card">
              
              <Link to={`/product/${product._id}`} className="text-center p-3">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="img-fluid rounded product-img"
                />
              </Link>

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

      <style>{`
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
      `}</style>
    </div>
  );
};

export default RelatedProduct;