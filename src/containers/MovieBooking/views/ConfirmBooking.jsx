import React from "react";
import PropTypes from "prop-types";

const ConfirmBooking = ({ handleConfirmBooking, selectedSeatsMap }) => {
  console.log("selectedSeatsMap", selectedSeatsMap);
  const price = React.useMemo(() => {
    return Object.values(selectedSeatsMap).reduce((total, seatPrice) => total + seatPrice, 0);
  }, [selectedSeatsMap]);

  return (
    <div className="flex w-full max-w-3xl items-center justify-center align-middle">
      <div className="text-2xl font-bold text-gray-700"> ${price}</div>
      <button
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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
