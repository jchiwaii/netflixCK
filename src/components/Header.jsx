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
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          NetflixCK
        </h1>

        {/* User Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Avatar */}
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white/20"
            />
          ) : (
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
              {user?.displayName?.[0] || user?.email?.[0] || "U"}
            </div>
          )}

          {/* Name */}
          <span className="text-white text-sm sm:text-base font-medium hidden sm:block">
            {user?.displayName || "User"}
          </span>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-lg transition-all duration-300 text-xs sm:text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
