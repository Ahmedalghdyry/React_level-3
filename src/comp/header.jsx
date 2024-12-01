import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/Datacontext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";


const Header = () => {

  const [user] = useAuthState(auth);
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="myheader">


      <header className="hide-when-mobile ali ">
        <h1 >
          <Link to="/"> c4a.dev </Link>
        </h1>

        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-regular fa-sun"
        ></i>

        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-sharp fa-regular fa-moon"
        ></i>

        <ul className="flex">
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                Sign-in
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                Sign-up
              </NavLink>
            </li>
          )}

          {user && (
            <li
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("تم الخروج");
                  })
                  .catch((error) => {
                    console.log("لم يتم الخروج");
                  });
              }}
              className="main-list"
            >
              <button className="main-link signout">Sign-out</button>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/about">
                About
              </NavLink>
              
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
                profile
              </NavLink>
              
            </li>
          )}
        </ul>
      </header>



    </div>
  );
};

export default Header;
