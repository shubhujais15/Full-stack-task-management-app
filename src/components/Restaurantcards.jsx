const Restaurantcards = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, locality, avgRating } = resData?.info || {};

  return (
    <div className="w-[200px] h-[300px] mx-4 my-4 p-4 rounded-lg bg-slate-50 shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105">
      <img
        alt={name || "Restaurant"}
        className="w-full h-[120px] object-cover rounded-md mb-4"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
      />
      <h5 className="text-base font-bold truncate">{name || "Unknown Restaurant"}</h5>
      <p className="text-sm text-gray-600 truncate">{cuisines?.join(", ") || "No cuisines available"}</p>
      <p className="text-sm text-gray-600">{locality || "No locality available"}</p>
      <p className="text-sm font-semibold text-green-700">{avgRating ? `⭐ ${avgRating}` : "No rating"}</p>
    </div>
  );
};

export default Restaurantcards;
