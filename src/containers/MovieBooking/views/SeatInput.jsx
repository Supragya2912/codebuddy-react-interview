import { useCallback, useState } from "react";
import PropTypes from "prop-types";

const SeatInput = ({ onSubmitNumberOfRows }) => {
  const [rows, setRows] = useState(0);

  const handleChange = useCallback((e) => {
    setRows(e.target.value);
  }, []);

  return (
    <div className="flex w-full max-w-3xl items-center justify-center align-middle">
      <input
        className="focus:border-black-500 mr-3 rounded border-2 border-gray-300 p-3 focus:outline-none"
        placeholder="Enter number of rows"
        type="number"
        onChange={handleChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSubmitNumberOfRows(rows);
          }
        }}
      ></input>
      <button
        className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
        onClick={() => onSubmitNumberOfRows(rows)}
      >
        Submit
      </button>
    </div>
  );
};

SeatInput.propTypes = {
  onSubmitNumberOfRows: PropTypes.func,
};

export default SeatInput;
