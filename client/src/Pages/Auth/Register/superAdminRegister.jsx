import React from "react";
import RegisterForm from "./registerForm";

const SuperAdminRegister = () => {
  return (
    <RegisterForm
      title="SuperAdmin Registration"
      role="superAdmin"
      navigateTo="/superadmin/login"
      loginPath="/superadmin/login"
    />
  );
};

export default SuperAdminRegister;
