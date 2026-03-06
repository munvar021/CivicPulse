import React from "react";
import RegisterForm from "./registerForm";
import AccessGate from "../../../components/AccessGate/accessGate";

const SuperAdminRegister = () => {
  return (
    <AccessGate redirectPath="/login">
      <RegisterForm
        title="System Registration"
        role="superAdmin"
        navigateTo="/superadmin/dashboard"
        loginPath="/sys-admin-portal-x7k9m"
      />
    </AccessGate>
  );
};

export default SuperAdminRegister;
