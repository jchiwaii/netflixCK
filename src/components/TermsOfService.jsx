import React from "react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-2xl my-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-xl sm:text-2xl font-light text-white mb-2 tracking-wide">
                Terms of Service
              </h1>
              <p className="text-white/60 text-xs sm:text-sm">
                Last updated: June 7, 2025
              </p>
            </div>

            {/* Content */}
            <div className="space-y-6 text-white/70 text-sm sm:text-base font-light">
              <section className="space-y-3">
                <h2 className="text-white text-lg font-medium mb-2">
                  1. Streaming Service
                </h2>
                <p>
                  Our streaming service provides personalized access to movies
                  and TV shows ("Content") for your personal, non-commercial
                  use. The Content available may vary by geographic location and
                  can change without notice.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-white text-lg font-medium mb-2">
                  2. Membership
                </h2>
                <p>
                  Your membership continues until cancelled. To use the service,
                  you must have Internet access and provide a valid payment
                  method.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-white text-lg font-medium mb-2">
                  3. Privacy & Security
                </h2>
                <p>
                  We value your privacy and employ industry-standard measures to
                  protect your personal information. Your viewing preferences
                  help us provide a personalized experience.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-white text-lg font-medium mb-2">
                  4. Content Quality
                </h2>
                <p>
                  The playback quality of Content may vary depending on your
                  location, Internet connection, and the device used. Some
                  Content is available in HD and 4K Ultra HD.
                </p>
              </section>

              <section className="space-y-3 pb-4">
                <h2 className="text-white text-lg font-medium mb-2">
                  5. Changes & Updates
                </h2>
                <p>
                  We reserve the right to modify these terms at any time.
                  Continued use of our service after changes constitutes
                  acceptance of the new terms.
                </p>
              </section>

              {/* Back Button */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => navigate(-1)}
                  className="w-full py-2.5 sm:py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm"
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

export default TermsOfService;
