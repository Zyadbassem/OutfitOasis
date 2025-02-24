import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomModel from "./CustomModel";
import { backend_url } from "../../../Helpers/helpers";
function ItemsModels({
  handleModel = () => {},
  setLoading = () => {},
  hangerType = "tops",
}) {
  const [modelPaths, setModelPaths] = useState([]);

  useEffect(() => {
    const fetchModelPaths = async () => {
      try {
        const response = await fetch(`${backend_url}/api/items/${hangerType}`);
        const data = await response.json();
        const paths = data.map((item) => item.modelPath);
        setModelPaths(paths);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    fetchModelPaths();
  }, [hangerType, setLoading]);

  return (
    <group>
      {modelPaths.map((modelPath, index) => (
        <CustomModel
          key={index}
          modelPath={`${backend_url}${modelPath}`} // Use modelPath directly
          handleModel={handleModel}
          modelId={index + 1}
          length={modelPaths.length}
        />
      ))}
    </group>
  );
}

ItemsModels.propTypes = {
  handleModel: PropTypes.func,
  setLoading: PropTypes.func,
  hangerType: PropTypes.string,
};

export default ItemsModels;
