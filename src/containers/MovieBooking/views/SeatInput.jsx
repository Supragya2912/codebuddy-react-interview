import { useCallback, useState } from "react";
import PropTypes from "prop-types";

const SeatInput = ({ onSubmitNumberOfRows }) => {
  const [rows, setRows] = useState(0);

  const handleChange = useCallback((e) => {
    setRows(e.target.value);
  }, []);

  return (
    <div className="mb-4 flex w-full justify-between px-2 align-middle sm:mb-0 sm:justify-start sm:px-0">
      <input
        className="mr-3 w-40 rounded border-2 border-gray-300 p-3 focus:border-gray-500 focus:outline-none"
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
        className="min-w-[150px] rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
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
