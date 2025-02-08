import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import * as THREE from 'three'
import { useEffect, useRef } from 'react';
function World() {
    const phone = window.innerWidth < 600
    const canvasRef = useRef()


    return (
        <Canvas 
        style={{ 
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            zIndex: -1,
        }}
        camera={{ fov: 30, position: [0, 0, phone ? 15 : 8], rotation: [0, 0, 0]}}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
        ref={canvasRef}>
             <Scene />
        </Canvas>
    )
}

export default World
