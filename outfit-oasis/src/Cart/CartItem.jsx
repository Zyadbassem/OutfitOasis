import { useState } from "react";
import PropTypes from "prop-types";

function CartItem({
  name = "aaa",
  quantity = 1,
  price = 499,
  totalprice = 1500,
  imageSrc = "https://images.unsplash.com/photo-1622838320000-4",
  handleQuantityChange = () => {},
  id = 0,
}) {
  const [quantityState, setQuantityState] = useState(quantity);

  const handleQuantityInput = (e) => {
    setQuantityState(e.target.value);
  };

  const handleBlur = () => {
    handleQuantityChange(id, quantityState);
  };

  return (
    <div
      className="
        flex
        min-w-[100%]
        items-start
        justify-between
        border-b
        border-[#878787]
        font-sans
        my-5
        py-5
      "
    >
      <div
        className="
        flex
        items-start
        gap-2"
      >
        <img
          src={imageSrc}
          alt={name}
          className="
          w-[150px]
          h-[150px]"
        />
        <div
          className="
          flex
          flex-col
          justify-between
          h-[150px]"
        >
          <span className="font-mono">{name}</span>
          <input
            className="w-10
                text-black
                font-mono
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                rounded
                px-1"
            value={quantityState}
            onChange={handleQuantityInput}
            onBlur={handleBlur}
            type="number"
            max={10}
          />
        </div>
      </div>
      <div
        className="
        flex
        flex-col
        items-start
        h-[150px]
        justify-between"
      >
        <div className="text-[#878787] font-extralight">
          <span className="font-mono">{quantity} x</span>
          <span className="font-mono"> {price}</span>
        </div>
        <span className="font-mono">total: ${totalprice}</span>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  name: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  totalprice: PropTypes.number,
  imageSrc: PropTypes.string,
  id: PropTypes.string,
  handleQuantityChange: PropTypes.func,
};

export default CartItem;
