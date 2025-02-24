import { useEffect, useState } from "react";
import CatalogModel from "./CatalogModel";
import { useThree } from "@react-three/fiber";
import { backend_url } from "../Helpers/helpers";
import PropTypes from "prop-types";

function CatalogScene({ setLoading, type }) {
  const [models, setModels] = useState([]);

  const fetchModels = async () => {
    try {
      setLoading((previousLoading) => ({ ...previousLoading, world: true }));
      const response = await fetch(`${backend_url}/api/items/${type}`);
      const data = await response.json();
      const modelNeeds = data.map((item) => {
        return { id: item._id, modelPath: item.modelPath };
      });
      setModels(modelNeeds);
      setLoading((previousLoading) => ({ ...previousLoading, world: false }));
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const threeWorld = useThree();
  const phone = window.innerWidth < 850;
  useEffect(() => {
    fetchModels();

    const handleScroll = () => {
      const scrollPosition = window.scrollY / window.innerHeight;
      threeWorld.camera.position.y = phone
        ? -7 * scrollPosition
        : -5.5 * scrollPosition;
    };
    window.addEventListener("scroll", (e) => handleScroll(e));

    return window.removeEventListener("scroll", (e) => handleScroll(e));
  }, [type]);

  return (
    <>
      {models.map((model, index) => (
        <CatalogModel
          key={index}
          modelPath={`http://localhost:8080${model.modelPath}`}
          modelId={model.id}
          length={models.length}
          order={index}
        />
      ))}
    </>
  );
}

CatalogScene.propTypes = {
  setLoading: PropTypes.func,
  type: PropTypes.string,
};

export default CatalogScene;
