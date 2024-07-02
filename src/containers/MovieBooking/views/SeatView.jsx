import * as propTypes from "../../../utils/propTypes";
import PropTypes from "prop-types";
import Seat from "./Seat";

const SeatView = ({ seatRows, onClickSeat, selectedSeatsMap }) =>
  (seatRows ?? []).length > 0 ? (
    <div className="mt-4 w-full max-w-3xl overflow-auto rounded-lg border border-gray-300 p-4 shadow-2xl">
      {seatRows.map((row, index) => (
        <div
          key={index}
          style={{
            width: seatRows.length * 61 + 100,
          }}
          className={`my-[2px] flex min-w-full justify-between rounded-[2px] px-[10px] ${
            index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
          }`}
        >
          <div className="mt-1 flex w-[100px] flex-col items-center justify-center font-bold text-gray-500">
            <div className="text-sm">Row {seatRows.length - index}</div>
            <div className="mt-2 text-xs font-normal">${row.pricePerSeat}/seat</div>
          </div>

          <div className="flex w-[100%] justify-center sm:w-[calc(100%-100px)]" key={row.id}>
            {row?.seats?.map((seat) => (
              <Seat
                key={seat.id}
                seat={seat}
                onClickSeat={onClickSeat}
                isSelected={!!selectedSeatsMap[seat.id]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : null;

SeatView.propTypes = {
  seatRows: propTypes.seatRowsPropTypes,
  selectedSeatsMap: PropTypes.objectOf(PropTypes.number).isRequired,
  onClickSeat: PropTypes.func.isRequired,
};

export default SeatView;
