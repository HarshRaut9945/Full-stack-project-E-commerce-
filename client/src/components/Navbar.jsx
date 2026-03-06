import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { setFilterData, products } = useContext(AppContext);

  const filterbycategory = (cat) => {
    if (cat === products) {
      setFilterData(products);
    } else {
      setFilterData(
        products.filter((data) =>
          data.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }
  };

const filterbycategory = (cat) => {
    if (cat === products) {
      setFilterData(products);
    } else {
      setFilterData(
        products.filter((data) =>
          data.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }
  };



  const sumbitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>MERN E-commerce</h3>
          </Link>

          <form className="search_bar" onSubmit={sumbitHandler}>
            <FaSearch />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Product"
            />
          </form>

          <div className="right">
            <button className="btn btn-warning mx-3">cart</button>
            <button className="btn btn-warning mx-3">profile</button>

            <Link to={"/login"} className="btn btn-secondary mx-3">
              login
            </Link>

            <Link to={"/register"} className="btn btn-info mx-3">
              register
            </Link>

            <button className="btn btn-warning mx-3">logout</button>
          </div>
        </div>

        <div className="sub_bar">
          <div className="items" onClick={() => filterbycategory(products)}>
            No Filter
          </div>

          <div className="items" onClick={() => filterbycategory("mobiles")}>
            Mobile
          </div>

          <div className="items" onClick={() => filterbycategory("laptops")}>
            Laptops
          </div>

          <div className="items" onClick={() => filterbycategory("cameras")}>
            Cameras
          </div>

          <div className="items" onClick={() => filterbycategory("headphone")}>
            Headphones
          </div>

          <div className="items">15999</div>
          <div className="items">25999</div>
          <div className="items">49999</div>
          <div className="items">6999</div>
          <div className="items">89999</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;