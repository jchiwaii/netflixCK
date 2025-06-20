import React from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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
      className="fixed top-0 z-50 w-full bg-black"
      style={{ fontFamily: '"Outfit", sans-serif' }}
    >
      <div className="flex w-full items-center px-16 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#FF1313" }}
          >
            <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span
            className="font-normal tracking-normal"
            style={{ color: "white", fontSize: "18px" }}
          >
            myflix
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center flex-1 justify-evenly ml-12 mr-12">
          <a
            href="#"
            className="transition-opacity duration-200 hover:opacity-70"
            style={{
              color: "#FF1313",
              fontSize: "16px",
              fontWeight: "400",
              textDecoration: "none",
            }}
          >
            Home
          </a>
          <a
            href="#"
            className="transition-opacity duration-200 hover:opacity-70"
            style={{
              color: "white",
              fontSize: "16px",
              fontWeight: "300",
              textDecoration: "none",
            }}
          >
            Movies
          </a>
          <a
            href="#"
            className="transition-opacity duration-200 hover:opacity-70"
            style={{
              color: "white",
              fontSize: "16px",
              fontWeight: "300",
              textDecoration: "none",
            }}
          >
            Series
          </a>
          <div className="flex items-center space-x-0.5">
            <a
              href="#"
              className="transition-opacity duration-200 hover:opacity-70"
              style={{
                color: "white",
                fontSize: "16px",
                fontWeight: "300",
                textDecoration: "none",
              }}
            >
              My List
            </a>
            <svg
              className="w-3 h-3 transition-transform duration-200"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </nav>

        {/* Right Section - User */}
        <div className="flex items-center space-x-4">
          {/* User Avatar */}
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-normal"
              style={{
                backgroundColor: "#333",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {user?.displayName?.[0] || user?.email?.[0] || "U"}
            </div>
          )}

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="transition-opacity duration-200 hover:opacity-70"
            style={{
              color: "white",
              fontSize: "14px",
              fontWeight: "300",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
