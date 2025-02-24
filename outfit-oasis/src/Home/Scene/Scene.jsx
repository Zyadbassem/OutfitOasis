import { useEffect } from "react";
import Lights from "./Lights/Lights";
import { Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import ClothingHanger from "./Model/ClothingHanger";
import PropTypes from "prop-types";

function Scene({ setLoading }) {
  const threeWorld = useThree();
  const phone = window.innerWidth < 850;
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY / window.innerHeight;
      threeWorld.camera.position.y = phone
        ? -7 * scrollPosition
        : -5.5 * scrollPosition;
    };
    window.addEventListener("scroll", (e) => handleScroll(e));

    return;
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
