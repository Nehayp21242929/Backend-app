import React, { useState, useEffect } from "react";
import { FaBell, FaBars, FaUpload, FaCompass } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import DarkMode from "./DarkMode";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Trending", path: "/trending" },
    { name: "Videos", path: "/VideoPage" },
    { name: "Photos", path: "/PhotoPage" },
    { name: "Explore", path: "/explore", icon: <FaCompass className="text-xs" /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
      backdrop-blur-xl
      ${isScrolled
          ? "bg-white/85 dark:bg-slate-900/85 shadow-md"
          : "bg-white/70 dark:bg-slate-900/70"
        }
      border-b border-slate-200/60 dark:border-slate-700/60`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500
        ${isScrolled ? "py-2" : "py-4"}`}
      >
        {/* ================= LEFT ================= */}
        <div className="flex items-center space-x-10">

          {/* Brand */}
          <h2
            onClick={() => navigate("/")}
            style={{ fontSize: "24px", fontWeight: "bold", fontFamily: "'Montserrat', sans-serif" , cursor: "pointer", background: "linear-gradient(90deg, #3895D3, #58CCED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", }}
          >
            SkillStage
          
          </h2>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2 relative">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium 
                  transition-all duration-300 flex items-center gap-2
                  ${isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-700 dark:text-slate-300 hover:text-blue-600"
                    }`}
                >
                  {item.icon && item.icon}
                  {item.name}

                  {/* Active underline */}
                  <span
                    className={`absolute left-3 right-3 -bottom-1 h-[2px] rounded-full 
                    bg-blue-600 transition-all duration-300
                    ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center space-x-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="hidden sm:block px-4 py-2 rounded-full 
            bg-slate-100 dark:bg-slate-800 
            border border-slate-200 dark:border-slate-700
            text-sm text-slate-700 dark:text-slate-200
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-all duration-300 w-48 focus:w-64"
          />

          {/* Upload */}
          {user && (
            <button
              onClick={() => navigate("/uploadForm")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full 
              bg-blue-600 hover:bg-blue-700
              text-white text-sm font-medium
              shadow-sm hover:shadow-md
              hover:-translate-y-0.5
              transition-all duration-300"
            >
              <FaUpload className="text-xs" />
              Upload
            </button>
          )}

          {/* Notifications */}
          {user && (
            <div className="relative cursor-pointer">
              <FaBell className="text-lg text-slate-700 dark:text-slate-300" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5">
                3
              </span>
            </div>
          )}

          <DarkMode />

          {/* Profile */}
          {user ? (
            <div className="relative">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-9 h-9 rounded-full cursor-pointer 
                border-2 border-transparent hover:border-blue-500 
                transition-all duration-300"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 rounded-xl 
                backdrop-blur-xl bg-white/95 dark:bg-slate-800/95 
                border border-slate-200 dark:border-slate-700 
                shadow-xl py-2">

                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-5 py-2 text-sm 
                    text-slate-700 dark:text-slate-300 
                    hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => navigate("/settings")}
                    className="w-full text-left px-5 py-2 text-sm 
                    text-slate-700 dark:text-slate-300 
                    hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    Settings
                  </button>

                  <div className="border-t border-slate-200 dark:border-slate-700 my-2" />

                  <button
                    onClick={logout}
                    className="w-full text-left px-5 py-2 text-sm 
                    text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full 
              bg-slate-900 text-white 
              dark:bg-white dark:text-black 
              text-sm font-medium
              hover:shadow-md hover:-translate-y-0.5
              transition-all duration-300"
            >
              Login
            </button>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-xl text-slate-700 dark:text-slate-300"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden backdrop-blur-xl bg-white/95 dark:bg-slate-900/95
        border-t border-slate-200 dark:border-slate-700
        px-6 py-6 space-y-4 shadow-lg">

          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-slate-700 dark:text-slate-300 
              py-2 text-base hover:text-blue-600 transition"
            >
              {item.name}
            </button>
          ))}

          {!user && (
            <button
              onClick={() => navigate("/login")}
              className="w-full mt-4 px-4 py-2 rounded-full 
              bg-blue-600 hover:bg-blue-700
              text-white font-medium"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
