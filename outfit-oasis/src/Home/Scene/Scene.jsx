import React, { useState, useEffect } from 'react';
import Model from './Model/Model';
import Lights from './Lights/Lights';
import { Environment } from '@react-three/drei'
import { useThree } from '@react-three/fiber';
import model1Link from "../.././assets/clothingholdertest.glb";
import model2Link from "../.././assets/pantsholder.glb"
import * as THREE from 'three'

function Scene() {

    const threeWorld = useThree()
    const phone = window.innerWidth < 850
    useEffect(() => {

        const handleScroll = (e) => {
            const scrollPosition = window.scrollY / window.innerHeight
            threeWorld.camera.position.y =  phone ? -7 * scrollPosition : -5.5 * scrollPosition
            
        }
       window.addEventListener("scroll", (e) => handleScroll(e))

       return
    }, [])
    
    return (
        <>
            <Model modelPath={model1Link} positionY={-2} modelId={1}/>
            <Lights />
            <Environment preset="forest" environmentIntensity={0.2}/>
        </>
    );
}

export default Scene;
