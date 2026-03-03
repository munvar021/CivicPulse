import React from "react";
import {
  faFileAlt,
  faCheckCircle,
  faHourglassHalf,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import ProfileLayout from "../../../components/Layouts/ProfileLayout/profileLayout";
import officerService from "../../../services/officerService";
import { profileFields, statsConfig, navigationButtons } from "./profileConfig";

const Profile = () => {
  const fetchProfile = async () => {
    const data = await officerService.getOfficerProfile();
    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      zone: data.zone,
      employeeId: data.employeeId,
      joinedDate: new Date(data.joinedDate).toLocaleDateString("en-GB"),
    };
  };

  const fetchStats = async () => {
    const data = await officerService.getOfficerProfile();
    return data.stats;
  };

  const updateProfile = async (data) => {
    const response = await officerService.updateOfficerProfile(data);
    return {
      name: response.name,
      email: response.email,
      phone: response.phone,
      zone: response.zone,
      employeeId: response.employeeId,
      joinedDate: new Date(response.joinedDate).toLocaleDateString("en-GB"),
    };
  };

  return (
    <ProfileLayout
      title="Officer Profile"
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
