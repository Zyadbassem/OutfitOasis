import PropTypes from "prop-types";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef } from "react";
/** Register Plugins */
gsap.registerPlugin(useGSAP, ScrollTrigger);

function PromotionCard({ quote = "", quoteSayer = "", sayerProffission = "" }) {
  /** Setting card ref for animation */
  const cardRef = useRef();

  /** Handle Animation */
  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      { scale: 0.5 },
      {
        scale: 1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      },
    );
  });

  return (
    <div
      className="card bg-white py-5 px-2 m-5 flex flex-col justify-start items-center max-w-[280px] h-[400px] rounded-md lg:h-[350px] lg:max-w-[230px]"
      ref={cardRef}
    >
      <span className="quote text-black mb-auto text-2xl text-center font-extrabold lg:text-xl">
        “{quote}”
      </span>
      <span className="quote-sayer text-black text-xl font-bold">
        {quoteSayer}
      </span>
      <span className="sayer-proffission text-[#878787] text-center">
        {sayerProffission}
      </span>
    </div>
  );
}
PromotionCard.propTypes = {
  quote: PropTypes.string,
  quoteSayer: PropTypes.string,
  sayerProffission: PropTypes.string,
};

export default PromotionCard;
