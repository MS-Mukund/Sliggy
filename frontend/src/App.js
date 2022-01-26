import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Navbar from "./components/templates/Navbar";
import NavbarB from "./components/templates/NavbarB";
import Profile from "./components/users/Profile";
import Login from "./components/common/login";
import WhoAreYou from "./components/common/WhoAreYou";

import Buyer_reg from "./components/common/buyer_reg";
import Vendor_reg from "./components/common/vendor_reg";

localStorage.setItem("Isbuyer", -1);

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
          <Route path="/vendor/users" element={<UsersList />} />
          <Route path="/vendor/profile" element={<Profile />} />
        </Route>

        {/* // buyer's layout and dashboard */}
        <Route path="/buyer" element={<LayoutB />}>
          <Route path="/buyer" element={<Home />} />
          <Route path="/buyer/users" element={<UsersList />} />
          <Route path="/buyer/profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
