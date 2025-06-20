import React from "react";
import Header from "./Header";
import NowPlayingMovies from "./NowPlayingMovies";

const Browse = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-20">
        <NowPlayingMovies />
        {/* Other movie sections can be added here */}
      </div>
    </div>
  );
};

export default Browse;
