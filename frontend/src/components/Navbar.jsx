import React, { useContext, useState } from 'react'
import { useThemeStore } from '../Context/useThemeStore';
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { axiosInstance } from '../Context/axios.js';

const Navbar = ({ setShowLogin }) => {
  const [Menu, setMenu] = useState("home")
  const { theme, setTheme } = useThemeStore();
  const { cartItems, getTotalCartAmount } = useContext(StoreContext);
  const { LOGGEDIN, setLOGGEDIN, url } = useContext(StoreContext);
  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const handleLogout = async () => {
    const response = await axiosInstance.post('/user/logout');
    console.log(response.data);
    if (response.data.success) {
      setLOGGEDIN(false);
    }
  }

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              Theme
              <svg
                width="12px"
                height="12px"
                className="inline-block h-2 w-2 fill-current opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048">
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-50 w-52 p-2 shadow-2xl">
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Default"
                  value="light"
                  checked={theme === "light"}
                  onChange={() => setTheme("light")}
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Retro"
                  value="retro"
                  checked={theme === "retro"}
                  onChange={() => setTheme("retro")}
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Cyberpunk"
                  value="cyberpunk"
                  checked={theme === "cyberpunk"}
                  onChange={() => setTheme("cyberpunk")}
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Valentine"
                  value="valentine"
                  checked={theme === "valentine"}
                  onChange={() => setTheme("valentine")}
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Aqua"
                  value="aqua"
                  checked={theme === "aqua"}
                  onChange={() => setTheme("aqua")}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link className="btn btn-ghost text-xl" to="/">Dan's DEN</Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-50 mt-3 w-52 shadow">
              <div className="card-body border rounded-2xl">
                <span className="text-lg font-bold">{getCartCount()} Items</span>
                <span className="text-info">Subtotal: ${getTotalCartAmount()}</span>
                <div className="card-actions">
                  <Link to="/cart" className="btn btn-primary btn-block">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {!LOGGEDIN
            ?
            <button className="btn btn-ghost" onClick={() => setShowLogin(true)}>Sign In</button>
            :
            <div className="dropdown dropdown-end pl-1.5">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm border dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                <li><Link to="/">Home</Link></li>
                <li><Link onClick={() => scrollToSection("menu")}>Menu</Link></li>
                <li><Link to="/contact">Contact us</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link onClick={handleLogout}>Logout</Link></li>
              </ul>
            </div>}



        </div>
      </div>
    </>
  )
}

export default Navbar