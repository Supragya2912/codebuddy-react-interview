import { Icon } from "@iconify/react";
// import { useCallback, useEffect, useState } from "react";
import MovieBooking from "../containers/MovieBooking";

const Home = () => {
  return (
    <div className="rounded-lg bg-gray-50 p-0 pt-7 text-gray-900 shadow-lg md:p-7">
      <h1 className="align-center mb-4 flex justify-center text-4xl font-bold text-emerald-800">
        <Icon icon="mdi:movie" className="mr-2" color="text-emerald-800" />
        Movie Booking
      </h1>
      <MovieBooking />
    </div>
  );
};

export default Home;
