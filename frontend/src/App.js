import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Login from "./components/common/login";
import WhoAreYou from "./components/common/WhoAreYou";

import Buyer_reg from "./components/common/buyer_reg";
import Vendor_reg from "./components/common/vendor_reg";
import { modalUnstyledClasses } from "@mui/material";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Buyer_r" element={<Buyer_reg />} />
        <Route path="Vendor_r" element={<Vendor_reg />} />
        <Route path="whoareyou" element={<WhoAreYou />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
