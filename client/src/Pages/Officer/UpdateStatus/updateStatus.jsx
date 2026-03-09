import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import toast from "../../../utils/toast";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import FormPageLayout from "../../../components/Layouts/FormPageLayout/formPageLayout";
import ButtonLoader from "../../../components/Loaders/buttonLoader";
import officerService from "../../../services/officerService";
import {
  FormGroup,
  Label,
  TextArea,
  FileInputWrapper,
  FileInputLabel,
  FileInputText,
  HiddenFileInput,
  ImagePreview,
  RemoveImageButton,
  ErrorMessage,
  SubmitButton,
  ButtonGroup,
  ImagePreviewGrid,
  CancelButton,
} from "./updateStatusStyles";

const UpdateStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: null,
      remarks: "",
    },
  });

  const selectedStatus = watch("status");

  const statusOptions = [
    { value: "in_progress", label: "In Progress" },
    { value: "resolved", label: "Completed" },
    { value: "blocked", label: "Blocked" },
  ];

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      background: "rgba(255, 255, 255, 0.03)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "10px",
      padding: "0.1rem",
      color: "#ffffff",
      boxShadow: state.isFocused
        ? "0 0 0 3px rgba(255, 255, 255, 0.1)"
        : "none",
      "&:hover": { borderColor: "rgba(255, 255, 255, 0.3)" },
    }),
    menu: (base) => ({
      ...base,
      background: "rgba(17, 24, 39, 0.95)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.16)",
      borderRadius: "10px",
      overflow: "hidden",
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "rgba(255, 255, 255, 0.1)" : "transparent",
      color: "#ffffff",
      cursor: "pointer",
      "&:active": { background: "rgba(255, 255, 255, 0.15)" },
    }),
    singleValue: (base) => ({ ...base, color: "#ffffff" }),
    input: (base) => ({ ...base, color: "#ffffff" }),
    placeholder: (base) => ({ ...base, color: "rgba(255, 255, 255, 0.5)" }),
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const onSubmit = async (data) => {
    if (data.status.value === "resolved" && images.length === 0) {
      toast.error("Please upload at least one proof image for completion");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("status", data.status.value);
      formData.append("remarks", data.remarks);

      images.forEach((img) => {
        formData.append("images", img.file);
      });

      await officerService.updateTaskProgress(id, formData);
      toast.success("Status updated successfully");
      navigate(`/officer/task/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormPageLayout
      title="Update Work Status"
      onBack={() => navigate(`/officer/task/${id}`)}
      loading={loading}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Status *</Label>
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={statusOptions}
                styles={customSelectStyles}
                placeholder="Select status..."
                menuPortalTarget={document.body}
                menuPosition="fixed"
                isDisabled={loading}
              />
            )}
          />
          {errors.status && (
            <ErrorMessage>{errors.status.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Remarks *</Label>
          <Controller
            name="remarks"
            control={control}
            rules={{
              required: "Remarks are required",
              minLength: {
                value: 10,
                message: "Remarks must be at least 10 characters",
              },
            }}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Add remarks about current progress or issues..."
                rows="5"
                disabled={loading}
              />
            )}
          />
          {errors.remarks && (
            <ErrorMessage>{errors.remarks.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>
            {selectedStatus?.value === "resolved"
              ? "Upload Proof Images (Required) *"
              : "Upload Progress Images (Optional)"}
          </Label>
          <FileInputWrapper>
            <FileInputLabel htmlFor="images">
              <FontAwesomeIcon icon={faUpload} />
              <FileInputText>Choose images (Max 5)</FileInputText>
            </FileInputLabel>
            <HiddenFileInput
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              disabled={loading}
            />
          </FileInputWrapper>
          {images.length > 0 && (
            <ImagePreviewGrid>
              {images.map((img, index) => (
                <ImagePreview key={index}>
                  <img src={img.preview} alt={`Preview ${index + 1}`} />
                  <RemoveImageButton
                    type="button"
                    onClick={() => removeImage(index)}
                    disabled={loading}
                  >
                    ×
                  </RemoveImageButton>
                </ImagePreview>
              ))}
            </ImagePreviewGrid>
          )}
        </FormGroup>

        <ButtonGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? <ButtonLoader size="small" /> : "Update Status"}
          </SubmitButton>
          <CancelButton
            type="button"
            onClick={() => navigate(`/officer/task/${id}`)}
            disabled={loading}
          >
            Cancel
          </CancelButton>
        </ButtonGroup>
      </form>
    </FormPageLayout>
  );
};

export default UpdateStatus;
