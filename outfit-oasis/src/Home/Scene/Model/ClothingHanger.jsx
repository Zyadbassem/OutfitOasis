import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Gltf } from "@react-three/drei";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import ItemsModels from "./ItemsModels";

gsap.registerPlugin(ScrollTrigger);
function ClothingHanger({
  hangerPath = "",
  hangerId = 0,
  hangerType = "",
  setLoading = () => {},
}) {
  /** Ref to handle position and attach items */
  const clothingHangerRef = useRef();

  /** Handle our model Positioning and interactions */
  useEffect(() => {
    /** Animation */
    gsap.fromTo(
      clothingHangerRef.current.scale,
      { x: 0, y: 0, z: 0 },
      {
        x: 1,
        y: 1,
        z: 1,
        scrollTrigger: {
          trigger: `#items${hangerId}`,
          start: "top center",
          end: "bottom center",
          scrub: false,
        },
      },
    );

    /** Handling Position Function */
    const phone = window.innerWidth < 700;
    const positionHandler = () => {
      const position = phone
        ? { x: 0, y: hangerId == 1 ? -8 : hangerId == 2 ? -15.5 : -30, z: 0 }
        : {
            x: 0,
            y: hangerId == 1 ? -6.5 : hangerId == 2 ? -11.5 : -20,
            z: -2,
          };
      return position;
    };

    /** Handling First Enteraction */
    const handleMovement = () => {
      const factorForPhoneHeight = window.visualViewport.height / 460;
      phone
        ? gsap.to(clothingHangerRef.current.position, {
            y: clothingHangerRef.current.position.y + factorForPhoneHeight,
            z: 1,
            duration: 2,
          })
        : gsap.fromTo(
            clothingHangerRef.current.position,
            { x: 0, z: 0 },
            { x: 1.5, z: 1, duration: 2 },
          );
      gsap.to(clothingHangerRef.current.children[1].rotation, {
        y: clothingHangerRef.current.children[1].rotation.y - 1.5,
        duration: 2,
      });
    };

    /** Handle User Dragging */
    const handleDragging = (event) => {
      const { deltaX } = event.detail;
      const rotationFactor = 0.01;
      const rotationAmount = deltaX * rotationFactor;

      gsap.to(clothingHangerRef.current.children[1].rotation, {
        y: clothingHangerRef.current.children[1].rotation.y + rotationAmount,
        duration: 0.1,
        ease: "power1.out",
      });
    };

    /** Calling the functions */
    const hangerPosition = positionHandler();
    clothingHangerRef.current.position.x = hangerPosition.x;
    clothingHangerRef.current.position.y = hangerPosition.y;
    clothingHangerRef.current.position.z = hangerPosition.z;

    window.addEventListener(`moveModel${hangerId}`, handleMovement);
    window.addEventListener(`dragging${hangerId}`, handleDragging);
  }, [hangerId]);

  /** Handle imported mofdels */
  const handleModel = (modelImported, modelId, length) => {
    const phone = Window.innerWidth < 700;
    clothingHangerRef.current.children[1].add(modelImported);
    const radius = 1; // Adjust based on hanger size
    const angle = ((modelId - 1) / length) * Math.PI * 2;

    modelImported.position.set(
      radius * Math.cos(angle),
      -0.32, // Vertical offset
      phone ? radius * Math.sin(angle) : radius * Math.sin(angle), // Horizontal
    );
    modelImported.rotation.y = -angle; // Face outward
    modelImported.scale.set(0.3, 0.3, 0.3);
  };
  return (
    <>
      <Gltf src={hangerPath} ref={clothingHangerRef} />
      <ItemsModels
        handleModel={handleModel}
        setLoading={setLoading}
        hangerType={hangerType}
      />
    </>
  );
}

ClothingHanger.propTypes = {
  hangerPath: PropTypes.string,
  hangerId: PropTypes.number,
  hangerType: PropTypes.string,
  setLoading: PropTypes.func,
};

export default ClothingHanger;
