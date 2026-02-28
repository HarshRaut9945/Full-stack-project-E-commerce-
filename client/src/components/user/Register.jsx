import React, { useContext, useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const {register}=useContext(AppContext);
    const navigate=useNavigate();
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };
const {name,email,password}=formdata
  const submitHandler = async(e) => {
    e.preventDefault();
    // alert("Your form has been submitted");
  const result=  await register(name,email,password);

  
  if(result.success){
    navigate('/login')
  }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
      <div className="card register-card shadow-lg p-4">
        <h2 className="text-center mb-4 fw-bold text-warning">
          Create Account
        </h2>

        <form onSubmit={submitHandler}>
          {/* Name */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-warning text-dark">
              <FaUser />
            </span>
            <input
              name="name"
              value={formdata.name}
              onChange={onChange}
              type="text"
              className="form-control"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-warning text-dark">
              <FaEnvelope />
            </span>
            <input
              name="email"
              value={formdata.email}
              onChange={onChange}
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 input-group">
            <span className="input-group-text bg-warning text-dark">
              <FaLock />
            </span>
            <input
              name="password"
              value={formdata.password}
              onChange={onChange}
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-warning fw-semibold">
              Register
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .register-card {
          width: 100%;
          max-width: 420px;
          border-radius: 16px;
          background: #1c1c1c;
          color: white;
        }

        .form-control {
          background: #2a2a2a;
          border: none;
          color: white;
        }

        .form-control:focus {
          box-shadow: 0 0 0 2px #ffc10755;
          background: #2a2a2a;
          color: white;
        }

        .input-group-text {
          border: none;
        }

        button:hover {
          transform: translateY(-1px);
          transition: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Register;