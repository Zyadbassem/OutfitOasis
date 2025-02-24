import { useState } from "react";
import PropTypes from "prop-types";

function CatalogController({ itemId = 0 }) {
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState(null);

  const handleStart = (e) => {
    setIsDragging(true);
    const position = {
      x: e.touches ? e.touches[0].clientX : e.clientX,
      y: e.touches ? e.touches[0].clientY : e.clientY,
    };
    setLastPosition(position);

    // Dispatch mouseDown event
    window.dispatchEvent(new CustomEvent(`mouseDownTops${itemId}`));
  };

  const handleMove = (e) => {
    if (!isDragging) return;

    const currentPosition = {
      x: e.touches ? e.touches[0].clientX : e.clientX,
      y: e.touches ? e.touches[0].clientY : e.clientY,
    };

    if (lastPosition !== null) {
      const deltaX = currentPosition.x - lastPosition.x;
      const deltaY = currentPosition.y - lastPosition.y;

      window.dispatchEvent(
        new CustomEvent(`draggingTops${itemId}`, {
          detail: {
            deltaX,
            deltaY,
          },
        }),
      );
    }

    setLastPosition(currentPosition);
  };

  const handleEnd = () => {
    setIsDragging(false);
    setLastPosition(null);

    // Dispatch mouseUp event
    window.dispatchEvent(new CustomEvent(`mouseUpTops${itemId}`));
  };

  return (
    <div
      className="
                w-[90%]
                h-[40%]
                top-[10%]
                left-0
                right-0
                mx-auto
                lg:mx-0
                lg:w-[50%]
                lg:top-[25%]
                lg:h-[60%]
                lg:static
                cursor-grab
                active:cursor-grabbing
                mb-auto
                lg:mb-[0]
            "
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    />
  );
}

CatalogController.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default CatalogController;
