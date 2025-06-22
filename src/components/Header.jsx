import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [activeSection, setActiveSection] = useState("home");

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

    if (section === "trending") {
      // Smooth scroll to trending section
      const trendingSection = document.getElementById("trending-section");
      if (trendingSection) {
        trendingSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (section === "home") {
      // Scroll to top for home
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Listen for scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const trendingSection = document.getElementById("trending-section");
      if (trendingSection) {
        const rect = trendingSection.getBoundingClientRect();
        const isInView = rect.top <= 100 && rect.bottom >= 100;

        if (isInView && activeSection !== "trending") {
          setActiveSection("trending");
        } else if (
          !isInView &&
          window.scrollY < 500 &&
          activeSection !== "home"
        ) {
          setActiveSection("home");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <div className="fixed top-0 w-full px-8 py-4 z-50">
      {/* Sticky glassy navigation */}
      <div className="flex justify-between items-center bg-black/15 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 shadow-2xl transition-all duration-300 hover:bg-black/20">
        {/* Logo */}
        <img
          className="w-32 cursor-pointer transition-transform duration-300 hover:scale-105"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix Logo"
          onClick={() => handleNavigation("home")}
        />

        {user && (
          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => handleNavigation("home")}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeSection === "home"
                    ? "bg-white/20 text-white border border-white/30 shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("trending")}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeSection === "trending"
                    ? "bg-gradient-to-r from-red-500/80 to-pink-500/80 text-white border border-red-400/50 shadow-lg shadow-red-500/20"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Trending
              </button>
              <button
                onClick={() => handleNavigation("movies")}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeSection === "movies"
                    ? "bg-white/20 text-white border border-white/30 shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => handleNavigation("series")}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeSection === "series"
                    ? "bg-white/20 text-white border border-white/30 shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                TV Shows
              </button>
            </nav>

            {/* User Section */}
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
        )}
      </div>
    </div>
  );
};

export default Header;
