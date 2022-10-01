import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { selectUserLogInfos } from "../../utils/selectors";
import React from "react";
import AsideProfil from "../../components/AsideProfil";

const AllPostsView = () => {
  const { username, avatar, isAdmin } = useSelector(selectUserLogInfos);
  console.log("avatar", avatar);
  return (
    <>
      <div className="flex flex-col items-center h-screen bg-red-50">
        <Header />
        <main className="flex flex-col flex-grow shadow-md w-3/4 rounded-lg bg-white">
          <AsideProfil username={username} avatar={avatar} isAdmin={isAdmin} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AllPostsView;
