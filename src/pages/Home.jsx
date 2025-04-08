import React, { useContext } from "react";
import Header from "../components/Header";
import SpecialutyMenu from "../components/SpecialutyMenu";
import TopDoctors from "../components/topDoctors";
import RegisterBanner from "../components/RegisterBanner";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { token } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <SpecialutyMenu />
      <TopDoctors />

      {!token && <RegisterBanner />}

      
    </div>
  );
};

export default Home;
