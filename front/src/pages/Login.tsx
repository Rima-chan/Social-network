import React from "react";
import Layout from "../components/UI/Layout";
import LoginCard from "../components/Login";

const Login: React.FC = () => {
  return (
    <Layout>
      <LoginCard showLogin />
    </Layout>
  );
};

export default Login;
