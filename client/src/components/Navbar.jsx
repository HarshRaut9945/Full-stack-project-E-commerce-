import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="nav">
        <div className="nav_bar">
          <div className="left">
            <h3>MERN E-commerce</h3>
          </div>
          <div className="search_bar">
            <input type="text" />
          </div>
          <div className="right">
            <button className="btn btn-warning">cart</button>
            <button className="btn btn-warning">profile</button>
            <button className="btn btn-warning">login</button>
            <button className="btn btn-warning">register</button>
            <button className="btn btn-warning">logout</button>
          </div>
        </div>
        <div className="sub_bar"></div>
      </div>
    </>
  );
};

export default Navbar;
