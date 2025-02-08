import { Gltf } from "@react-three/drei"
import { useEffect, useRef } from "react"
import gsap from "gsap"
function CatalogModel({ modelId, modelPath, order }) {

    const phone = window.innerWidth < 850;
    const modelRef = useRef()

    const handlePosition = () => {
        console.log( modelId , "model")
        return {
            x: phone ? 0 : 2,
            y: phone ? 0 : -order * 5.5,
            z: phone ? 0 : 0
        }
    }
    const handleModel = () => {
        const {x, y, z} = handlePosition()
        modelRef.current.position.set(x, y, z)

    }


     useEffect(() => {
        handleModel()
        const handleDragging = (event) => {
            const {deltaX, deltaY} = event.detail
            console.log(deltaX, deltaY)

            const rotationFactor = phone ? 0.03 : 0.03;
            
            // Use deltaX for more natural rotation
            const rotationAmount = deltaX * rotationFactor;

            gsap.to(modelRef.current.rotation, {
                y: modelRef.current.rotation.y + rotationAmount,
                duration: 0.1, // Shorter duration for more responsive feel
                ease: "power1.out" // Smoother easing
            });
        };

        
        window.addEventListener(`draggingTops${modelId}`, handleDragging);

        return () => {
            window.removeEventListener(`draggingTops${modelId}`, handleDragging)
        };
    }, [phone, modelId, order])

   
    return (
        <>
              <Gltf src={modelPath} ref={modelRef}/>
              <directionalLight position={[handlePosition().x, handlePosition().y, handlePosition().z + 5]} intensity={5} />
        </>
      
    )
}

export default CatalogModel