import PropTypes from "prop-types";

function PopUpHelper({ error = true, message = "no error" }) {
  return (
    <span
      className={`
      ${error ? "text-[#ef5350]" : "text-[#355E3B]"}
      text-xs
      bg-white
      border-t-2
      border-b-2
      ${error ? "border-[#ef5350]" : "border-[#355E3B]"}
      fixed
      top-[10%]
      w-[30%]
      min-w-80
      left-0
      right-0
      mx-auto
      px-5
      py-1
      flex
      items-center
      justify-center
      text-center`}
    >
      {message}
    </span>
  );
}

PopUpHelper.propTypes = {
  error: PropTypes.bool,
  message: PropTypes.string,
};

export default PopUpHelper;
