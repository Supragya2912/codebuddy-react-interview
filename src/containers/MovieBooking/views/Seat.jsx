import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import { memo } from "react";

const Seat = memo(
  function Seat({ seatId, pricePerSeat, isReserved, seatNumber, onClickSeat, isSelected }) {
    return (
      <button
        key={seatId}
        onClick={() =>
          !isReserved &&
          onClickSeat({
            id: seatId,
            pricePerSeat: pricePerSeat,
          })
        }
        disabled={isReserved}
        className={`flex ${isReserved ? "cursor-not-allowed" : ""} flex-col items-center p-1`}
      >
        <Icon
          icon="mdi:seat"
          className={`mr-2 ${
            isReserved ? "text-gray-500" : isSelected ? "text-emerald-500" : "text-gray-200"
          }`}
          fontSize={45}
        />
        <div className="flex space-x-2">
          <p className="text-sm">{seatNumber} </p>
          <h6 className="text-sm">{isReserved ? "R" : ""}</h6>
        </div>
      </button>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected && prev.seatId === next.seatId,
);

Seat.propTypes = {
  seatId: PropTypes.string.isRequired,
  pricePerSeat: PropTypes.number.isRequired,
  isReserved: PropTypes.bool.isRequired,
  seatNumber: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickSeat: PropTypes.func.isRequired,
};

export default Seat;
