import { useState, useEffect } from "react";
import CatalogCard from "./CatalogCard";
import { backend_url } from "../Helpers/helpers";
import PropTypes from "prop-types";

function CatalogMain({ setLoading = () => {}, type = "tops" }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading((previousLoading) => ({ ...previousLoading, main: true }));
        const response = await fetch(`${backend_url}/api/items/${type}`);
        const data = await response.json();
        setItems(data);
        setLoading((previousLoading) => ({ ...previousLoading, main: false }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [type, setLoading]);

  return (
    <>
      {items.map((item, index) => (
        <CatalogCard
          key={index}
          name={item.name}
          description={item.description}
          price={item.price}
          id={item._id}
          colors={item.colors}
        />
      ))}
    </>
  );
}

CatalogMain.propTypes = {
  setLoading: PropTypes.func,
  type: PropTypes.string,
};

export default CatalogMain;
