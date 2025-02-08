import TopsColor from "./TopsColor";
import TopsController from "./TopController";

function TopsCard({
  name = "Essential Comfort Tee",
  description = "good",
  price = 2,
  id = 0,
  colors = ["black"],
  handleAddToCard = () => {},
}) {
  const phone = window.innerWidth < 700;
  return (
    <section className="w-full max-w-[1300px] mx-auto flex mt-[20%] border-x-0  p-6 lg:mt-16 h-[90vh] flex-col-reverse items-center lg:h-[90vh] lg:p-0 lg:mb-0 lg:justify-between lg:items-center lg:flex-row">
      <div className="h-auto flex flex-col items-center justify-end max-w-[90%] lg:w-[40%] p-5 gap-2 min-h-[50%] lg:min-h-max">
        <h2 className="text-l lg:text-2xl">{name}</h2>
        <p className="text-sm text-[#878787] lg:text-sm">{description}</p>
        <span className="mr-auto mt-4 text-xl">{price}$</span>
        <button
          className="bg-white text-black py-3 px-10 rounded-sm w-[100%]"
          onClick={handleAddToCard}
        >
          Add to cart
        </button>
      </div>
      {!phone ? <TopsController itemId={id}/> : null}
      {colors.length > 1 ? (
        <div className=" mx-auto w-[90%] h-10 flex items-center justify-center gap-5 lg:flex-col lg:h-auto lg:left-auto lg:w-20 lg:top-[41%] lg:right-10 lg:mx-0">
          {colors.map((color, index) => (
            <TopsColor key={index} color={color} />
          ))}
        </div>
      ) : null}

      {phone ? <TopsController itemId={id}/> : null}
    </section>
  );
}

export default TopsCard;
