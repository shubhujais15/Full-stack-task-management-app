import ShimmerMenu from "./ShimmerMenu.jsx";
import { useParams } from "react-router-dom";
import useRestaurantmenu from "../utils/useRestaurantmenu.jsx";
import RestaurantCategory from "./RestaurantCategory.jsx";
import { useState } from "react";

const Restaurantmenu = () => {
    const [showIndex, setShowIndex] = useState(null);
    const { resid } = useParams();
    const RestMenu = useRestaurantmenu(resid);

    if (RestMenu === null) return <ShimmerMenu />;
    if (RestMenu === "error") {
        return <div className="text-center mt-10">Failed to load data. Please try again later.</div>;
    }

    // Extract restaurant info
    const { name, cuisines, costForTwo } = RestMenu?.cards?.[2]?.card?.card?.info || {};

    // Dynamically locate categories
    const groupedCard = RestMenu?.cards?.find((card) => card.groupedCard)?.groupedCard;
    const categories =
        groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
            (c) =>
                c.card?.["card"]?.["@type"] ===
                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) || [];

    console.log("Categories:", categories); // Debugging log

    return (
        <div className="text-center w-full">
            <h1 className="font-bold my-6 text-2xl">{name || "Restaurant"}</h1>
            <p className="font-semibold text-lg">
                {cuisines?.join(", ") || "Cuisines unavailable"} -- ₹{(costForTwo || 0) / 100}
            </p>
            <div>
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <RestaurantCategory
                            key={category?.card?.card?.title || index}
                            data={category?.card?.card}
                            showItems={index === showIndex}
                            setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
                        />
                    ))
                ) : (
                    <p className="text-center mt-6">Menu categories are currently unavailable.</p>
                )}
            </div>
        </div>
    );
};

export default Restaurantmenu;
