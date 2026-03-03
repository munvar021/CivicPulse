import React from "react";
import {
  faFileAlt,
  faCheckCircle,
  faHourglassHalf,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import ProfileLayout from "../../../components/Layouts/ProfileLayout/profileLayout";
import citizenService from "../../../services/citizenService";
import { profileFields, statsConfig, navigationButtons } from "./profileConfig";

const Profile = () => {
  const fetchProfile = async () => {
    const response = await citizenService.getCitizenProfile();
    return response.data;
  };

  const fetchStats = async () => {
    const response = await citizenService.getCitizenDashboardData();
    return response.data.stats;
  };

  const updateProfile = async (data) => {
    const response = await citizenService.updateCitizenProfile(data);
    return response.data;
  };

  return (
    <ProfileLayout
      title="My Profile"
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
