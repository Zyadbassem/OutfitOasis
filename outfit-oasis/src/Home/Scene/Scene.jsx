import { useEffect, useRef } from "react";
import Lights from "./Lights/Lights";
import { Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import ClothingHanger from "./Model/ClothingHanger";
import PropTypes from "prop-types";

function Scene({ setLoading }) {
  const threeWorld = useThree();
  const phone = window.innerWidth < 850;
  const scrollRef = useRef(0);
  const viewportHeightRef = window.visualViewport.height;

  useEffect(() => {
    const updateCameraPosition = (scrollY) => {
      // Store the scroll position
      scrollRef.current = scrollY;
      // Use the stored viewport height for calculations
      const scrollPosition = scrollY / viewportHeightRef;
      threeWorld.camera.position.y = phone
        ? -5.5 * scrollPosition
        : -4.5 * scrollPosition;
    };

    const handleScroll = () => {
      updateCameraPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    // window.addEventListener("resize", handleResize);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // window.removeEventListener("resize", handleResize);
    };
  }, [phone, threeWorld.camera.position]);

  return (
    <>
      <ClothingHanger
        hangerPath="../.././assets/clothingholdertest.glb"
        hangerId={1}
        hangerType="tops"
        setLoading={setLoading}
      />
      <ClothingHanger
        hangerPath="../.././assets/clothingholdertest.glb"
        hangerId={2}
        hangerType="trousers"
      />
      <Lights />
      <Environment preset="forest" environmentIntensity={0.2} />
    </>
  );
}

Scene.propTypes = {
  setLoading: PropTypes.func,
};

export default Scene;
