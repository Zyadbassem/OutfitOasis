import { Gltf } from "@react-three/drei";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function CatalogModel({ modelId, modelPath, order }) {
  const phone = window.innerWidth < 850;
  const modelRef = useRef();
  const [isUserDragging, setIsUserDragging] = useState(false);

  const handlePosition = () => {
    return {
      x: phone ? 0 : 2,
      y: phone ? -order * 6.8 + 1 : -order * 5.5,
      z: phone ? 3 : 0,
    };
  };
  const handleModel = () => {
    const { x, y, z } = handlePosition();
    modelRef.current.position.set(x, y, z);
  };
  useFrame(() => {
    if (modelRef.current && !isUserDragging) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    gsap.fromTo(
      modelRef.current.scale,
      { x: 0, y: 0, z: 0 },
      {
        x: 1,
        y: 1,
        z: 1,
        scrollTrigger: {
          trigger: `#card${modelId}`,
          start: "top center",
          end: "top top",
          scrub: false,
        },
      },
    );

    handleModel();
    const handleDragging = (event) => {
      const { deltaX } = event.detail;

      const rotationFactor = phone ? 0.03 : 0.03;

      // Use deltaX for more natural rotation
      const rotationAmount = deltaX * rotationFactor;

      gsap.to(modelRef.current.rotation, {
        y: modelRef.current.rotation.y + rotationAmount,
        duration: 0.1, // Shorter duration for more responsive feel
        ease: "power1.out", // Smoother easing
      });
    };

    const handleMouseDown = () => {
      setIsUserDragging(true);
    };

    const handleMouseUp = () => {
      setIsUserDragging(false);
    };

    window.addEventListener(`mouseDownTops${modelId}`, handleMouseDown);
    window.addEventListener(`mouseUpTops${modelId}`, handleMouseUp);
    window.addEventListener(`draggingTops${modelId}`, handleDragging);

    return () => {
      window.removeEventListener(`mouseDownTops${modelId}`, handleMouseDown);
      window.removeEventListener(`mouseUpTops${modelId}`, handleMouseUp);
      window.removeEventListener(`draggingTops${modelId}`, handleDragging);
    };
  }, [phone, modelId, order]);

  return (
    <>
      <Gltf src={modelPath} ref={modelRef} />
      <directionalLight
        position={[
          handlePosition().x,
          handlePosition().y,
          handlePosition().z + 5,
        ]}
        intensity={5}
      />
    </>
  );
}
CatalogModel.propTypes = {
  modelId: PropTypes.string.isRequired,
  modelPath: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
};

export default CatalogModel;
