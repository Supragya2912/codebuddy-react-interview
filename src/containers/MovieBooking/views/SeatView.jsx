import { Icon } from "@iconify/react";
import * as propTypes from "../../../utils/propTypes";
import PropTypes from "prop-types";

const SeatView = ({ seatRows, onClickSeat, userSelectedSeatIds }) => (
  <div>
    {seatRows?.length > 0 ? (
      seatRows.map((row, index) => (
        <div key={index}>
          <div className="mt-1 font-bold text-gray-500">Row {seatRows.length - index}</div>
          <div className="flex justify-center" key={row.id}>
            {row?.seats?.map((seat) => (
              <div key={seat.id}>
                <button
                  onClick={() => !seat.isReserved && onClickSeat(seat.id)}
                  disabled={seat.isReserved}
                  className="flex flex-col items-center p-1"
                >
                  <Icon
                    icon="mdi:seat"
                    className={`mr-2 ${
                      seat.isReserved
                        ? "text-gray-500"
                        : userSelectedSeatIds?.includes(seat.id)
                          ? "text-green-500"
                          : ""
                    }`}
                    fontSize={45}
                  />
                  <div className="flex space-x-2">
                    <h6>{seat.seatNumber} </h6>
                    <h6>{seat.isReserved ? "R" : ""}</h6>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))
    ) : (
      <div className="text-center">Please select row number to view seats</div>
    )}
  </div>
);

SeatView.propTypes = {
  seatRows: propTypes.seatRowsPropTypes,
  userSelectedSeatIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickSeat: PropTypes.func.isRequired,
};

export default SeatView;
