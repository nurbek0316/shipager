import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCards from "./pages/MyCards";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Subscription from "./pages/Subscription";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"; 
import PaymentPage from "./pages/PaymentPage";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%] flex flex-col min-h-screen">
      <NavBar />

      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-cards" element={<MyCards />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/subscription" element={<Subscription />} /> 
          <Route path="/payment" element={<PaymentPage />} /> 
          <Route path="/appoinment/:docId" element={<Appointment />} />
        </Routes>
      </div>

      
      <Footer />
    </div>
  );
};

export default App;
