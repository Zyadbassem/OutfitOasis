import PropTypes from "prop-types";

function CatalogColor({ color = "#000000" }) {
  const handleChangeColor = () => {
    const colorRequested = color;
    let previousColor = localStorage.getItem("currentColor")
      ? localStorage.getItem("currentColor")
      : "#C8C8C8";

    window.dispatchEvent(
      new CustomEvent("changeColor", {
        detail: {
          colorRequested,
          previousColor,
        },
      }),
    );

    localStorage.setItem("currentColor", color);
  };

  return (
    <div className="bg-[#ffffff] w-10 h-10 rounded-[50%] flex items-center justify-center">
      <div
        className="w-[90%] h-[90%] rounded-[50%]"
        style={{ backgroundColor: color }}
        onClick={handleChangeColor}
      ></div>
    </div>
  );
}

CatalogColor.propTypes = {
  color: PropTypes.string,
};

export default CatalogColor;
