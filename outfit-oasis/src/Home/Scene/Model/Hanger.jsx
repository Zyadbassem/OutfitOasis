import { useEffect, useRef } from "react";
import { Gltf } from "@react-three/drei";
import PropTypes from "prop-types";

function Hanger({ path, handleHanger = () => {} }) {
  const hangerRef = useRef();
  useEffect(() => {
    handleHanger(hangerRef.current);
  }, [handleHanger]);

  return <Gltf src={path} ref={hangerRef} />;
}

Hanger.propTypes = {
  path: PropTypes.string,
  handleHanger: PropTypes.func,
};

export default Hanger;
