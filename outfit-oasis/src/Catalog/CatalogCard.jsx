import TopsController from "./CatalogController";
import PropTypes from "prop-types";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useState, useRef, useEffect } from "react";
import PopUpHelper from "../Helpers/PopUpHelper";
import { backend_url } from "../Helpers/helpers";
import CatalogColor from "./CatalogColor";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function CatalogCard({
  name = "Essential Comfort Tee",
  description = "good",
  price = 2,
  id = 0,
  colors = ["black"],
}) {
  /** Ref */
  const cardRef = useRef();

  /** Animation */
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "top top",
        },
        duration: 2,
      },
    );
  }, []);

  /** Handle Authentication */
  const auth = useAuth();
  const token = auth.token;
  const handleAddToCart = () => {
    auth.checkToken(token);
    addCart(id, 1);
  };

  /** Handle add to cart */
  const addCart = async (itemId, quantity) => {
    if (!token) {
      auth.logout();
      return;
    }
    try {
      const response = await fetch(`${backend_url}/api/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemId,
          quantity,
        }),
      });
      const data = await response.json();

      setError({
        message: data.message,
        error: false,
      });
      setTimeout(() => {
        setError({
          message: "",
          error: false,
        });
      }, 2000);
    } catch (error) {
      setError({
        message: error.message,
        error: false,
      });
      setTimeout(() => {
        setError({
          message: "",
          error: false,
        });
      }, 2000);
    }
  };

  /** Handle Responsiveness */
  const phone = window.innerWidth < 700;

  /** Handle error */
  const [error, setError] = useState({
    message: "",
    error: false,
  });
  return (
    <section
      id={`card${id}`}
      className="w-full max-w-[1300px] mx-auto flex mt-[20%] border-x-0  p-6 lg:mt-16 h-[90vh] flex-col-reverse items-center lg:h-[90vh] lg:p-0 lg:mb-0 lg:justify-between lg:items-center lg:flex-row"
    >
      {error.message ? (
        <PopUpHelper message={error.message} error={error.error} />
      ) : null}
      <div
        className="h-auto flex flex-col items-center justify-end max-w-[90%] lg:w-[40%] p-5 gap-2 min-h-[50%] lg:min-h-max"
        ref={cardRef}
      >
        <h2 className="text-l lg:text-2xl">{name}</h2>
        <p className="text-sm text-[#878787] lg:text-sm">{description}</p>
        <span className="mr-auto mt-4 text-xl">{price}$</span>
        <button
          className="bg-white text-black py-3 px-10 rounded-sm w-[100%]"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
      {!phone ? <TopsController itemId={id} /> : null}
      {colors.length > 1 ? (
        <div className=" mx-auto w-[90%] h-10 flex items-center justify-center gap-5 lg:flex-col lg:h-auto lg:left-auto lg:w-20 lg:top-[41%] lg:right-10 lg:mx-0">
          {colors.map((color, index) => (
            <CatalogColor key={index} color={color} />
          ))}
        </div>
      ) : null}
      {phone ? <TopsController itemId={id} /> : null}
    </section>
  );
}

CatalogCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
  colors: PropTypes.array,
  handleAddToCard: PropTypes.func,
};
export default CatalogCard;
