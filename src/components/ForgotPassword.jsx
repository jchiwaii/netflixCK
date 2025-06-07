import React, { useState } from "react";
import { auth } from "../utils/Firebase";
import {
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Check if user exists first
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.length === 0) {
        setError("No account found with this email address");
        return;
      }

      // Send reset email
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin, // Redirect back to your app
        handleCodeInApp: false, // Use default Firebase UI
      });

      setSuccess(true);
    } catch (error) {
      console.error("Reset password error:", error);

      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        case "auth/user-not-found":
          setError("No account found with this email");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your connection");
          break;
        default:
          setError("Failed to send reset email. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl font-light text-white mb-2 tracking-wide">
                Reset your password
              </h1>
              <p className="text-white/60 text-xs sm:text-xs">
                Enter your email address and we'll send you a link to reset your
                password
              </p>
            </div>

            {success ? (
              <div className="text-center">
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
                  <p className="text-green-400 text-sm">
                    Reset link sent! Check your email for instructions
                  </p>
                </div>
                <button
                  onClick={() => navigate("/")}
                  className="text-white/50 hover:text-white/70 text-xs transition-colors"
                >
                  Back to sign in
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full px-0 py-2.5 sm:py-3.5 bg-transparent border-0 border-b border-white/30 transition-all duration-300 text-sm sm:text-base font-light text-white placeholder-white/50 focus:outline-none focus:border-white"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 w-0 focus-within:w-full" />
                </div>

                {error && (
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
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 sm:mt-8 py-2.5 sm:py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group text-xs sm:text-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <span className="relative flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 sm:mr-3" />
                        Sending reset link...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </span>
                </button>

                <div className="text-center mt-6">
                  <button
                    onClick={() => navigate("/")}
                    className="text-white/50 hover:text-white/70 text-[11px] sm:text-xs transition-colors"
                  >
                    Back to sign in
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
          <div
            className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-tr from-purple-500/10 to-blue-400/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
