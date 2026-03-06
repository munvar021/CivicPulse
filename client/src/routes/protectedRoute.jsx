import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loaders/loader";

const ProtectedRoute = ({ children, roles }) => {
  const { user, checkingAuth } = useSelector((state) => state.auth);

  if (checkingAuth) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader size="large" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    const roleRedirects = {
      citizen: "/dashboard",
      officer: "/officer/dashboard",
      admin: "/admin/dashboard",
      superAdmin: "/superadmin/dashboard",
    };
    return <Navigate to={roleRedirects[user.role] || "/"} />;
  }

  return children;
};

export default ProtectedRoute;
