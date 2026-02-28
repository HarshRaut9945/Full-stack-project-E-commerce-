import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";

const SearchProduct = () => {
  const { products } = useContext(AppContext);
  const [searchProduct, setSearchProduct] = useState([]);
  const { term } = useParams();

  useEffect(() => {
    if (!term || !products) return;

    const filtered = products.filter((data) =>
      data.title?.toLowerCase().includes(term.toLowerCase())
    );

    setSearchProduct(filtered);
  }, [term, products]);

  return (
    <div className="container text-center">
      <h2 className="fw-bold mb-4">Search Results</h2>

      <div className="row g-4 justify-content-center">
        {searchProduct.length > 0 ? (
          searchProduct.map((product) => (
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
          ))
        ) : (
          <h4>No products found</h4>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;