import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import FoodList from "./components/common/foodlist";
import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import HomeB from "./components/common/HomeB";
import Navbar from "./components/templates/Navbar";
import NavbarB from "./components/templates/NavbarB";
import Profile from "./components/users/Profile";
import Login from "./components/common/login";
import WhoAreYou from "./components/common/WhoAreYou";

import Buyer_reg from "./components/common/buyer_reg";
import Vendor_reg from "./components/common/vendor_reg";
import Food_reg from "./components/common/food_reg";

import Food_Prof from "./components/common/food_profile";
import Vend_prof from "./components/common/vprofile";
import Buy_prof from "./components/common/bprofile";

import MakeOrder from "./components/common/buyer_order";
import Food_ProfB from "./components/common/food_profileB";
import My_orders from "./components/common/my_orders";

import View_orders from "./components/common/view_orders";

localStorage.setItem("Isbuyer", -1);
localStorage.setItem("Email", "");

const Layout = () => {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
      </div>
    );
};

const LayoutB = () => {
    return (
      <div> 
        <NavbarB />
        <div className="container">
          <Outlet />
          </div>
      </div>
    );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* before anybody logs in */}
        <Route path="/" element={<Login />} />
        <Route path="Buyer_r" element={<Buyer_reg />} />
        <Route path="Vendor_r" element={<Vendor_reg />} />
        <Route path="whoareyou" element={<WhoAreYou />} />

         {/* vendor's layout and dashboard */}
        <Route path="/vendor" element={<Layout />}>
          <Route path="/vendor" element={<Home />} />
          <Route path="/vendor/Items" element={<FoodList />} />
          <Route path="/vendor/profile" element={<Vend_prof />} />
          <Route path="/vendor/add_item" element={<Food_reg />} />
          <Route path="/vendor/show" element={<Food_Prof />} />
          <Route path="/vendor/view_orders" element={<View_orders />} />
        </Route>

        {/* // buyer's layout and dashboard */}
        <Route path="/buyer" element={<LayoutB />}>
          <Route path="/buyer" element={<HomeB />} />
          <Route path="/buyer/users" element={<UsersList />} />
          <Route path="/buyer/profile" element={<Buy_prof />} />
          <Route path="/buyer/make_order" element={<MakeOrder />} />
          <Route path="/buyer/show" element={<Food_ProfB />} />
          <Route path="/buyer/my_orders" element={<My_orders />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
