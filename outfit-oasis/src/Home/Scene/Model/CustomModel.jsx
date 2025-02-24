import { Gltf } from "@react-three/drei";
import { useRef, useEffect } from "react";
import Hanger from "./Hanger";
import { backend_url } from "../../../Helpers/helpers";
import PropTypes from "prop-types";

function CustomModel({ modelPath, handleModel, modelId, length }) {
  const modelRef = useRef();
  useEffect(() => {
    handleModel(modelRef.current, modelId, length);
  }, [handleModel, length, modelId]);

  const handleHanger = (hanger) => {
    modelRef.current.children[0].add(hanger);
    hanger.position.y = 0.1;
    hanger.position.z = -0.1;
    hanger.scale.set(0.5, 0.79, 0.5);
  };
  return (
    <>
      <Hanger
        path={`${backend_url}/assets/models/1738993394104.glb`}
        handleHanger={handleHanger}
      />
      <Gltf src={modelPath} ref={modelRef} />
    </>
  );
}

CustomModel.propTypes = {
  modelPath: PropTypes.string,
  handleModel: PropTypes.func,
  modelId: PropTypes.number,
  length: PropTypes.number,
};

export default CustomModel;
