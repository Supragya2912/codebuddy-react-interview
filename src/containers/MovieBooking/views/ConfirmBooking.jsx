import React from "react";
import PropTypes from "prop-types";

const ConfirmBooking = ({ handleConfirmBooking, selectedSeatsMap }) => {
  const price = React.useMemo(() => {
    return Object.values(selectedSeatsMap).reduce((total, seatPrice) => total + seatPrice, 0);
  }, [selectedSeatsMap]);

  return (
    <div className="flex w-full max-w-3xl items-center justify-center align-middle">
      <div className="mr-4 flex items-center justify-center rounded-lg border border-gray-700 bg-gray-100 p-4">
        <h1 className="text-black-600 text-xl font-extrabold">Total : $ {price}</h1>
      </div>
      <button
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        onClick={handleConfirmBooking}
      >
        Confirm Booking
      </button>
    </div>
  );
};

ConfirmBooking.propTypes = {
  handleConfirmBooking: PropTypes.func,
  selectedSeatsMap: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default ConfirmBooking;
