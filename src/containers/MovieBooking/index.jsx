// add input box to take count and render seatview based on count
// min count = 3, max count = 10, add input validation properly
import { useCallback, useState } from "react";
import SeatView from "../../containers/MovieBooking/views/SeatView";
import SeatInput from "../../containers/MovieBooking/views/SeatInput";
import ErrorContainer from "../../containers/MovieBooking/views/ErrorContainer";
import { fetchSeatsByCount } from "../../utils/api";
import { addSeatPrice } from "../../utils/helpers";
import ConfirmBooking from "./views/ConfirmBooking";

const MovieBooking = () => {
  const [seatData, setSeatData] = useState([]);
  const [error, setError] = useState("");
  const [selectedSeatsMap, setSelectedSeatsMap] = useState({});

  const handleConfirmBooking = () => {
    // console.log(selectedSeat);
    // if (selectedSeat.length < 1 || selectedSeat.length > 5) {
    //   setError("Please select seats between 1 and 5");
    //   return;
    // } else {
    //   setError("");
    // }
    //to complete the handleBooking function
  };

  const handleSeatClick = ({ id, pricePerSeat }) => {
    setSelectedSeatsMap((prevSelectedSeats) =>
      prevSelectedSeats[id]
        ? Object.fromEntries(Object.entries(prevSelectedSeats).filter(([key]) => key !== id))
        : { ...prevSelectedSeats, [id]: pricePerSeat },
    );
  };

  const handleSeats = useCallback(async (rows) => {
    if (rows < 3 || rows > 10) {
      setError("Row number should be from 3 and 10");
      setSeatData([]);
      return;
    }

    await fetchSeatsByCount(rows).then((data) => {
      setSeatData(addSeatPrice(data.data));
      setError("");
    });
  }, []);

  console.log(selectedSeatsMap);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Book your seats</h1>
      <ErrorContainer error={error} />
      <div className="mt-4 flex w-full flex-col justify-between sm:flex-row">
        <SeatInput onSubmitNumberOfRows={handleSeats} />
        {seatData.length > 0 && (
          <ConfirmBooking
            onConfirmBooking={handleConfirmBooking}
            selectedSeatsMap={selectedSeatsMap}
          />
        )}
      </div>
      <SeatView
        seatRows={seatData}
        onClickSeat={handleSeatClick}
        selectedSeatsMap={selectedSeatsMap}
      />
    </div>
  );
};

export default MovieBooking;
