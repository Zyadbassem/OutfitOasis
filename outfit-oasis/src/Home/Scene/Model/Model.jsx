import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ItemsModels from "./ItemsModels";

function Model({
  page = 1,
  modelPath = "../../../assets/clothingholdertest.glb",
  modelId,
}) {
  const scrollingFactor = 0.0022 * window.innerHeight;
  const model = useRef();
  const gltf = useGLTF(modelPath);
  const phone = window.innerWidth < 850;

  const calculateModelPosition = () => {
    const position = phone
      ? { x: 0, y: -8.5 * page, z: 0 }
      : { x: 0, y: -5.5 * page, z: -2 };

    return position;
  };

  useEffect(() => {
    if (model.current) {
      const position = calculateModelPosition();
      model.current.position.set(position.x, position.y, position.z);
      model.current.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    const handleMovement = () => {
      const factorForPhoneHeight = window.innerHeight / 460;
      phone
        ? gsap.to(model.current.position, {
            y: model.current.position.y + factorForPhoneHeight,
            z: 1,
            duration: 2,
          })
        : gsap.fromTo(
            model.current.position,
            { x: 0, z: 0 },
            { x: 1.5, z: 1, duration: 2 }
          );
      gsap.to(model.current.children[1].rotation, {
        y: model.current.children[1].rotation.y - 1.5,
        duration: 2,
      });
    };

    window.addEventListener(`moveModel${modelId}`, handleMovement);
    return () =>
      window.removeEventListener(`moveModel${modelId}`, handleMovement);
  }, [scrollingFactor, phone]);

  useEffect(() => {
    const handleDragging = (event) => {
      const { deltaX } = event.detail;
      const rotationFactor = 0.01;
      const rotationAmount = deltaX * rotationFactor;

      gsap.to(model.current.children[1].rotation, {
        y: model.current.children[1].rotation.y + rotationAmount,
        duration: 0.1,
        ease: "power1.out",
      });
    };

    window.addEventListener(`dragging${modelId}`, handleDragging);
    return () =>
      window.removeEventListener(`dragging${modelId}`, handleDragging);
  }, [phone]);

  const handleModel = (modelImported, modelId, length) => {
    model.current.children[1].add(modelImported)
    const radius = 1; // Adjust based on hanger size
    const angle = ((modelId - 1) / length) * Math.PI * 2;

    modelImported.position.set(
      radius * Math.cos(angle),
      -0.37, // Vertical offset
      phone ? radius * Math.sin(angle) : radius * Math.sin(angle)  // Horizontal
    );
    modelImported.rotation.y = -angle; // Face outward
    modelImported.scale.set(0.3, 0.3, 0.3);
    
    console.log(model.current);
  };
  return (
    <>
      <primitive object={gltf.scene} ref={model} />
      <ItemsModels handleModel={handleModel} />
    </>
  );
}

export default Model;
