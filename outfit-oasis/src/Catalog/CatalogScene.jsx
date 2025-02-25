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
  const viewportHeightRef = useRef(window.innerHeight);

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

    // Get initial viewport height
    viewportHeightRef.current = window.innerHeight;

    const handleResize = () => {
      // Update stored viewport height
      viewportHeightRef.current = window.innerHeight;
      // Recalculate position based on current scroll
      updateCameraPosition(scrollRef.current);
    };

    const updateCameraPosition = (scrollY) => {
      // Store the scroll position
      scrollRef.current = scrollY;
      // Use the stored viewport height for calculations
      const scrollPosition = scrollY / viewportHeightRef.current;
      threeWorld.camera.position.y = phone
        ? -7 * scrollPosition
        : -5.5 * scrollPosition;
    };

    const handleScroll = () => {
      updateCameraPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [type, phone, threeWorld.camera.position]);

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
