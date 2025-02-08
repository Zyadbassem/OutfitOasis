import { Canvas } from "@react-three/fiber";
import * as THREE from "three"
import TopsScene from "./TopsScene";
import { Environment } from "@react-three/drei";

function TopsWorld() {

    const phone = window.innerWidth < 600
    return(
        <Canvas
        shadows
        style={{ 
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            zIndex: -1,
        }}
        camera={{ fov: 30, position: [0, 0, phone ? 15 : 8], rotation: [0, 0, 0]}}
        gl={{ toneMapping: THREE.ReinhardToneMapping }}
        >
            <TopsScene />
            <Environment preset="forest" environmentIntensity={0.2}/>
        </Canvas>
    )
}

export default TopsWorld