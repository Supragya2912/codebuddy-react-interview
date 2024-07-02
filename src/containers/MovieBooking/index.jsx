import SeatView from "../../containers/MovieBooking/views/SeatView";
import SeatInput from "../../containers/MovieBooking/views/SeatInput";
import ErrorContainer from "../../containers/MovieBooking/views/ErrorContainer";
import useMovieBooking from "./hooks/useMovieBooking";

import ConfirmBooking from "./views/ConfirmBooking";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const MovieBooking = () => {
  const navigate = useNavigate();

  const onConfirmBooking = useCallback(() => {
    navigate("/booking-success");
  }, [navigate]);

  const { state, handleSeatClick, onSubmitNumberOfRows, setErrorEmpty, handleConfirmBooking } =
    useMovieBooking({ onConfirmBooking });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="sticky top-0 w-full max-w-3xl bg-gray-50 py-2">
        <h1 className="text-center text-xl font-bold">Book your seats</h1>
        <ErrorContainer error={state.error} onClose={setErrorEmpty} />
        <div
          className={`mt-4 flex w-full flex-col ${
            state.seatData.length > 0 ? "justify-between" : "justify-center"
          } md:flex-row`}
        >
          <SeatInput
            onSubmitNumberOfRows={onSubmitNumberOfRows}
            seatDataExists={state.seatData.length === 0}
          />
          {state.seatData.length > 0 && (
            <ConfirmBooking
              handleConfirmBooking={handleConfirmBooking}
              selectedSeatsMap={state.selectedSeatsMap}
            />
          )}
        </div>
      </div>
      <SeatView
        seatRows={state.seatData}
        onClickSeat={handleSeatClick}
        selectedSeatsMap={state.selectedSeatsMap}
      />
    </div>
  );
};

export default MovieBooking;
