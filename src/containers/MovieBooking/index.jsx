// add input box to take count and render seatview based on count
// min count = 3, max count = 10, add input validation properly
import { useCallback, useState } from "react";
import SeatView from "../../containers/MovieBooking/views/SeatView";
import { fetchSeatsByCount } from "../../utils/api";

const MovieBooking = () => {
  const [row, setRow] = useState(null);
  const [seatData, setSeatData] = useState([]);
  const [error, setError] = useState("");
  const [selectedSeat, setSelectedSeat] = useState([]);

  const handleChange = (e) => {
    setRow(e.target.value);
  };

  const handleConfirmBooking = () => {
    console.log(selectedSeat);

    if (selectedSeat.length < 1 || selectedSeat.length > 5) {
      setError("Please select seats between 1 and 5");
      return;
    } else {
      setError("");
    }

    //to complete the handleBooking function
  };

  const handleSeatClick = (seatId) => {
    setSelectedSeat((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId],
    );
  };

  const handleSeats = useCallback(async () => {
    if (row < 3 || row > 10) {
      setError("Row number should be between 3 and 10");
      setSeatData([]);
      return;
    }

    await fetchSeatsByCount(row).then((data) => {
      setSeatData(data.data);
      setError("");
    });
  }, [row]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Book your seats</h1>
        <div className="mt-4 flex items-center ">
          <input
            className="focus:border-black-500 mr-3 mt-4 rounded border-2 border-gray-300 p-3 focus:outline-none"
            placeholder="Enter row number"
            type="number"
            onChange={handleChange}
          ></input>
          <button
            className="mt-4 rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
            onClick={handleSeats}
          >
            Submit
          </button>
        </div>
        {seatData.length > 0 && error && <h1 className="mt-4 text-red-500">{error}</h1>}
        {seatData.length > 0 ? (
          <div className="mt-4 w-full max-w-3xl rounded-lg border border-gray-300 p-4 shadow-2xl">
            <SeatView
              seatRows={seatData}
              onClickSeat={handleSeatClick}
              userSelectedSeatIds={selectedSeat}
            />
          </div>
        ) : setError ? (
          <div className="mt-4 w-full max-w-3xl rounded-lg border border-gray-300 p-4 shadow-2xl">
            <h1 className="text-center text-red-500 ">{error}</h1>
          </div>
        ) : (
          <div className="mt-4 w-full max-w-3xl rounded-lg border border-gray-300 p-4 shadow-2xl">
            <h1 className="text-center ">Please select row number to view seats</h1>
          </div>
        )}
        {/* </div> */}
        {seatData.length > 0 && (
          <button
            className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </button>
        )}
      </div>
    </>
  );
};

export default MovieBooking;
