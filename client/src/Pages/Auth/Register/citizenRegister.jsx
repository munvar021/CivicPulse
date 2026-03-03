import React from "react";
import RegisterForm from "./registerForm";

const CitizenRegister = () => {
  return (
    <RegisterForm
      title="Citizen Registration"
      role="citizen"
      navigateTo="/dashboard"
      loginPath="/citizen/login"
    />
  );
};

export default CitizenRegister;
