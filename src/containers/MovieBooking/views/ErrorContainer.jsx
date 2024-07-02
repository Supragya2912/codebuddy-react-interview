import PropTypes from "prop-types";

const ErrorContainer = ({ error }) =>
  error ? (
    <div
      className="relative mt-3 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
    >
      <span className="block sm:inline">{error}</span>
    </div>
  ) : null;

ErrorContainer.propTypes = {
  error: PropTypes.string,
};

export default ErrorContainer;
