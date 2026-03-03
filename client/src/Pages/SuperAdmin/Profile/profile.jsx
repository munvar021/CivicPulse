import React from "react";
import ProfileLayout from "../../../components/Layouts/ProfileLayout/profileLayout";
import superAdminService from "../../../services/superAdminService";
import { profileFields, navigationButtons } from "./profileConfig";

const Profile = () => {
  const fetchProfile = async () => {
    const response = await superAdminService.getSuperAdminProfile();
    return {
      ...response.data,
      joinedDate: response.data.createdAt
        ? new Date(response.data.createdAt).toLocaleDateString("en-GB")
        : "N/A",
      privileges: "Full System Access",
    };
  };

  const updateProfile = async (data) => {
    const response = await superAdminService.updateSuperAdminProfile(data);
    return {
      ...response.data,
      joinedDate: response.data.createdAt
        ? new Date(response.data.createdAt).toLocaleDateString("en-GB")
        : "N/A",
      privileges: "Full System Access",
    };
  };

  return (
    <ProfileLayout
      title="Super Admin Profile"
      fetchProfile={fetchProfile}
      updateProfile={updateProfile}
      profileFields={profileFields}
      navigationButtons={navigationButtons}
    />
  );
};

export default Profile;
