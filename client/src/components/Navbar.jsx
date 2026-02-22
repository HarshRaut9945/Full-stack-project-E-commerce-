import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="nav">
        <div className="nav_bar bg-dark">
          <div className="left">
            <h3>MERN E-commerce</h3>
          </div>
          <div className="search_bar">
            <input type="text" />
          </div>
          <div className="right">
            <button className="btn btn-warning mx-3   ">cart</button>
            <button className="btn btn-warning mx-3   ">profile</button>
            <button className="btn btn-warning mx-3   ">login</button>
            <button className="btn btn-warning mx-3   ">register</button>
            <button className="btn btn-warning mx-3   ">logout</button>
          </div>
        </div>
        <div className="sub_bar"></div>
      </div>
    </>
  );
};

export default Navbar;
