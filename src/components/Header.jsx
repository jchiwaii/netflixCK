import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
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

  // Handle navigation to sections
  const handleNavigation = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation

    if (section === "trending") {
      const trendingSection = document.getElementById("trending-section");
      if (trendingSection) {
        trendingSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (section === "top-rated") {
      const topRatedSection = document.getElementById("top-rated-section");
      if (topRatedSection) {
        topRatedSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Listen for scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const trendingSection = document.getElementById("trending-section");
      const topRatedSection = document.getElementById("top-rated-section");

      if (
        trendingSection &&
        trendingSection.getBoundingClientRect().top <= 100 &&
        trendingSection.getBoundingClientRect().bottom >= 100
      ) {
        if (activeSection !== "trending") {
          setActiveSection("trending");
        }
      } else if (
        topRatedSection &&
        topRatedSection.getBoundingClientRect().top <= 100 &&
        topRatedSection.getBoundingClientRect().bottom >= 100
      ) {
        if (activeSection !== "top-rated") {
          setActiveSection("top-rated");
        }
      } else if (window.scrollY < 500 && activeSection !== "home") {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <div className="fixed top-0 w-full px-4 sm:px-8 py-3 sm:py-4 z-50">
      {/* Main Navigation Bar */}
      <div className="flex justify-between items-center bg-black/15 backdrop-blur-xl border border-white/10 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 shadow-2xl transition-all duration-300 hover:bg-black/20">
        {/* Logo */}
        <img
          className="w-24 sm:w-32 cursor-pointer transition-transform duration-300 hover:scale-105"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix Logo"
          onClick={() => handleNavigation("home")}
        />

        {user && (
          <>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Navigation Links */}
              <nav className="flex items-center space-x-1">
                <button
                  onClick={() => handleNavigation("home")}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                    activeSection === "home"
                      ? "bg-white/20 text-white border border-white/30 shadow-lg hover:bg-white/30"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation("trending")}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                    activeSection === "trending"
                      ? "bg-gradient-to-r from-red-500/80 to-pink-500/80 text-white border border-red-400/50 shadow-lg shadow-red-500/20 hover:brightness-110"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Trending
                </button>
                <button
                  onClick={() => handleNavigation("top-rated")}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                    activeSection === "top-rated"
                      ? "bg-gradient-to-r from-blue-500/80 to-cyan-500/80 text-white border border-blue-400/50 shadow-lg shadow-blue-500/20 hover:brightness-110"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Top Rated
                </button>
                <button
                  onClick={() => handleNavigation("series")}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                    activeSection === "series"
                      ? "bg-white/20 text-white border border-white/30 shadow-lg hover:bg-white/30"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  TV Shows
                </button>
              </nav>

              {/* Desktop User Section */}
              <div className="flex items-center space-x-3">
                <img
                  className="w-8 h-8 rounded-full border-2 border-white/20 transition-transform duration-300 hover:scale-110"
                  alt="User Avatar"
                  src={
                    user?.photoURL ||
                    "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
                  }
                />
                <button
                  onClick={handleSignOut}
                  className="font-medium text-white hover:text-red-400 transition-colors duration-300 text-sm"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* Mobile User Avatar */}
              <img
                className="w-8 h-8 rounded-full border-2 border-white/20"
                alt="User Avatar"
                src={
                  user?.photoURL ||
                  "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
                }
              />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <HiX className="w-6 h-6 text-white" />
                ) : (
                  <HiMenu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {user && isMobileMenuOpen && (
        <div className="lg:hidden mobile-menu-container mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slideDown">
          {/* Mobile Navigation Links */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => handleNavigation("home")}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-base font-medium ${
                activeSection === "home"
                  ? "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("trending")}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-base font-medium ${
                activeSection === "trending"
                  ? "bg-gradient-to-r from-red-500/80 to-pink-500/80 text-white border border-red-400/50 hover:brightness-110"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => handleNavigation("top-rated")}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-base font-medium ${
                activeSection === "top-rated"
                  ? "bg-gradient-to-r from-blue-500/80 to-cyan-500/80 text-white border border-blue-400/50 hover:brightness-110"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Top Rated
            </button>
            <button
              onClick={() => handleNavigation("movies")}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-base font-medium ${
                activeSection === "movies"
                  ? "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => handleNavigation("series")}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-base font-medium ${
                activeSection === "series"
                  ? "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              TV Shows
            </button>
          </nav>

          {/* Mobile User Section */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center space-x-3 mb-3">
              <img
                className="w-10 h-10 rounded-full border-2 border-white/20"
                alt="User Avatar"
                src={
                  user?.photoURL ||
                  "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
                }
              />
              <div>
                <p className="text-white text-sm font-medium">
                  {user?.displayName || "User"}
                </p>
                <p className="text-white/60 text-xs">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 bg-red-600/80 hover:bg-red-700/80 text-white rounded-xl transition-colors duration-300 text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
