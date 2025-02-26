import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ChooseUs() {
  /** Animation Handler */
  const pageRef = useRef();
  useGSAP(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top center",
          end: "bottom bottom",
        },
      },
    );
  }, []);

  return (
    <div
      className="[90svh] mt-[100px] max-w-[1300px] mx-auto flex flex-col lg:flex-row items-center mb-[100px] justify-between"
      ref={pageRef}
    >
      <h3 className="mx-auto text-center text-6xl font-sans mb-10">
        Why To Choose Us?
      </h3>
      <ul className="lg:w-[50%] flex flex-col gap-4">
        <li className="m-5 flex flex-col gap-5">
          <h4 className="font-sans text-4xl">Premium Quality</h4>
          <p className="font-sans text-l text-gray-500">
            We believe that fashion should not only look good but also feel
            good. That’s why all our clothing is made from premium quality
            fabrics that are soft, durable, and comfortable. We meticulously
            select materials that provide the perfect balance of style and
            longevity, ensuring you get the best value for your money. With our
            clothing, you won’t have to compromise between comfort and elegance.
          </p>
        </li>
        <li className="m-5 flex flex-col gap-5">
          <h4 className="font-sans text-4xl">Affordable Fashion</h4>
          <p className="font-sans text-l text-gray-500">
            We believe that fashion should be accessible to all. Our competitive
            pricing ensures you don’t have to break the bank to stay stylish. By
            offering affordable fashion without compromising on quality, we make
            it easier for you to keep up with trends while sticking to your
            budget. Look great and spend smart with our versatile collections.
          </p>
        </li>
        <li className="m-5 flex flex-col gap-5">
          <h4 className="font-sans text-4xl">Customer Support</h4>
          <p className="font-sans text-l text-gray-500">
            Your satisfaction is our top priority. Our dedicated customer
            support team is always ready to help with any questions or concerns
            you may have. We provide quick responses, hassle-free returns, and
            personalized assistance to ensure you have the best shopping
            experience. Shop with confidence, knowing that we’re here for you at
            every step.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default ChooseUs;
