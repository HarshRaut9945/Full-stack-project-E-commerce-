import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [searchTerm,setSearchTerm]=useState("")
  const sumbitHandler=(e)=>{
         e.preventDefault();
  }
  return (
    <>
      <div className="nav sticky-top" >
        <div className="nav_bar  ">
          <Link to={'/'} className="left" style={{textDecoration:'none',color:'white'}}>
            <h3>MERN E-commerce</h3>
          </Link>
          <form className="search_bar">
            <FaSearch />
            <input type="text" value={searchTerm} onClick={(e)=>setSearchTerm(e.target.value)} placeholder="Search Product" />
            
          </form>
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
