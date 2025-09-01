import React, { useContext, useState } from 'react'
import { useThemeStore } from '../Context/useThemeStore.js';
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
    const { theme, setTheme } = useThemeStore();



    return (
        <>
            <div className="navbar border-b border-b-base-200 bg-base-100 shadow-sm">
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
                  aria-label="Luxury"
                  value="luxury"
                  checked={theme === "luxury"}
                  onChange={() => setTheme("luxury")}
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Caramellatte"
                  value="caramellatte"
                  checked={theme === "caramellatte"}
                  onChange={() => setTheme("caramellatte")}
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

                    <button className="bg-base-300 btn btn-ghost">ADMIN</button>

                </div>
            </div>
        </>
    )
}

export default Navbar