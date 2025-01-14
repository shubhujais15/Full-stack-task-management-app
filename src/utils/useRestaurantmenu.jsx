import { MENU_API } from "./constants";
import { useState, useEffect } from "react";

const useRestaurantmenu = (resid) => {
    const [RestMenu, setRestMenu] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch(MENU_API + resid);
                const json = await response.json();
                setRestMenu(json.data);
                console.log("Full Restaurant Menu Data:", json.data); // Debugging log
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setRestMenu("error");
            }
        };

        fetchMenu();
    }, [resid]);

    return RestMenu;
};

export default useRestaurantmenu;
