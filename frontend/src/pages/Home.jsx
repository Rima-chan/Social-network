import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { selectUserLogInfos } from "../utils/redux/selectors";
import React from "react";
import AsideProfil from "../components/AsideProfil";
import Posts from "../components/Posts";

const Home = () => {
  const { username, avatar, isAdmin } = useSelector(selectUserLogInfos);
  return (
    <>
      <div className="flex flex-col items-center h-screen bg-red-50">
        <Header />
        <main className="flex flex-grow shadow-md w-3/4 rounded-lg bg-white">
          <AsideProfil username={username} avatar={avatar} isAdmin={isAdmin} />
          <Posts />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
