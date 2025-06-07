import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-2xl my-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-lg sm:text-xl font-light text-white mb-2 tracking-wide">
                Privacy Policy
              </h1>
              <p className="text-white/60 text-[10px] sm:text-[11px]">
                Last updated: June 7, 2025
              </p>
            </div>

            {/* Content */}
            <div className="space-y-6 text-white/70 text-[13px] sm:text-[15px] font-light">
              <section className="space-y-3">
                <h2 className="text-white text-base font-medium mb-2">
                  1. Information We Collect
                </h2>
                <p>
                  We collect information you provide directly, including account
                  details and viewing preferences. We also automatically collect
                  usage data to enhance your streaming experience.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-white text-base font-medium mb-2">
                  2. How We Use Your Information
                </h2>
                <p>
                  Your information helps us personalize content recommendations,
                  improve our service, and communicate with you about new
                  features and updates.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-white text-base font-medium mb-2">
                  3. Data Security
                </h2>
                <p>
                  We implement industry-standard security measures to protect
                  your personal information from unauthorized access,
                  disclosure, or misuse.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-white text-base font-medium mb-2">
                  4. Viewing History
                </h2>
                <p>
                  We maintain your viewing history to provide personalized
                  recommendations and resume playback features. You can manage
                  or delete this data from your account settings.
                </p>
              </section>

              <section className="space-y-3 pb-4">
                <h2 className="text-white text-base font-medium mb-2">
                  5. Third-Party Services
                </h2>
                <p>
                  We may use third-party services for analytics and content
                  delivery. These services are bound by confidentiality
                  agreements and our privacy standards.
                </p>
              </section>

              {/* Back Button */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => navigate(-1)}
                  className="w-full py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-[11px] sm:text-[13px]"
                >
                  I Understand
                </button>
              </div>
            </div>
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

export default PrivacyPolicy;
