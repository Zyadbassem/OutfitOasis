import PromotionCard from "./PromotionCard";

function Promotion() {
  return (
    <div className="min-h-[90svh] mt-[100px] max-w-[1300px] mx-auto flex flex-col lg:flex-row items-center mb-[100px]">
      <h2 className="text-6xl/relaxed line text-center lg:max-w-[45%] lg:text-6xl/relaxed font-sans m-3">
        What People Say About Us !?
      </h2>
      <div className=" lg:flex lg:flex-wrap lg:items-center lg:justify-center">
        <PromotionCard
          quote="OutfitOasis: Where artistry meets timeless elegance."
          quoteSayer="Emma Carter"
          sayerProffission="A renowned jewelry designer specializing in modern, minimalist pieces"
        />
        <PromotionCard
          quote="OutfitOasis transforms every gemstone into a masterpiece."
          quoteSayer="Liam Benet"
          sayerProffission="A gemologist with 15 years of experience selecting the finest stones."
        />
        <PromotionCard
          quote="OutfitOasis is the ultimate destination for sophisticated style."
          quoteSayer="Sophi Hernandez"
          sayerProffission="A luxury brand consultant focusing on premium jewelry markets."
        />
        <PromotionCard
          quote="OutfitOasis showcases the finest in craftsmanship and beauty."
          quoteSayer="Ethan Colens"
          sayerProffission="A master goldsmith known for intricate, handcrafted designs."
        />
      </div>
    </div>
  );
}

export default Promotion;
