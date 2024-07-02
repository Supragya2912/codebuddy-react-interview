import React from "react";
import { fetchSeatsByCount, confirmBooking } from "../../../utils/api";
import { addSeatPrice } from "../../../utils/helpers";

const useMovieBooking = ({ onConfirmBooking }) => {
  const [state, setState] = React.useState({
    seatData: [], // Stores seats from seat api
    error: "",
    selectedSeatsMap: {}, // Stores user selected seats
  });

  // Function to confirm booking
  const handleConfirmBooking = React.useCallback(async () => {
    const selectedSeatIds = Object.keys(state.selectedSeatsMap);

    await confirmBooking(selectedSeatIds)
      .then((data) => {
        console.log("Booking confirmed", data);
        onConfirmBooking(data);
      })
      .catch((e) => {
        console.error(e);
        setState((prevState) => ({
          ...prevState,
          error: "Sorry, we encountered an error and your booking was not done",
        }));
      });
  }, [onConfirmBooking, state.selectedSeatsMap]);

  const handleSeatClick = React.useCallback(({ id, pricePerSeat }) => {
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
          // If user tries to select more than 5 seats
          error = "You can select only 5 seats";
          newSeatsMap = prevState.selectedSeatsMap;
        } else {
          // Select the seat
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

  const onSubmitNumberOfRows = React.useCallback(async (rows) => {
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

  const setErrorEmpty = React.useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      error: "",
    }));
  }, []);

  return {
    state,
    handleConfirmBooking,
    handleSeatClick,
    onSubmitNumberOfRows,
    setErrorEmpty,
  };
};

export default useMovieBooking;
