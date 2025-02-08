import { useState } from "react";

function TopsController({ itemId=0 }) {
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState(null);

  const handleStart = (e) => {
    console.log(e);
    setIsDragging(true);
    // Get the correct position whether it's touch or mouse
    const position = {
      x: e.touches ? e.touches[0].clientX : e.clientX,
      y: e.touches ? e.touches[0].clientY : e.clientY,
    };
    setLastPosition(position);
  };

  const handleMove = (e) => {
    console.log(itemId)
    if (!isDragging) return;

    // Get current position
    const currentPosition = {
      x: e.touches ? e.touches[0].clientX : e.clientX,
      y: e.touches ? e.touches[0].clientY : e.clientY,
    };

    if (lastPosition !== null) {
      const deltaX = currentPosition.x - lastPosition.x;
      const deltaY = currentPosition.y - lastPosition.y;
      const draggingRight = deltaX > 0;
      const draggingDown = deltaY > 0;

      // Calculate dragging factor based on screen width
      const draggingFactorX = (currentPosition.x / window.innerWidth - 0.5) * 2;
      const draggingFactorY = (currentPosition.y / window.innerHeight - 0.5) * 2

      // Dispatch event with normalized data
      window.dispatchEvent(
        new CustomEvent(`draggingTops${itemId}`, {
          detail: {
            draggingFactorX: Math.min(Math.max(draggingFactorX, -1), 1), // Clamp between -1 and 1
            draggingRight,
            deltaX,
            draggingFactorY:  Math.min(Math.max(draggingFactorX, -1), 1),
            draggingDown,
            deltaY,
          },
        })
      );
    }
    
    setLastPosition(currentPosition);
  };

   const handleEnd = () => {
        setIsDragging(false);
        setLastPosition(null);
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

export default TopsController;
