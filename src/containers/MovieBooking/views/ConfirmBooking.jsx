import React from "react";
import PropTypes from "prop-types";
import { memo } from "react";

const ConfirmBooking = memo(function ConfirmBooking({ handleConfirmBooking, selectedSeatsMap }) {
  const price = React.useMemo(() => {
    return Object.values(selectedSeatsMap).reduce((total, seatPrice) => total + seatPrice, 0);
  }, [selectedSeatsMap]);

  return (
    <div className="flex w-full justify-between px-2 align-middle md:justify-end md:px-0">
      <div className="mr-4 flex w-full justify-start rounded border-2 border-gray-300 p-3 ">
        <p className="text-black-600 text-l font-extrabold">Total : $ {price}</p>
      </div>
      <button
        className="min-w-[170px] rounded bg-emerald-500 px-4 py-3 text-white hover:bg-emerald-600 disabled:bg-gray-400"
        disabled={Object.keys(selectedSeatsMap).length === 0}
        onClick={handleConfirmBooking}
      >
        Confirm Booking
      </button>
    </div>
  );
});

ConfirmBooking.propTypes = {
  handleConfirmBooking: PropTypes.func,
  selectedSeatsMap: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default ConfirmBooking;
