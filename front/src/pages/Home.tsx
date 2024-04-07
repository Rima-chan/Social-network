import React from "react";
import Aside from "../components/Aside";
import Post from "../components/Post";
import Layout from "../components/UI/Layout";

const Home: React.FC = () => {
  return (
    <Layout hideFooter hideHeader padding="py-10">
      <div className="flex bg-slate-50 w-11/12 h-full rounded-md shadow-md">
        <Aside />
        <Post />
      </div>
    </Layout>
  );
};

export default Home;
