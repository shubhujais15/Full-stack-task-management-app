import React from "react";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.jsx";
import Routing from "./components/Routing.jsx";

const App = () => {
    return (
        <Provider store={appStore}>
            <Routing />
        </Provider>
    );
};

export default App;
