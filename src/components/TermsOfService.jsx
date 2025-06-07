import React from "react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-4 sm:px-5 py-20 sm:py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="fixed inset-0 flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-2xl my-4 sm:my-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-base sm:text-lg font-light text-white mb-2 tracking-wide">
                Terms of Service
              </h1>
              <p className="text-white/60 text-[10px] sm:text-[11px]">
                Last updated: June 7, 2025
              </p>
            </div>

            {/* Content */}
            <div className="space-y-4 sm:space-y-6 text-white/70 text-[12px] sm:text-[13px] font-light">
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
            </div>

            {/* Back Button */}
            <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-white/10">
              <button
                onClick={() => navigate(-1)}
                className="w-full py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-[11px] sm:text-xs"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
