import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import * as propTypes from "../../../utils/propTypes";

const Seat = ({ seat, onClickSeat, isSelected }) => (
  <button
    key={seat.id}
    onClick={() =>
      !seat.isReserved &&
      onClickSeat({
        id: seat.id,
        pricePerSeat: seat.pricePerSeat,
      })
    }
    disabled={seat.isReserved}
    className="flex flex-col items-center p-1"
  >
    <Icon
      icon="mdi:seat"
      className={`mr-2 ${
        seat.isReserved ? "text-gray-500" : isSelected ? "text-emerald-500" : "text-gray-200"
      }`}
      fontSize={45}
    />
    <div className="flex space-x-2">
      <p className="text-sm">{seat.seatNumber} </p>
      <h6 className="text-sm">{seat.isReserved ? "R" : ""}</h6>
    </div>
  </button>
);

Seat.propTypes = {
  seat: propTypes.seatPropType,
  isSelected: PropTypes.bool.isRequired,
  onClickSeat: PropTypes.func.isRequired,
};

export default Seat;
