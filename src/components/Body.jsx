import Restaurantcards from "./Restaurantcards.jsx";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer.jsx";
import { Link } from "react-router-dom";
import { REST_API } from "../utils/constants.js";
import useOnlineStatus from "../utils/useOnlineStatus.jsx";

const Body = () => {
  const [ListofRestaurant, setListofRestaurant] = useState([]);
  const [FilteredRestaurant, setFilteredRestaurant] = useState([]);
  const [SearchText, setSearchText] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(REST_API);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      
      const json = await response.json();
      console.log("API Response Data:", json?.data);

      const restaurantCard = json?.data?.cards.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      if (!restaurantCard) throw new Error("No restaurant card found in the API response.");

      const restaurants = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      if (!restaurants.length) throw new Error("No restaurants found in the API response.");

      setListofRestaurant(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) return <h1 className="justify-center text-center">You are offline</h1>;

  if (error) {
    return (
      <h1 className="justify-center text-center text-red-500">
        Error: {error}. Please try refreshing the page.
      </h1>
    );
  }

  if (ListofRestaurant.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="w-screen min-h-screen bg-slate-400 rounded-xl m-0.5 my-2 overflow-hidden">
  <div className="mt-2.5">
    <div className="flex justify-center m-1.5 p-3">
      <input
        type="text"
        className="mt-3 h-10 w-96 rounded-full text-base indent-3.5 outline-none focus:border-indigo-500 focus:ring-indigo-400 transition-colors duration-200 ease-in-out focus:ring-2"
        value={SearchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        className="bg-yellow-100 hover:bg-yellow-200 mx-3 mt-3 h-10 w-28 md:h-9 md:w-20 rounded-full hover:scale-105 active:scale-95 focus:outline-none"
        onClick={() => {
          const filteredRest = ListofRestaurant.filter((res) =>
            res.info.name.toLowerCase().includes(SearchText.toLowerCase())
          );
          setFilteredRestaurant(filteredRest);
          setSearchText("");
        }}
      >
        Search
      </button>
      <button
        className="hidden md:inline-block md:bg-yellow-100 hover:bg-yellow-200 mt-3 mx-3 h-9 w-48 rounded-full hover:scale-105 active:scale-95 focus:outline-none"
        onClick={() => {
          const filteredList = ListofRestaurant.filter(
            (res) => res.info.avgRating > 4.3
          );
          setFilteredRestaurant(filteredList);
        }}
      >
        Top Rated Restaurant
      </button>
    </div>

    {/* Grid Layout with background color wrapping */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center my-4 md:my-6 ">
      {FilteredRestaurant.map((restaurant) => (
        <Link
          className="rest-detail"
          key={restaurant.info.id}
          to={`/home/restaurant/${restaurant.info.id}`}
        >
          <Restaurantcards resData={restaurant} />
        </Link>
      ))}
    </div>
  </div>
</div>


  );
};

export default Body;
