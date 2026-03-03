import React from "react";
import LoginForm from "./loginForm";

const CitizenLogin = () => {
  return (
    <LoginForm
      title="Citizen Login"
      role="citizen"
      navigateTo="/dashboard"
      showRegisterLink={true}
    />
  );
};

export default CitizenLogin;
