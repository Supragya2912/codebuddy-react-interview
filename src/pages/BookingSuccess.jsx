import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-[300px] items-center rounded-lg bg-gray-50 p-0 py-7 align-middle text-gray-900 shadow-lg md:p-7">
      <Icon icon="mdi:check-circle" className="mx-auto mb-4 text-emerald-800" fontSize={60} />
      <div className="align-center mb-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-emerald-800">Congratulations!</h1>
        <h2 className="text-black-700 mt-2 text-2xl">Your Booking is successful</h2>
      </div>
      <div className="mt-7 flex justify-center">
        <button
          className="rounded-md bg-emerald-600 px-4 py-2 font-bold text-white transition duration-300 hover:bg-emerald-800"
          onClick={handleBack}
        >
          Book more tickets
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
