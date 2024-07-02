import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

const ErrorContainer = ({ error, onClose }) =>
  error ? (
    <div
      className="relative mt-3 flex justify-between rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
    >
      <span className="block sm:inline">{error}</span>
      <Icon onClick={onClose} icon="mdi:close" fontSize={24} className="cursor-pointer" />
    </div>
  ) : null;

ErrorContainer.propTypes = {
  error: PropTypes.string,
  onClose: PropTypes.func,
};

export default ErrorContainer;
