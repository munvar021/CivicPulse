import React from "react";
import LoginForm from "./loginForm";

const AdminLogin = () => {
  return (
    <LoginForm
      title="Department Admin Login"
      role="admin"
      navigateTo="/admin/dashboard"
    />
  );
};

export default AdminLogin;
