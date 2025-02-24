import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import PopUpHelper from "../Helpers/PopUpHelper";
import InputField from "../Login/InputField/InputField";
import LoadingHelper from "../Helpers/LoadingHelper";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../Helpers/helpers";

function CheckOut() {
  const auth = useAuth();
  const token = auth.token;
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const checker = await auth.checkToken(token);
        if (!checker) {
          console.log(checker);
        }
      } catch (error) {
        console.error("Token check failed:", error);
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
        if (data.length < 1) {
          navigate("/");
        }
        setCartItems(data);

        if (data.length < 1) navigate("/");

        // Correct total price calculation
        const total = data.reduce(
          (sum, item) => sum + item.priceForAllItemQuantity,
          0,
        );
        setTotalPrice(total);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getCartItems();
    checkToken();
  }, [token, auth]);

  const handleCheckout = (e) => {
    e.preventDefault();
    auth.checkoutAction(form, setForm, setError);
  };

  const [error, setError] = useState("");

  return (
    <form
      onSubmit={handleCheckout}
      className="
                  w-full
                  max-w-[1300px]
                  mx-auto
                  h-full
                  flex
                  flex-col
                  mt-[20%]
                  border-x-0
                  items-center
                  p-6
                  mb-11
                  lg:mt-28"
    >
      {loading ? <LoadingHelper /> : null}
      {error ? <PopUpHelper message={error} error={true} /> : null}
      <h1 className="text-6xl m-10 font-sans mt-0">Checkout</h1>
      <InputField
        label="First Name"
        name="firstName"
        placeholder="Exp: john"
        type="text"
        onChange={handleChange}
        value={form.firstName}
      />
      <InputField
        label="Last Name"
        name="lastName"
        type="text"
        placeholder="Exp: Cena"
        onChange={handleChange}
        value={form.lastName}
      />
      <InputField
        label="Phone Number"
        name="phoneNumber"
        type="text"
        placeholder="+12345678910"
        onChange={handleChange}
        value={form.phoneNumber}
      />
      <InputField
        label="Address"
        name="address"
        type="text"
        placeholder="21 john cena street"
        onChange={handleChange}
        value={form.address}
      />
      <InputField
        label="City"
        name="city"
        type="text"
        placeholder="NewCena"
        onChange={handleChange}
        value={form.city}
      />
      <InputField
        label="State"
        name="state"
        type="text"
        placeholder="California"
        onChange={handleChange}
        value={form.state}
      />
      <InputField
        label="Country"
        name="country"
        type="text"
        placeholder="USA"
        onChange={handleChange}
        value={form.country}
      />
      <div
        className="font-mono w-[100%]
      max-w-[380px]"
      >
        {cartItems.map((item) => (
          <div key={item.item.id} className="font-mono">
            {item.item.name} * {item.quantity}
          </div>
        ))}
        <div className="font-mono">total price: {totalPrice}</div>
      </div>
      <button
        type="submit"
        className="
          font-sans
          m-5
          text-2xl
          px-5
          py-1
          rounded-lg
          bg-white
          ring-1
          ring-[#87878741]
          text-[#000]
          bg-transparent
          shadow-[#807f7f90]
          shadow-sm
          "
      >
        Checkout
      </button>
    </form>
  );
}

export default CheckOut;
