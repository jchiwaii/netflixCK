import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/Firebase";
import { addUser, removeUser } from "../utils/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [isMyListOpen, setIsMyListOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

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
      <div className="flex w-full items-center px-4 sm:px-8 lg:px-16 py-4 lg:py-5">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 lg:space-x-3 group cursor-pointer">
          <div
            className="w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: "#FF1313",
              boxShadow: "0 0 20px rgba(255, 19, 19, 0.3)",
            }}
          >
            <svg
              className="w-3 h-3 lg:w-3.5 lg:h-3.5"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span
            className="font-medium tracking-wide transition-all duration-300 group-hover:text-opacity-80"
            style={{
              color: "white",
              fontSize: "17px",
              letterSpacing: "0.5px",
            }}
          >
            myflix
          </span>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center flex-1 justify-center ml-16 mr-16">
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

        {/* Right Section - User & Mobile Menu */}
        <div className="flex items-center space-x-3 lg:space-x-5 ml-auto">
          {/* User Avatar */}
          <div className="relative group">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-7 h-7 lg:w-8 lg:h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-red-500 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              />
            ) : (
              <div
                className="w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs lg:text-sm font-medium cursor-pointer ring-2 ring-transparent group-hover:ring-red-500 transition-all duration-300"
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

          {/* Desktop Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="hidden lg:block relative px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg group"
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
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md transition-all duration-300 hover:bg-white hover:bg-opacity-10"
            style={{
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg
              className={`w-6 h-6 transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.95) 100%)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <nav className="px-4 sm:px-8 py-6 space-y-6">
          <a
            href="#"
            className="block transition-all duration-300 hover:text-red-400 hover:translate-x-2"
            style={{
              color: "#FF1313",
              fontSize: "18px",
              fontWeight: "500",
              textDecoration: "none",
              letterSpacing: "0.3px",
            }}
          >
            Home
          </a>

          <a
            href="#"
            className="block transition-all duration-300 hover:text-red-400 hover:translate-x-2"
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "400",
              textDecoration: "none",
              letterSpacing: "0.3px",
            }}
          >
            Movies
          </a>

          <a
            href="#"
            className="block transition-all duration-300 hover:text-red-400 hover:translate-x-2"
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "400",
              textDecoration: "none",
              letterSpacing: "0.3px",
            }}
          >
            Series
          </a>

          <button
            onClick={() => setIsMyListOpen(!isMyListOpen)}
            className="flex items-center space-x-2 w-full text-left transition-all duration-300 hover:text-red-400 hover:translate-x-2"
            style={{
              color: "white",
              fontSize: "18px",
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
              className={`w-4 h-4 transition-all duration-300 ${
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

          <div className="pt-4 border-t border-gray-700">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-3 rounded-md transition-all duration-300 hover:bg-red-600 hover:translate-x-2"
              style={{
                color: "white",
                fontSize: "16px",
                fontWeight: "400",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                cursor: "pointer",
                letterSpacing: "0.2px",
              }}
            >
              Sign Out
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
