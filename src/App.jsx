import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashbord from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import DeliveryOrganization from "./pages/deliveryorganization/DeliveryOrganization";
import DeliveryPerson from "./pages/deliveryperson/DeliveryPerson";
import Order from "./pages/order/Orders";
import Pharmacies from "./pages/pharmacies/Pharmacies";
import ProductList from "./pages/products/ProductList";
import SingleProduct from "./pages/products/SingleProduct";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashbord />} />
            <Route
              path="/deliveryOrganization"
              element={<DeliveryOrganization />}
            />
            <Route path="/deliveryPersons" element={<DeliveryPerson />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/pharmacies" element={<Pharmacies />} />
            <Route path="/products" element={<ProductList />} />
            <Route
              path="/products/singleProduct/:id"
              element={<SingleProduct />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
