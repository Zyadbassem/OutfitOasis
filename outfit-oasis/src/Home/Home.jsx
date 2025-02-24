import Welcome from "./Welcome/Welcome";
import Items from "./Items/Items";
import World from "./Scene/World";
import { useState } from "react";
import LoadingHelper from "../Helpers/LoadingHelper";
import Promotion from "./Promotion/Promotion";
import NewCollection from "./Promotion/NewCollection";
import ChooseUs from "./Promotion/ChooseUs";

function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Welcome id="welcome-sec" loadingSetter={setLoading} />
      <Items
        items="Tops"
        link="/tops"
        id="first-items"
        modelId={1}
        collectionName="TopTrendz"
        promotion="Upgrade your wardrobe with TopTrendz, the ultimate destination for trendy and versatile tops. From chic casual tees to elegant blouses, we’ve got the perfect pieces to match your vibe. "
        loadingSetter={setLoading}
      />
      <Items
        items="Trousers"
        link="/trousers"
        id="second-items"
        collectionName="Pantology"
        promotion="Step up your fashion game with Pantology, where every pair of pants tells a story of style, comfort, and confidence. From sleek tailored trousers to laid-back joggers and trendy wide-leg fits, our collection has the perfect pair for every occasion."
        modelId={2}
        loadingSetter={setLoading}
      />
      <Promotion />
      <NewCollection />
      <ChooseUs />
      <World setLoading={setLoading} />
      {loading ? <LoadingHelper /> : null}
    </>
  );
}

export default Home;
