import { useEffect, useRef } from "react"

function Lights() {

    const directionalLightRef = useRef()

    
    return (
        <>
            <directionalLight intensity={7} castShadow position={[4, 3, 1]} ref={directionalLightRef}/>
            {/* <pointLight intensity={10} position={[0, -10, 0]}/> */}
            <directionalLight intensity={5} castShadow position={[-5, 1, 3]}/>
            <ambientLight intensity={2} />
        </>
    )
}

export default Lights