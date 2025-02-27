import { useEffect, useState, useRef } from "react";
import CatalogModel from "./CatalogModel";
import { useThree } from "@react-three/fiber";
import { backend_url } from "../Helpers/helpers";
import PropTypes from "prop-types";

function CatalogScene({ setLoading, type }) {
  const [models, setModels] = useState([]);
  const threeWorld = useThree();
  const phone = window.innerWidth < 850;
  const scrollRef = useRef(0);
  const viewportHeightRef = window.visualViewport.height;

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

  useEffect(() => {
    fetchModels();
    const updateCameraPosition = () => {
      // Store the scroll position
      scrollRef.current = scrollY;
      // Use the stored viewport height for calculations
      const scrollPosition = scrollY / viewportHeightRef;
      threeWorld.camera.position.y = phone
        ? -7 * scrollPosition
        : -5.5 * scrollPosition;
    };

    const handleScroll = () => {
      updateCameraPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [type, phone, threeWorld.camera.position]);

  return (
    <>
      {models.map((model, index) => (
        <CatalogModel
          key={index}
          modelPath={`${backend_url}${model.modelPath}`}
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
