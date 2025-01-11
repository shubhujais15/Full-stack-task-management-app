import React from 'react'
import Body from "./Body.jsx"
import About from "./About.jsx"
import Contact from  "./Contact.jsx"
import Error from "./Error.jsx";
import Restaurantmenu from "./Restaurantmenu.jsx";
import { createBrowserRouter , RouterProvider ,Outlet} from  'react-router-dom'
import Cart from "./Cart.jsx";
import Login from "./Login.jsx";
import Header from './Header.jsx';

const Layout = () => (
    <>
        <Header />
        <Outlet />
    </>
)


    const appRouter = createBrowserRouter([
        {
          path: "/",
          element: <Login />,
        },
        { path: "/home",                //First it loads the FinalApp & when there is outlet then it replace the the children with it & loads it
          element: <Layout/>,
          children:[
            { path: "",            //if my path is / then load my element <Body />
              element: <Body/> 
            },
            { path: "about",            //if my path is about then load my element <About/>
              element: <About/> 
            },
            { path: "contact",            //if my path is /contact then load my element <Contact/>
              element: <Contact/> 
          },
          {
            path: "restaurant/:resid",
            element: <Restaurantmenu/>
          },
          {
            path: "cart",
            element: <Cart/>
          }
          ],
          errorElement: <Error/>
        },
        
      ]);
const Routing = () => {
  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Routing;
