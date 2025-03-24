import React, { useContext } from "react";
import Header from "../components/Header";
import SpecialutyMenu from "../components/SpecialutyMenu";
import TopDoctors from "../components/topDoctors";
import RegisterBanner from "../components/RegisterBanner";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext"; 

const Home = () => {
  const { token } = useContext(AuthContext); 

  return (
    <div>
      <Header />
      <SpecialutyMenu />
      <TopDoctors />

      {/* Показывать только если НЕ авторизован */}
      {!token && <RegisterBanner />}

      <Footer />
    </div>
  );
};

export default Home;
