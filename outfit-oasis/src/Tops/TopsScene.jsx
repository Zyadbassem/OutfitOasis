import { useEffect, useState } from "react"
import CatalogModel from "./CatalogModel"
import { useThree } from "@react-three/fiber"

function TopsScene() {
    const [ models, setModels ] = useState([])

    const fetchModels = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/modelpaths")
            const data = await response.json()
            setModels(data)
        } catch (error) {
            console.error("Error fetching models:", error)
        }
    }

    const threeWorld = useThree()
    const phone = window.innerWidth < 850
    useEffect(() => {
        fetchModels()

        const handleScroll = (e) => {
            const scrollPosition = window.scrollY / window.innerHeight
            threeWorld.camera.position.y =  phone ? -7 * scrollPosition : -5.5 * scrollPosition
            
        }
       window.addEventListener("scroll", (e) => handleScroll(e))

       return window.removeEventListener("scroll", (e) => handleScroll(e))

    }, [])

   

    return (
        <>
            {models.map((model, index) => <CatalogModel key={index} modelPath={`http://localhost:8080${model.modelPath}`} modelId={model.id} length={models.length} order={index}/>)}
        </>
    )
}

export default TopsScene