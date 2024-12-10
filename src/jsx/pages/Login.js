import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../images/login.png";

const Login = () => {
   const [loginData, setLoginData] = useState({});
   const handleBlur = (e) => {
      const newLoginData = { ...loginData };
      newLoginData[e.target.name] = e.target.value;
      setLoginData(newLoginData);
   };
   const nav = useNavigate();
   const submitHandler = (e) => {
      e.preventDefault();
      nav("/");
   };

   return (
      <div className="authincation">
         <div className="container">
            <div className="row h-100 align-items-center g-0">
               <div className="col-md-6">
                  <img src={loginImage} className="img-fluid" alt="Login" />
               </div>
               <div className="col-md-6">
                  <div className="authincation-content" style={{ height: "68vh" }}>
                     <div className="row no-gutters">
                        <div className="col-xl-12">
                           <div className="auth-form">
                              <h4 className="text-center mb-4">
                                 Sign in to your account
                              </h4>
                              <form onSubmit={(e) => submitHandler(e)}>
                                 <div className="form-group">
                                    <label className="mb-1">
                                       <strong>Email</strong>
                                    </label>
                                    <input
                                       type="email"
                                       className="form-control"
                                       placeholder="Enter your email"
                                       name="Email"
                                       onChange={handleBlur}
                                    />
                                 </div>
                                 <div className="form-group">
                                    <label className="mb-1">
                                       <strong>Password</strong>
                                    </label>
                                    <input
                                       type="password"
                                       className="form-control"
                                       placeholder="Enter your password"
                                       name="password"
                                       onChange={handleBlur}
                                    />
                                 </div>
                                 <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                    <div className="form-group">
                                       <div className="custom-control custom-checkbox ms-1">
                                          <input
                                             type="checkbox"
                                             className="custom-control-input"
                                             id="basic_checkbox_1"
                                          />
                                          <label
                                             className="custom-control-label"
                                             htmlFor="basic_checkbox_1"
                                          >
                                             Remember my preference
                                          </label>
                                       </div>
                                    </div>
                                    <div className="form-group">
                                       <Link to="/page-forgot-password">
                                          Forgot Password?
                                       </Link>
                                    </div>
                                 </div>
                                 <div className="text-center">
                                    <input
                                       type="submit"
                                       value="Sign Me In"
                                       className="btn btn-primary btn-block"
                                    />
                                 </div>
                              </form>
                              <div className="new-account mt-3">
                                 <p>
                                    Don't have an account?{" "}
                                    <Link className="text-primary" to="/page-register">
                                       Sign up
                                    </Link>
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
