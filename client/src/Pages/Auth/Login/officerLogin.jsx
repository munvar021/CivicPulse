import React from "react";
import LoginForm from "./loginForm";

const OfficerLogin = () => {
  return (
    <LoginForm
      title="Field Officer Login"
      role="officer"
      navigateTo="/officer/dashboard"
    />
  );
};

export default OfficerLogin;
