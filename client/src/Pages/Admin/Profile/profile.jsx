import React from "react";
import {
  faFileAlt,
  faCheckCircle,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import ProfileLayout from "../../../components/Layouts/ProfileLayout/profileLayout";
import adminService from "../../../services/adminService";
import { profileFields, statsConfig, navigationButtons } from "./profileConfig";

const Profile = () => {
  const fetchProfile = async () => {
    const data = await adminService.getAdminProfile();
    return {
      ...data,
      department: data.department ? data.department.name : "N/A",
      zone: data.zone ? data.zone.name : "N/A",
      createdAt: data.createdAt
        ? new Date(data.createdAt).toLocaleDateString("en-GB")
        : "N/A",
    };
  };

  const fetchStats = async () => {
    const data = await adminService.getAdminProfileStats();
    return data;
  };

  const updateProfile = async (data) => {
    const response = await adminService.updateAdminProfile(data);
    return {
      ...response,
      department: response.department ? response.department.name : "N/A",
      zone: response.zone ? response.zone.name : "N/A",
      createdAt: response.createdAt
        ? new Date(response.createdAt).toLocaleDateString("en-GB")
        : "N/A",
    };
  };

  return (
    <ProfileLayout
      title="Admin Profile"
      fetchProfile={fetchProfile}
      fetchStats={fetchStats}
      updateProfile={updateProfile}
      profileFields={profileFields}
      statsConfig={statsConfig}
      navigationButtons={navigationButtons}
    />
  );
};

export default Profile;
