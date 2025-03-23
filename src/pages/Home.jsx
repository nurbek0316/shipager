import React from "react";
import Header from "../components/Header";
import SpecialutyMenu from "../components/SpecialutyMenu";
import TopDoctors from "../components/topDoctors";

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialutyMenu />
      <TopDoctors />
    </div>
  );
};

export default Home;
