import React from "react";
import { useAuth } from "../../context/authContext";
import Header from "./header";

const RoleHeader = () => {
  const { user } = useAuth();

  const getNavItems = () => {
    if (!user) return [];

    const baseItems = [];

    switch (user.role) {
      case "citizen":
        baseItems.push(
          { path: "/report-issue", label: "Report Issue" },
          { path: "/my-complaints", label: "My Complaints" },
          { path: "/nearby-issues", label: "Nearby Issues" },
          { path: "/profile", label: "Profile" },
        );
        break;
      case "officer":
        baseItems.push(
          { path: "/officer/assigned-tasks", label: "Assigned Tasks" },
          { path: "/officer/work-history", label: "Work History" },
          { path: "/officer/profile", label: "Profile" },
        );
        break;
      case "admin":
        baseItems.push(
          { path: "/admin/complaints", label: "Complaints" },
          { path: "/admin/officers", label: "Officers" },
          { path: "/admin/escalations", label: "Escalations" },
          { path: "/admin/reports", label: "Reports" },
          { path: "/admin/profile", label: "Profile" },
        );
        break;
      case "superAdmin":
        baseItems.push(
          { path: "/superadmin/zones", label: "Zones" },
          { path: "/superadmin/users", label: "Users" },
          { path: "/superadmin/departments", label: "Departments" },
          { path: "/superadmin/complaints", label: "Complaints" },
          { path: "/superadmin/monitoring", label: "Monitoring" },
          { path: "/superadmin/reports", label: "Reports" },
          { path: "/superadmin/settings", label: "Settings" },
          { path: "/superadmin/profile", label: "Profile" },
        );
        break;
      default:
        break;
    }

    baseItems.push({ path: "/logout", label: "Logout" });
    return baseItems;
  };

  return <Header navItems={getNavItems()} />;
};

export default RoleHeader;
