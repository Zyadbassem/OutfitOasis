import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import PropTypes from "prop-types";
import { useEffect } from "react";
// GSAP
gsap.registerPlugin(useGSAP, ScrollTrigger);

function Items({ modelId, items, collectionName, promotion, link }) {
  // Access item page and the buttonsPage
  const itemPage = useRef();
  const itemsPageRotateable = useRef();

  // Ref for dragging the holder and saving the last position
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      itemPage.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: itemPage.current,
          start: "top center",
          end: "top top",
        },
        duration: 1,
      },
    );
  }, []);

  // handle the click to show the draggable items page
  const handleClick = () => {
    // New Event listener
    window.dispatchEvent(
      new CustomEvent(`moveModel${modelId}`, {
        detail: { direction: "hello this works" },
      }),
    );

    // set a timeline for animation order
    const tl = gsap.timeline();

    // Animate the itemPage out
    tl.to(itemPage.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        itemPage.current.style.display = "none";
        itemsPageRotateable.current.style.display = "flex";
      },
    });

    // Set initial for itemsPageRotateable
    gsap.set(itemsPageRotateable.current, {
      opacity: 0,
    });

    // Animate the itemsPageRotateable in
    tl.to(itemsPageRotateable.current, {
      opacity: 1,
      duration: 2,
    });
  };

  // handle the user first click (and hold) on the draggable div
  const handleStart = (e) => {
    // Setting isDragging state to true
    setIsDragging(true);

    // Get the correct position whether it's touch or mouse
    const position = e.touches ? e.touches[0].clientX : e.clientX;

    // saving the last position on the lastPoition state
    setLastPosition(position);
  };

  const handleMove = (e) => {
    // if the user mouse isn't down
    if (!isDragging) return;

    // Get current position
    const currentPosition = e.touches ? e.touches[0].clientX : e.clientX;

    // comparing the current position to the last position
    if (lastPosition !== null) {
      const deltaX = currentPosition - lastPosition;

      // Calculate dragging factor based on screen width
      const draggingFactor = (currentPosition / window.innerWidth - 0.5) * 2;

      // Dispatch event with normalized data
      window.dispatchEvent(
        new CustomEvent(`dragging${modelId}`, {
          detail: {
            draggingFactor: Math.min(Math.max(draggingFactor, -1), 1), // Clamp between -1 and 1
            deltaX,
          },
        }),
      );
    }

    // setting the last position to the current position so the user continue dragging
    setLastPosition(currentPosition);
  };

  // user mouse up
  const handleEnd = () => {
    setIsDragging(false);
    setLastPosition(null);
  };

  return (
    <>
      <div
        id={`items${modelId}`}
        className="
        items-div
        h-[95svh]
        w-full
        mt-[50%]
        flex
        flex-col
        items-center
        justify-between
        pb-10
        max-w-[1300px]
        mx-auto
        lg:mt-[10%]"
        ref={itemPage}
      >
        <h1 className="text-4xl font-sans">{items}</h1>
        <button
          className="explore-button text-[#878787] text-sm"
          onClick={handleClick}
        >
          click to explore more -&gt;
        </button>
      </div>
      <div
        style={{ display: "none" }}
        ref={itemsPageRotateable}
        className="
        h-[95svh]
        w-full
        mt-[50%]
        flex
        flex-col
        items-center
        justify-between
        pb-10
        max-w-[1350px]
        mx-auto
        lg:mt-[10%]
        lg:flex-row-reverse"
        id="buttons-and-details"
      >
        <div
          className="dragging-div
            top-[15%]
            left-0
            right-0
            mx-auto
            w-[100%]
            min-w-80
            h-[30%]
            lg:top-[38%]
            lg:mr-0
            lg:w-[60%]
            lg:h-[40%]
            cursor-grab
            active:cursor-grabbing"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          style={{ touchAction: "none" }} // Prevent scrolling while dragging
        />
        <div
          className="
        details
        h-auto
        flex
        flex-col
        items-center
        mt-auto
        lg:mt-0
        justify-end
        max-w-[90%]
        lg:w-[40%]
        p-5
        gap-2"
        >
          <h2 className="text-xl md:text-xl">{collectionName}</h2>
          <p className="text-sm text-[#878787] md:text-l md:max-w-[60%] pb-7 max-w-[85%] lg:max-w-none">
            {promotion}
          </p>
          <Link to={link}>
            <button className="bg-white text-black py-3 px-10 rounded-sm">
              Learn more
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

Items.propTypes = {
  modelId: PropTypes.number,
  items: PropTypes.string,
  collectionName: PropTypes.string,
  promotion: PropTypes.string,
  link: PropTypes.string,
  id: PropTypes.string,
};

export default Items;
