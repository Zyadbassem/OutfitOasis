import { Gltf } from "@react-three/drei";
import { useRef, useEffect } from "react";
function CustomModel({modelPath, handleModel, modelId, length }) {
  const groupRef = useRef();
  useEffect(() => { 
    handleModel(groupRef.current, modelId, length)
  }, []);
  return (
  <group ref={groupRef}>
    <Gltf src="../../../assets/shama3a.glb"/>
    <Gltf src={modelPath}/>
  </group>
  );
}

export default CustomModel;