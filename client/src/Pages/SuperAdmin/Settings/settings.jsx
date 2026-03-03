import React, { useState, useEffect, useRef } from "react";
import FormPageLayout from "../../../components/Layouts/FormPageLayout/formPageLayout";
import Button from "../../../components/Button/button";
import Modal from "../../../components/Modal/modal";
import ConfirmationModal from "../../../components/ConfirmationModal/confirmationModal";
import superAdminService from "../../../services/superAdminService";
import {
  SettingsSection,
  SectionTitle,
  SettingCard,
  SettingLabel,
  SettingValue,
  EditButton,
  ConfigList,
  ConfigItem,
  ModalInput,
  ModalInputGroup,
  ModalLabel,
  CategoryActions,
  DeleteButton,
} from "./settingsStyles";
import toast from "../../../utils/toast";

const Settings = () => {
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [resolutionTimelines, setResolutionTimelines] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isTimelineModalOpen, setTimelineModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTimelines, setNewTimelines] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchSettings = async () => {
    try {
      const settingsRes = await superAdminService.getSettings();
      const categoriesRes = await superAdminService.getCategories();

      setResolutionTimelines(settingsRes.data.resolutionTimelines);
      setNewTimelines(settingsRes.data.resolutionTimelines);
      setStatuses(settingsRes.data.statuses);
      setPriorities(settingsRes.data.priorities);
      setCategories(categoriesRes.data);
    } catch (err) {
      setError(err.message || "Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const openCategoryModal = (category = null) => {
    setCurrentCategory(category);
    setNewCategoryName(category ? category.name : "");
    setCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setCategoryModalOpen(false);
    setCurrentCategory(null);
    setNewCategoryName("");
  };

  const handleSaveCategory = async () => {
    try {
      setIsSaving(true);
      if (currentCategory) {
        await superAdminService.updateCategory(
          currentCategory._id,
          newCategoryName,
        );
        toast.success("Category updated successfully");
      } else {
        await superAdminService.createCategory(newCategoryName);
        toast.success("Category created successfully");
      }
      fetchSettings();
      closeCategoryModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save category");
    } finally {
      setIsSaving(false);
    }
  };

  const openDeleteConfirmation = (id) => {
    setCategoryToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleDeleteCategory = async () => {
    try {
      setIsDeleting(true);
      await superAdminService.deleteCategory(categoryToDelete);
      toast.success("Category deleted successfully");
      fetchSettings();
      setIsConfirmModalOpen(false);
      setCategoryToDelete(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  const openTimelineModal = () => {
    setNewTimelines(resolutionTimelines);
    setTimelineModalOpen(true);
  };

  const closeTimelineModal = () => {
    setTimelineModalOpen(false);
  };

  const handleSaveTimelines = async () => {
    try {
      setIsSaving(true);
      await superAdminService.updateSettings(
        "resolutionTimelines",
        newTimelines,
      );
      toast.success("Resolution timelines updated successfully");
      fetchSettings();
      closeTimelineModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save timelines");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <FormPageLayout
      title="Configuration & Settings"
      loading={loading}
      error={error}
    >
      <SettingsSection>
        <SectionTitle>Complaint Categories</SectionTitle>
        <ConfigList>
          {categories.map((cat) => (
            <ConfigItem key={cat._id}>
              {cat.name}
              <CategoryActions>
                <EditButton onClick={() => openCategoryModal(cat)}>
                  Edit
                </EditButton>
                <DeleteButton onClick={() => openDeleteConfirmation(cat._id)}>
                  Delete
                </DeleteButton>
              </CategoryActions>
            </ConfigItem>
          ))}
        </ConfigList>
        <Button onClick={() => openCategoryModal()}>Add New Category</Button>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Status Workflow (Read-only)</SectionTitle>
        <ConfigList>
          {statuses.map((status, index) => (
            <ConfigItem key={index}>{status}</ConfigItem>
          ))}
        </ConfigList>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Priority Levels (Read-only)</SectionTitle>
        <ConfigList>
          {priorities.map((priority, index) => (
            <ConfigItem key={index}>{priority}</ConfigItem>
          ))}
        </ConfigList>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Default Resolution Timelines</SectionTitle>
        <SettingCard>
          <SettingLabel>High Priority:</SettingLabel>
          <SettingValue>{resolutionTimelines.high} hours</SettingValue>
        </SettingCard>
        <SettingCard>
          <SettingLabel>Medium Priority:</SettingLabel>
          <SettingValue>{resolutionTimelines.medium} hours</SettingValue>
        </SettingCard>
        <SettingCard>
          <SettingLabel>Low Priority:</SettingLabel>
          <SettingValue>{resolutionTimelines.low} hours</SettingValue>
        </SettingCard>
        <Button variant="secondary" onClick={openTimelineModal}>
          Edit Timelines
        </Button>
      </SettingsSection>

      {isCategoryModalOpen && (
        <Modal
          title={currentCategory ? "Edit Category" : "Add New Category"}
          onClose={closeCategoryModal}
          onSave={handleSaveCategory}
          isLoading={isSaving}
        >
          <ModalInputGroup>
            <ModalLabel>Category Name</ModalLabel>
            <ModalInput
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
          </ModalInputGroup>
        </Modal>
      )}

      {isTimelineModalOpen && (
        <Modal
          title="Edit Resolution Timelines"
          onClose={closeTimelineModal}
          onSave={handleSaveTimelines}
          isLoading={isSaving}
        >
          <ModalInputGroup>
            <ModalLabel>High Priority (hours)</ModalLabel>
            <ModalInput
              type="number"
              value={newTimelines.high || ""}
              onChange={(e) =>
                setNewTimelines({
                  ...newTimelines,
                  high: parseInt(e.target.value) || 0,
                })
              }
              placeholder="Enter hours"
            />
          </ModalInputGroup>
          <ModalInputGroup>
            <ModalLabel>Medium Priority (hours)</ModalLabel>
            <ModalInput
              type="number"
              value={newTimelines.medium || ""}
              onChange={(e) =>
                setNewTimelines({
                  ...newTimelines,
                  medium: parseInt(e.target.value) || 0,
                })
              }
              placeholder="Enter hours"
            />
          </ModalInputGroup>
          <ModalInputGroup>
            <ModalLabel>Low Priority (hours)</ModalLabel>
            <ModalInput
              type="number"
              value={newTimelines.low || ""}
              onChange={(e) =>
                setNewTimelines({
                  ...newTimelines,
                  low: parseInt(e.target.value) || 0,
                })
              }
              placeholder="Enter hours"
            />
          </ModalInputGroup>
        </Modal>
      )}

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleDeleteCategory}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        type="delete"
        isLoading={isDeleting}
      />
    </FormPageLayout>
  );
};

export default Settings;
