import { useState, useEffect } from "react"
import TopsCard from "./TopsCard"


function TopsMain() {
    const [items, setItems] = useState([]);
    
    const fetchItems = async () => {
       try {
         const response = await fetch("http://localhost:8080/api/items/tops");
         const data = await response.json();
         console.log(data)
         setItems(data);
       } catch (error) {
         console.log(error);
       }
    }


    useEffect(() => {
        fetchItems();
    }, []);
    
    return (
        <>
          {items.map((item, index) => (
            <TopsCard
              key={index}
              name={item.name}
              description={item.description}
              price={item.price}
              id={item._id}
              colors={item.colors}
            />
          ))}
        </>
    )
}

export default TopsMain