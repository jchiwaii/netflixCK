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
    <header className="fixed top-0 z-50 w-full">
      {/* Backdrop blur with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent backdrop-blur-xl border-b border-white/5"></div>

      <div className="relative flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5">
        {/* Logo with neon effect */}
        <div className="flex items-center">
          <div className="relative">
            <h1 className="text-xl sm:text-2xl font-light tracking-wider bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
              NetflixCK
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-lg blur-sm -z-10"></div>
          </div>
        </div>

        {/* User section with glassmorphism */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          {/* User info container */}
          <div className="flex items-center space-x-3 px-3 sm:px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300">
            {/* Avatar with glow effect */}
            <div className="relative">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white/20 shadow-lg"
                />
              ) : (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-lg">
                  {user?.displayName?.[0] || user?.email?.[0] || "U"}
                </div>
              )}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-400/30 to-purple-600/30 rounded-full blur opacity-75"></div>
            </div>

            {/* Name - minimal typography */}
            <div className="hidden sm:block">
              <p className="text-white/90 text-sm font-light tracking-wide">
                {user?.displayName || "User"}
              </p>
            </div>
          </div>

          {/* Minimal sign out button */}
          <button
            onClick={handleSignOut}
            className="group relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 text-white/80 hover:text-white transition-all duration-300 text-xs sm:text-sm font-light tracking-wide overflow-hidden"
          >
            {/* Button background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Icon */}
            <div className="relative flex items-center space-x-2">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <span className="hidden sm:inline">Exit</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
