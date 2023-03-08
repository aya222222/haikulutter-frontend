import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AuthBtnCard.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutProfile } from "../../features/profile/profileSlice";
import { logOut } from "../../features/auth/authSlice";

import decode from "jwt-decode";
const AuthBtnCard = () => {
  const loggedInUser = useSelector((state) => state.auth?.authData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const login = () => {
    navigate("/auth");
  };

  const logout = () => {
    dispatch(logOut());
    navigate("/");
    dispatch(logoutProfile());
    console.log("logout");
  };

  useEffect(() => {
    if (loggedInUser) {
      //JWT....
      const token = loggedInUser?.token;
      if (token) {
        const decodedToken = decode(token);

        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
    }
  }, [location]);

  return (
    <>
      <div className="md:flex hidden justify-end gap-4">
        {loggedInUser && (
          <div className="ml-[150px]">
            {/* <h6>{user?.result?.name}</h6> */}
            <img
              className="w-12 rounded-full"
              src={loggedInUser?.result?.picture}
            />
          </div>
        )}

        {loggedInUser ? (
          <button
            className="rounded-3xl bg-border-color
     text-bg-color px-2.5 py-1 
     border-none outline-none  text-xl
     transition-all ease-out duration-200
     cursor-pointer 
     hover:text-white
     hover:outline-2  hover:outline-solid hover:outline-slate-200
     hover:bg-bg-color
     "
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="rounded-3xl bg-border-color
     text-bg-color px-2.5 py-1 
     border-none outline-none  text-xl
     transition-all ease-out duration-200
     cursor-pointer 
     hover:text-white
     hover:outline-2  hover:outline-solid hover:outline-slate-200
     hover:bg-bg-color
     "
            onClick={login}
          >
            Sign in
          </button>
        )}
      </div>
    </>
  );
};

export default AuthBtnCard;
