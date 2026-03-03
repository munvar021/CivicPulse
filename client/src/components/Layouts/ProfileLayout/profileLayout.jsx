import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import toast from "../../../utils/toast";
import RoleHeader from "../../Headers/roleHeader";
import StatCard from "../../StatCard/statCard";
import Button from "../../Button/button";
import Loader from "../../Loaders/loader";
import ConfirmationModal from "../../ConfirmationModal/confirmationModal";
import EditProfileModal from "../../EditProfileModal/editProfileModal";
import { useAuth } from "../../../context/authContext";
import {
  PageContainer,
  ProfileCard,
  PageTitle,
  ProfileSection,
  ProfileInfo,
  InfoLabel,
  InfoValue,
  StatsGrid,
  HistorySection,
  HistoryTitle,
  ButtonContainer,
  NoDataMessage,
} from "./profileLayoutStyles";

const ProfileLayout = ({
  title,
  fetchProfile,
  fetchStats,
  updateProfile,
  profileFields,
  statsConfig,
  navigationButtons,
}) => {
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      if (authLoading) return;

      if (!user && !authLoading) {
        setLoading(false);
        navigate("/login");
        return;
      }

      if (user) {
        setLoading(true);
        try {
          const profileData = await fetchProfile();
          setProfile(profileData);

          if (fetchStats) {
            const statsData = await fetchStats();
            setStats(statsData);
          }
        } catch (err) {
          toast.error(
            err.response?.data?.message || "Failed to fetch profile data.",
          );
        } finally {
          setLoading(false);
        }
      }
    };

    loadProfileData();
  }, [user, authLoading, navigate, fetchProfile, fetchStats]);

  const handleUpdateProfile = async (data) => {
    if (!updateProfile) return;

    setIsUpdating(true);
    try {
      const updatedProfile = await updateProfile(data);
      setProfile(updatedProfile);
      setShowEditModal(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <>
        <RoleHeader />
        <PageContainer>
          <Loader size="large" text="Loading profile..." />
        </PageContainer>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <RoleHeader />
        <PageContainer>
          <NoDataMessage>Profile data not available.</NoDataMessage>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <RoleHeader />
      <PageContainer>
        <ProfileCard>
          <PageTitle>{title}</PageTitle>

          <ProfileSection>
            {profileFields.map((field) => (
              <ProfileInfo key={field.key}>
                <InfoLabel>{field.label}:</InfoLabel>
                <InfoValue>
                  {field.format
                    ? field.format(profile[field.key])
                    : profile[field.key] || "N/A"}
                </InfoValue>
              </ProfileInfo>
            ))}
          </ProfileSection>

          {stats && statsConfig && (
            <HistorySection>
              <HistoryTitle>{statsConfig.title}</HistoryTitle>
              {statsConfig.cards.length > 0 ? (
                <StatsGrid>
                  {statsConfig.cards.map((card) => (
                    <StatCard
                      key={card.key}
                      label={card.label}
                      value={stats[card.key] || 0}
                      icon={<FontAwesomeIcon icon={card.icon} />}
                      color={card.color}
                    />
                  ))}
                </StatsGrid>
              ) : (
                <NoDataMessage>No statistics available.</NoDataMessage>
              )}
            </HistorySection>
          )}

          <ButtonContainer>
            {updateProfile && (
              <Button onClick={() => setShowEditModal(true)}>
                <FontAwesomeIcon icon={faEdit} /> Edit Profile
              </Button>
            )}
            {navigationButtons?.map((btn) => (
              <Button
                key={btn.label}
                onClick={() => navigate(btn.path)}
                variant={btn.variant}
              >
                {btn.label}
              </Button>
            ))}
            <Button variant="danger" onClick={() => setShowLogoutModal(true)}>
              Logout
            </Button>
          </ButtonContainer>
        </ProfileCard>
      </PageContainer>

      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        type="logout"
      />

      {updateProfile && (
        <EditProfileModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateProfile}
          initialData={profile}
          isLoading={isUpdating}
        />
      )}
    </>
  );
};

export default ProfileLayout;
