import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashbord from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import DeliveryOrganization from "./pages/deliveryorganization/DeliveryOrganization";
import DeliveryPerson from "./pages/deliveryperson/DeliveryPerson";
import Order from "./pages/order/Orders";
import Pharmacies from "./pages/pharmacies/Pharmacies";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import SignIn from "./pages/signIn/SignIn";
import Users from "./pages/user/Users";
import SingleUser from "./pages/user/SingleUser";
import Pharmacists from "./pages/pharmacist/Pharmacists";
import SinglePharmacist from "./pages/pharmacist/SinglePharmacist";
import PrescriptionReaders from "./pages/pr/PrescriptionReaders";
import SinglePr from "./pages/pr/SinglePr";
import SingleDeliveryOrg from "./pages/deliveryorganization/SingleDeliveryOrg";
import SingleDeliveryPerson from "./pages/deliveryperson/SingleDeliveryPerson";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            {/* Protected Routes */}
            <Route element={<ProtectedRoute roles={["ayurvaadmin"]} />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashbord />} />
                <Route path="/users" element={<Users />} />
                <Route path="/user/:id" element={<SingleUser />} />
                <Route path="/pharmacists" element={<Pharmacists />} />
                <Route path="/pharmacist/:id" element={<SinglePharmacist />} />
                <Route path="/prs" element={<PrescriptionReaders />} />
                <Route path="/pr/:id" element={<SinglePr />} />
                <Route
                  path="/delivery-orgs"
                  element={<DeliveryOrganization />}
                />
                <Route
                  path="/delivery-org/:id"
                  element={<SingleDeliveryOrg />}
                />
                <Route path="/delivery-persons" element={<DeliveryPerson />} />
                <Route
                  path="/delivery-person/:id"
                  element={<SingleDeliveryPerson />}
                />

                <Route
                  path="/deliveryOrganization"
                  element={<DeliveryOrganization />}
                />
                <Route path="/pharmacies" element={<Pharmacies />} />
                <Route path="/deliveryPersons" element={<DeliveryPerson />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/pharmacies" element={<Pharmacies />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
