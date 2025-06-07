import React, { useState } from "react";
import { Header } from "./Header";
import { auth } from "../utils/Firebase";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    };

    // Email validation
    const emailValidation = checkValidData(formData.email, formData.password);
    if (emailValidation === "Email ID is not valid") {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (emailValidation === "Password is not valid") {
      newErrors.password =
        "Password must be 8+ characters with uppercase, lowercase, and number";
    }

    // Sign up specific validations
    if (!isSignIn) {
      // Full name validation
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = "Full name must be at least 2 characters";
      }

      // Confirm password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    // Basic required field validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (!isSignIn) {
        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("User created successfully:", userCredential.user);
      } else {
        // Sign In
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("User signed in successfully:", userCredential.user);
      }
    } catch (error) {
      console.error("Authentication error:", error.code);

      switch (error.code) {
        case "auth/email-already-in-use":
          setErrors((prev) => ({
            ...prev,
            email: "Email is already registered",
          }));
          break;
        case "auth/user-not-found":
          setErrors((prev) => ({
            ...prev,
            email: "No account found with this email",
          }));
          break;
        case "auth/wrong-password":
          setErrors((prev) => ({ ...prev, password: "Incorrect password" }));
          break;
        case "auth/weak-password":
          setErrors((prev) => ({
            ...prev,
            password: "Password should be at least 6 characters",
          }));
          break;
        case "auth/invalid-email":
          setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
          break;
        case "auth/too-many-requests":
          setErrors((prev) => ({
            ...prev,
            email: "Too many failed attempts. Please try again later",
          }));
          break;
        case "auth/network-request-failed":
          setErrors((prev) => ({
            ...prev,
            email: "Network error. Please check your internet connection",
          }));
          break;
        default:
          setErrors((prev) => ({
            ...prev,
            email: "An error occurred. Please try again",
          }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );

      navigate("/browse");
    } catch (error) {
      console.error("Google Sign In Error:", error);
      setErrors((prev) => ({
        ...prev,
        email: error.message,
      }));
    }
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    });
    setFocusedField("");
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    });
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
          {/* Main Form Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Toggle Tabs */}
            <div className="flex bg-white/5 rounded-xl sm:rounded-2xl p-1 mb-6 sm:mb-8">
              <button
                onClick={() => !isSignIn && toggleMode()}
                className={`flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl transition-all duration-300 ${
                  isSignIn
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => isSignIn && toggleMode()}
                className={`flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl transition-all duration-300 ${
                  !isSignIn
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl font-light text-white mb-2 tracking-wide">
                {isSignIn ? "Welcome back" : "Join us today"}
              </h1>
              <p className="text-white/60 text-xs sm:text-xs">
                {isSignIn
                  ? "Sign in to continue watching"
                  : "Create your account to get started"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Full Name Field - Only for Sign Up */}
              {!isSignIn && (
                <div className="relative">
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField("")}
                    placeholder="Full name"
                    className={`w-full px-0 py-2.5 sm:py-3.5 bg-transparent border-0 border-b transition-all duration-300 text-sm sm:text-base font-light text-white placeholder-white/50 focus:outline-none ${
                      errors.fullName
                        ? "border-red-500/70 focus:border-red-400"
                        : "border-white/30 focus:border-white"
                    }`}
                    required
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                      errors.fullName
                        ? "bg-gradient-to-r from-red-500 to-red-400"
                        : "bg-gradient-to-r from-blue-400 to-purple-500"
                    } ${focusedField === "fullName" ? "w-full" : "w-0"}`}
                  ></div>
                  {errors.fullName && (
                    <p className="text-[11px] sm:text-xs text-red-400/90 mt-2 ml-0.5 flex items-center">
                      <svg
                        className="w-3 h-3 mr-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.fullName}
                    </p>
                  )}
                </div>
              )}

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Email address"
                  className={`w-full px-0 py-2.5 sm:py-3.5 bg-transparent border-0 border-b transition-all duration-300 text-sm sm:text-base font-light text-white placeholder-white/50 focus:outline-none ${
                    errors.email
                      ? "border-red-500/70 focus:border-red-400"
                      : "border-white/30 focus:border-white"
                  }`}
                  required
                />
                <div
                  className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                    errors.email
                      ? ""
                      : `bg-gradient-to-r from-blue-400 to-purple-500 ${
                          focusedField === "email" ? "w-full" : "w-0"
                        }`
                  }`}
                ></div>
                {errors.email && (
                  <p className="text-[11px] sm:text-xs text-red-400/90 mt-2 ml-0.5 flex items-center">
                    <svg
                      className="w-3 h-3 mr-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Password"
                  className={`w-full px-0 py-2.5 sm:py-3.5 bg-transparent border-0 border-b transition-all duration-300 text-sm sm:text-base font-light text-white placeholder-white/50 focus:outline-none ${
                    errors.password
                      ? "border-red-500/70 focus:border-red-400"
                      : "border-white/30 focus:border-white"
                  }`}
                  required
                />
                <div
                  className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                    errors.password
                      ? ""
                      : `bg-gradient-to-r from-blue-400 to-purple-500 ${
                          focusedField === "password" ? "w-full" : "w-0"
                        }`
                  }`}
                ></div>
                {errors.password && (
                  <p className="text-[11px] sm:text-xs text-red-400/90 mt-2 ml-0.5 flex items-center">
                    <svg
                      className="w-3 h-3 mr-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field - Only for Sign Up */}
              {!isSignIn && (
                <div className="relative">
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField("")}
                    placeholder="Confirm password"
                    className={`w-full px-0 py-2.5 sm:py-3.5 bg-transparent border-0 border-b transition-all duration-300 text-sm sm:text-base font-light text-white placeholder-white/50 focus:outline-none ${
                      errors.confirmPassword
                        ? "border-red-500/70 focus:border-red-400"
                        : "border-white/30 focus:border-white"
                    }`}
                    required
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                      errors.confirmPassword
                        ? "bg-gradient-to-r from-red-500 to-red-400"
                        : "bg-gradient-to-r from-blue-400 to-purple-500"
                    } ${focusedField === "confirmPassword" ? "w-full" : "w-0"}`}
                  ></div>
                  {errors.confirmPassword && (
                    <p className="text-[11px] sm:text-xs text-red-400/90 mt-2 ml-0.5 flex items-center">
                      <svg
                        className="w-3 h-3 mr-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 sm:mt-8 py-2.5 sm:py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group text-xs sm:text-sm"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>

                <span className="relative flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 sm:mr-3"></div>
                      {isSignIn ? "Signing in..." : "Creating account..."}
                    </>
                  ) : isSignIn ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </span>
              </button>
            </form>

            {/* Sign In Only Features */}
            {isSignIn && (
              <>
                <div className="flex items-center my-6 sm:my-8">
                  <div className="flex-1 h-px bg-white/20"></div>
                  <span className="px-4 text-white/50 text-xs sm:text-sm">
                    or
                  </span>
                  <div className="flex-1 h-px bg-white/20"></div>
                </div>

                <div>
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-2 sm:py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center group text-xs sm:text-sm"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="group-hover:text-white/90 transition-colors">
                      Continue with Google
                    </span>
                  </button>
                </div>
              </>
            )}

            {/* Terms for Sign Up */}
            {!isSignIn && (
              <div className="mt-6 sm:mt-8">
                <p className="text-white/50 text-[11px] sm:text-xs text-center leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <Link
                    to="/terms"
                    className="text-white/70 hover:text-white transition-colors underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-white/70 hover:text-white transition-colors underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            )}

            {/* Footer Links */}
            <div className="mt-6 sm:mt-8 text-center space-y-2 sm:space-y-3">
              {isSignIn && (
                <Link
                  to="/forgot-password"
                  className="block text-white/50 hover:text-white/70 text-[11px] sm:text-xs transition-colors"
                >
                  Forgot your password?
                </Link>
              )}
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-tr from-purple-500/10 to-blue-400/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
