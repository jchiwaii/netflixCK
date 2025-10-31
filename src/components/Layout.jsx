import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { addUser, removeUser } from "../utils/UserSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        // Only navigate if user is on login page or root
        if (
          location.pathname === "/" ||
          location.pathname === "/forgot-password"
        ) {
          navigate("/browse", { replace: true });
        }
      } else {
        dispatch(removeUser());
        // Only navigate to login if not already on a public page
        const publicPaths = ["/", "/forgot-password", "/terms", "/privacy"];
        if (!publicPaths.includes(location.pathname)) {
          navigate("/", { replace: true });
        }
      }
      // Auth state is now determined
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Show loading screen while Firebase auth initializes
  if (isAuthLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 rounded-full border-2 border-red-500/20"></div>

          {/* Spinning ring */}
          <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-t-red-500 animate-spin"></div>

          {/* Inner glow */}
          <div className="absolute inset-3 w-14 h-14 rounded-full bg-red-500/10 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default Layout;
