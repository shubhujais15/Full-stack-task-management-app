import Restaurantcards from "./Restaurantcards.jsx"
import {useEffect, useState} from "react"
import Shimmer from "./Shimmer.jsx";
import { Link } from "react-router-dom";
import { REST_API } from "../utils/constants.js";
import useOnlineStatus from "../utils/useOnlineStatus.jsx"

const Body = () => {

  const [ListofRestaurant , setListofRestaurant] = useState([]);

  const [FilteredRestaurant , setFilteredRestaurant] = useState([]);

 
  let [SearchText , setSearchText] = useState("");

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async ()=>{
    const data = await fetch(REST_API);
    const json = await data.json();
    setListofRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
   
  }  

    const onlineStatus = useOnlineStatus();
    if(onlineStatus === false) return <h1 className="justify-center text-center">U are offline</h1>


  if(ListofRestaurant.length === 0){
    return <Shimmer />
  }

  
  return(
    <div className="w-screen bg-slate-400 m-0.5 rounded-xl">
    <div  className="mt-2.5 ">
      <div className="flex justify-center m-1.5 p-3">
        <input type="text" className=" mt-3 h-10 w-96 rounded-full text-base indent-3.5 outline-none focus:border-indigo-500 focus:ring-indigo-400 transition-colors duration-200 ease-in-out focus:ring-2" value={SearchText} 
        onChange={(e)=>{
          setSearchText(e.target.value);
        }}></input>


        <button className="bg-yellow-100 hover:bg-yellow-200 mx-3 mt-3 h-10 w-28 md:h-9 md:w-20 rounded-full hover:scale-105 active:scale-95 focus:outline-none" 
        onClick={()=>{
          const filteredRest = ListofRestaurant.filter(
            (res) => res.info.name.toLowerCase().includes(SearchText.toLowerCase())
          )
          setFilteredRestaurant(filteredRest);
          setSearchText("")
          
        }}>
          Search</button>

        <button className="hidden md:inline-block md: bg-yellow-100 hover:bg-yellow-200 mt-3 mx-3 h-9 w-48 rounded-full hover:scale-105 active:scale-95 focus:outline-none" 
        onClick={() => {
          const filteredList = ListofRestaurant.filter(
            (res) => res.info.avgRating > 4.3
          ); 
          setFilteredRestaurant(filteredList);
        }}>
          Top Rated Restaurant
        </button>
      </div>
      <div className="flex flex-wrap my-4 md:my-6  md:ml-12">
        {FilteredRestaurant.map((restaurant) => (
          <Link 
          className="rest-detail"
          key={restaurant.info.id}
          to={"/home/restaurant/"+ restaurant.info.id}>
           <Restaurantcards resData={restaurant} />
          </Link>
        )
        )}
      </div>
    </div>
    </div>
  );
 };

  export default Body;