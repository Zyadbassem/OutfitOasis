import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import * as THREE from "three";
import { useRef } from "react";
import PropTypes from "prop-types";
function World({ setLoading }) {
  const phone = window.innerWidth < 600;
  const canvasRef = useRef();

  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100svh",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        zIndex: -1,
      }}
      camera={{
        fov: 30,
        position: [0, 0, phone ? 15 : 8],
        rotation: [0, 0, 0],
      }}
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      ref={canvasRef}
    >
      <Scene setLoading={setLoading} />
    </Canvas>
  );
}

World.propTypes = {
  setLoading: PropTypes.func,
};

export default World;
