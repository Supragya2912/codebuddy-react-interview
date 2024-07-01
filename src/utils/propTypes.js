import PropTypes from "prop-types";

export const seatPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  seat: PropTypes.number.isRequired,
  isReserved: PropTypes.bool.isRequired,
  seatNumber: PropTypes.number.isRequired,
});

export const seatRowPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  seats: PropTypes.arrayOf(seatPropType).isRequired,
});

export const seatRowsPropTypes = PropTypes.arrayOf(seatRowPropType);
