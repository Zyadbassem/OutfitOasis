import { useEffect, useState } from "react";
import CustomModel from "./CustomModel";
function ItemsModels({ handleModel=()=>{} }) {
    const [modelPaths, setModelPaths] = useState([]);

    useEffect(() => {
        const fetchModelPaths = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/modelpaths");
                const data = await response.json();
                setModelPaths(data);
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };
        fetchModelPaths();
    }, []);

    return (
        <group>
            {modelPaths.map((model, index) => (
                <CustomModel key={index} modelPath={`http://localhost:8080${model.modelPath}`} handleModel={handleModel} modelId={index + 1} length={modelPaths.length}/>
            ))}
        </group>
    );
}

export default ItemsModels;