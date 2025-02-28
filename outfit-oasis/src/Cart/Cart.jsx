import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import LoadingHelper from "../Helpers/LoadingHelper";
import { backend_url } from "../Helpers/helpers";
import PopUpHelper from "../Helpers/PopUpHelper";

function Cart() {
  /** Cart items and total price states */
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  /** PopUpHelper state */
  const [helper, setHelper] = useState("");

  /** Authentication */
  const auth = useAuth();
  const token = auth.token;

  /** Loading */
  const [loading, setLoading] = useState(true);

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const response = await fetch(`${backend_url}/api/cartQuantityChange`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      setHelper("Quantity Updated");
      setTimeout(() => {
        setHelper("");
      }, 2000);
      getCartItems();
    } catch (error) {
      console.log(error.message);
    }
  };

  /** Function to get the items */
  const getCartItems = async () => {
    try {
      const response = await fetch(`${backend_url}/api/getcart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setCartItems(data);

      // Correct total price calculation
      const total = data.reduce(
        (sum, item) => sum + item.priceForAllItemQuantity,
        0,
      );
      setTotalPrice(total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    /** function to Check the token */
    const checkToken = async () => {
      try {
        const checker = await auth.checkToken(token);
        if (!checker) {
          auth.logout();
        }
      } catch (error) {
        console.error("Token check failed:", error);
        auth.logout();
      }
    };

    checkToken();
    getCartItems();
  }, [token, auth]);

  return (
    <div
      className="
      welcome-section
      w-full
      max-w-[1300px]
      mx-auto
      h-full
      flex
      flex-col
      mt-[20%]
      border-x-0
      items-start
      min-h-[80vh]
      p-6
      mb-11
      lg:mt-28"
    >
      {helper ? <PopUpHelper error={false} message={helper} /> : null}
      <h1 className="text-5xl mb font-sans text-center mx-auto">
        Shopping Cart
      </h1>
      {cartItems.map((item) => (
        <CartItem
          key={item.item._id}
          id={item.item._id}
          name={item.item.name}
          price={item.item.price}
          totalprice={item.priceForAllItemQuantity}
          quantity={item.quantity}
          imageSrc={`${backend_url}${item.item.image}`}
          handleQuantityChange={handleQuantityChange}
        />
      ))}

      {totalPrice ? (
        <div
          className="
          w-[100%]
          flex
          items-center
          justify-between
          "
        >
          <span className="font-mono text-l">Total price: ${totalPrice}</span>
          <Link
            to="/checkout"
            className="
            bg-white
            text-black
            px-9
            py-2
            rounded"
          >
            Checkout
          </Link>
        </div>
      ) : (
        <span className="font-mono text-l my-auto mx-auto">
          you have nothing here
        </span>
      )}
      {loading ? <LoadingHelper /> : null}
    </div>
  );
}

export default Cart;
