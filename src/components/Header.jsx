import React, { useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [isMyListOpen, setIsMyListOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <header
      className="fixed top-0 z-50 w-full backdrop-blur-sm transition-all duration-300"
      style={{
        fontFamily: '"Outfit", sans-serif',
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex w-full items-center px-16 py-5">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: "#FF1313",
              boxShadow: "0 0 20px rgba(255, 19, 19, 0.3)",
            }}
          >
            <svg className="w-3.5 h-3.5" fill="white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span
            className="font-medium tracking-wide transition-all duration-300 group-hover:text-opacity-80"
            style={{
              color: "white",
              fontSize: "19px",
              letterSpacing: "0.5px",
            }}
          >
            myflix
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center flex-1 justify-center ml-16 mr-16">
          <div className="flex items-center space-x-12">
            <a
              href="#"
              className="relative group transition-all duration-300 hover:scale-105"
              style={{
                color: "#FF1313",
                fontSize: "16px",
                fontWeight: "500",
                textDecoration: "none",
                letterSpacing: "0.3px",
              }}
            >
              Home
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-red-400 rounded-full"></div>
            </a>

            <a
              href="#"
              className="relative group transition-all duration-300 hover:scale-105 hover:text-red-400"
              style={{
                color: "white",
                fontSize: "16px",
                fontWeight: "400",
                textDecoration: "none",
                letterSpacing: "0.3px",
              }}
            >
              Movies
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-300 group-hover:w-full"></div>
            </a>

            <a
              href="#"
              className="relative group transition-all duration-300 hover:scale-105 hover:text-red-400"
              style={{
                color: "white",
                fontSize: "16px",
                fontWeight: "400",
                textDecoration: "none",
                letterSpacing: "0.3px",
              }}
            >
              Series
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-300 group-hover:w-full"></div>
            </a>

            <div className="relative">
              <button
                onClick={() => setIsMyListOpen(!isMyListOpen)}
                className="flex items-center space-x-1 group transition-all duration-300 hover:scale-105 hover:text-red-400"
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "400",
                  textDecoration: "none",
                  letterSpacing: "0.3px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span>My List</span>
                <svg
                  className={`w-3.5 h-3.5 transition-all duration-300 ${
                    isMyListOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-300 group-hover:w-full"></div>
            </div>
          </div>
        </nav>

        {/* Right Section - User */}
        <div className="flex items-center space-x-5">
          {/* User Avatar */}
          <div className="relative group">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-red-500 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              />
            ) : (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer ring-2 ring-transparent group-hover:ring-red-500 transition-all duration-300"
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                {user?.displayName?.[0] || user?.email?.[0] || "U"}
              </div>
            )}
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="relative px-4 py-2 rounded-md transition-all duration-300 hover:shadow-lg group overflow-hidden"
            style={{
              color: "white",
              fontSize: "14px",
              fontWeight: "400",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              cursor: "pointer",
              letterSpacing: "0.2px",
            }}
          >
            <span className="relative z-10">Sign Out</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
