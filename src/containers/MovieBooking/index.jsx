import { useCallback, useState } from "react";
import SeatView from "../../containers/MovieBooking/views/SeatView";
import SeatInput from "../../containers/MovieBooking/views/SeatInput";
import ErrorContainer from "../../containers/MovieBooking/views/ErrorContainer";
import { fetchSeatsByCount, confirmBooking } from "../../utils/api";
import { addSeatPrice } from "../../utils/helpers";
import ConfirmBooking from "./views/ConfirmBooking";
import { useNavigate } from "react-router-dom";

const MovieBooking = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    seatData: [],
    error: "",
    selectedSeatsMap: {},
  });

  const handleConfirmBooking = useCallback(async () => {
    const selectedSeatIds = Object.keys(state.selectedSeatsMap);

    await confirmBooking(selectedSeatIds)
      .then((data) => {
        console.log("Booking confirmed", data);
        navigate("/booking-success");
      })
      .catch((e) => {
        console.error(e);
        setState((prevState) => ({
          ...prevState,
          error: "Sorry, we encountered an error and your booking was not done",
        }));
      });
  }, [state.selectedSeatsMap]);

  const handleSeatClick = useCallback(({ id, pricePerSeat }) => {
    setState((prevState) => {
      let newSeatsMap = {};
      let error = "";

      if (prevState.selectedSeatsMap[id]) {
        // If seat already exists, deselect it
        newSeatsMap = Object.fromEntries(
          Object.entries(prevState.selectedSeatsMap).filter(([key]) => key !== id),
        );
      } else {
        if (Object.keys(prevState.selectedSeatsMap).length === 5) {
          error = "You can select only 5 seats";
          newSeatsMap = prevState.selectedSeatsMap;
        } else {
          newSeatsMap = { ...prevState.selectedSeatsMap, [id]: pricePerSeat };
        }
      }

      return {
        ...prevState,
        selectedSeatsMap: newSeatsMap,
        error,
      };
    });
  }, []);

  const onSubmitNumberOfRows = useCallback(async (rows) => {
    if (rows < 3 || rows > 10) {
      setState((prevState) => ({
        ...prevState,
        error: "Row number should be from 3 and 10",
        seatData: [],
      }));
      return;
    }

    await fetchSeatsByCount(rows)
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          error: "",
          seatData: addSeatPrice(data.data),
          selectedSeatsMap: {},
        }));
      })
      .catch((e) => {
        console.error(e);
        setState((prevState) => ({
          ...prevState,
          error: "Sorry, we encountered an error and could not fetch seats",
          seatData: [],
          selectedSeatsMap: {},
        }));
      });
  }, []);

  const setErrorEmpty = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      error: "",
    }));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-center text-xl font-bold">Book your seats</h1>
        <ErrorContainer error={state.error} onClose={setErrorEmpty} />
        <div
          className={`mt-4 flex w-full flex-col ${
            state.seatData.length > 0 ? "justify-between" : "justify-center"
          } sm:flex-row`}
        >
          <SeatInput onSubmitNumberOfRows={onSubmitNumberOfRows} />
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
