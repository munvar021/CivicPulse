import React from "react";
import { useAuth } from "../../context/authContext";
import Header from "./header";
import {
  faPlus,
  faClipboardList,
  faMapMarkerAlt,
  faUser,
  faTasks,
  faHistory,
  faExclamationTriangle,
  faChartBar,
  faMapMarkedAlt,
  faUsers,
  faBuilding,
  faDesktop,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const RoleHeader = () => {
  const { user } = useAuth();

  const getNavItems = () => {
    if (!user) return [];

    const baseItems = [];

    switch (user.role) {
      case "citizen":
        baseItems.push(
          { path: "/report-issue", label: "Report Issue", icon: faPlus },
          {
            path: "/my-complaints",
            label: "My Complaints",
            icon: faClipboardList,
          },
          {
            path: "/nearby-issues",
            label: "Nearby Issues",
            icon: faMapMarkerAlt,
          },
          { path: "/profile", label: "Profile", icon: faUser },
        );
        break;
      case "officer":
        baseItems.push(
          {
            path: "/officer/assigned-tasks",
            label: "Assigned Tasks",
            icon: faTasks,
          },
          {
            path: "/officer/work-history",
            label: "Work History",
            icon: faHistory,
          },
          { path: "/officer/profile", label: "Profile", icon: faUser },
        );
        break;
      case "admin":
        baseItems.push(
          {
            path: "/admin/complaints",
            label: "Complaints",
            icon: faClipboardList,
          },
          { path: "/admin/officers", label: "Officers", icon: faUsers },
          {
            path: "/admin/escalations",
            label: "Escalations",
            icon: faExclamationTriangle,
          },
          { path: "/admin/reports", label: "Reports", icon: faChartBar },
          { path: "/admin/profile", label: "Profile", icon: faUser },
        );
        break;
      case "superAdmin":
        baseItems.push(
          { path: "/superadmin/zones", label: "Zones", icon: faMapMarkedAlt },
          { path: "/superadmin/users", label: "Users", icon: faUsers },
          {
            path: "/superadmin/departments",
            label: "Departments",
            icon: faBuilding,
          },
          {
            path: "/superadmin/complaints",
            label: "Complaints",
            icon: faClipboardList,
          },
          {
            path: "/superadmin/monitoring",
            label: "Monitoring",
            icon: faDesktop,
          },
          { path: "/superadmin/reports", label: "Reports", icon: faChartBar },
          { path: "/superadmin/settings", label: "Settings", icon: faCog },
          { path: "/superadmin/profile", label: "Profile", icon: faUser },
        );
        break;
      default:
        break;
    }

    baseItems.push({ path: "/logout", label: "Logout", icon: faSignOutAlt });
    return baseItems;
  };

  return <Header navItems={getNavItems()} />;
};

export default RoleHeader;
