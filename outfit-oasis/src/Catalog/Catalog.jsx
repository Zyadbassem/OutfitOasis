import LoadingHelper from "../Helpers/LoadingHelper";
import { useState } from "react";
import PropTypes from "prop-types";
import CatalogMain from "./CatalogMain";
import CatalogWorld from "./CatalogWorld";

function Catalog({ type = "tops" }) {
  const [loading, setLoading] = useState({
    main: true,
    world: true,
  });
  return (
    <>
      <CatalogMain setLoading={setLoading} type={type} />
      <CatalogWorld setLoading={setLoading} type={type} />
      {loading.main || loading.world ? <LoadingHelper /> : null}
    </>
  );
}

Catalog.propTypes = {
  type: PropTypes.string,
};

export default Catalog;
