import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import AllCategories from "../pages/AllCategories";
import AdminHome from "../pages/AdminHome";
import { Cashier } from "../pages/Cashier";
import CashierHome from "../pages/CashierHome";
import Checkout from "../pages/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      
      {
            path: "",
            element: <Login />
        },{

          path: "login",
          element: <Home />
        },
        {
          path: "admin",
          element: <Admin />,
          children: [
            {
              index: true, // Default route for Admin
              element: <AdminHome />
            },{
              path: "home",
              element: <AdminHome />
            },{

              path: "all-users",
              element: <AllUsers />
            },{

              path: "all-products",
              element: <AllProducts />
            },{
              path: "category",
              element: <AllCategories/>
            }
          ]
        },{
          path: "cashier",
          element: <Cashier />,
          children: [
            {
              index: true, 
              element: <CashierHome />
            },{
              path: "cashierhome",
              element: <CashierHome />
            },{
              path: "category",
              element: <AllCategories/>
            },{
              path: "checkout",
              element: <Checkout/>
            }
          ]
        }

    ]
  }
])

export default router;