import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import CatalogScene from "./CatalogScene";
import { Environment } from "@react-three/drei";
import PropTypes from "prop-types";

function CatalogWorld({ setLoading, type }) {
  const phone = window.innerWidth < 850;
  return (
    <Canvas
      shadows
      style={{
        width: "100vw",
        height: "100svh",
        position: "fixed",
        top: 0,
        zIndex: -1,
      }}
      camera={{
        fov: 30,
        position: [0, 0, phone ? 15 : 8],
        rotation: [0, 0, 0],
      }}
      gl={{ toneMapping: THREE.ReinhardToneMapping }}
    >
      <CatalogScene setLoading={setLoading} type={type} />
      <Environment preset="forest" environmentIntensity={0.2} />
    </Canvas>
  );
}

CatalogWorld.propTypes = {
  setLoading: PropTypes.func,
  type: PropTypes.string,
};

export default CatalogWorld;
