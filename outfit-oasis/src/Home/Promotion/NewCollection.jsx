import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function NewCollection() {
  const elementRef = useRef([]);
  const boxRef = useRef();
  const animateRef = useRef();

  // Properly add elements to the ref array
  const addToRefs = (el) => {
    if (el && !elementRef.current.includes(el)) {
      elementRef.current.push(el);
    }
  };

  useGSAP(() => {
    gsap.fromTo(
      animateRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        scrollTrigger: {
          trigger: animateRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      },
    );

    const boxWidth = boxRef.current.offsetWidth;
    elementRef.current.forEach((element) => {
      const itemWidth = element.offsetWidth;
      gsap.fromTo(
        element,
        { x: -itemWidth },
        {
          x: boxWidth,
          duration: 7,
          repeat: -1,
          ease: "none",
        },
      );
    });
  }, []);

  return (
    <div
      className="min-h-[90vh] mt-[100px] max-w-[1300px] mx-auto flex flex-col justify-center items-center mb-[100px]"
      ref={animateRef}
    >
      <Link
        to="/tops"
        className="bg-[url(assets/promotion1.png)] bg-cover w-[90%] h-[80vh] bg-[60%_center] bg-no-repeat flex items-start justify-end rounded-t"
      >
        <h2 className="max-w-40 p-4 mr-[-15px] text-black font-sans text-xl lg:text-3xl lg:mr-0 lg:max-w-max">
          Explore Our New Collection
        </h2>
      </Link>
      <div
        className="bg-white w-[90%] p-2 rounded-b flex justify-between max-h-10 overflow-hidden"
        ref={boxRef}
      >
        <span className="text-black lg:inline" ref={addToRefs}>
          Use <strong>I5NU4D</strong> to get 15% off{" "}
        </span>
      </div>
    </div>
  );
}

export default NewCollection;
