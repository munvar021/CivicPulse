import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import FormPageLayout from "../../../components/Layouts/FormPageLayout/formPageLayout";
import Button from "../../../components/Button/button";
import citizenService from "../../../services/citizenService";
import ButtonLoader from "../../../components/Loaders/buttonLoader";
import { toast } from "react-toastify";
import {
  FormGroup,
  Label,
  Input,
  TextArea,
  ErrorText,
  FileInput,
  FileInputWrapper,
  FileInputLabel,
  FileInputText,
  ImagePreview,
  RemoveImageButton,
  CurrentImagesSection,
  CurrentImagesLabel,
  ImagesGrid,
  ImageWrapper,
  ButtonGroup,
  NewImagesGrid,
} from "../ReportIssue/reportIssueStyles";

const severityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    background: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.16)",
    borderRadius: "10px",
    padding: "0.25rem",
    color: "#ffffff",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(255, 255, 255, 0.1)" : "none",
    "&:hover": {
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
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
    "&:active": {
      background: "rgba(255, 255, 255, 0.15)",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#ffffff",
  }),
  input: (base) => ({
    ...base,
    color: "#ffffff",
  }),
  placeholder: (base) => ({
    ...base,
    color: "rgba(255, 255, 255, 0.5)",
  }),
};

const EditComplaint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const { data } = await citizenService.getComplaintById(id);
        if (data.status !== "pending") {
          toast.error("Only pending complaints can be edited");
          navigate(`/complaint/${id}`);
          return;
        }
        setValue("title", data.title);
        setValue("description", data.description);
        setValue(
          "severity",
          severityOptions.find((opt) => opt.value === data.severity),
        );
        setExistingImages(data.images || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch complaint");
        navigate("/my-complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id, navigate, setValue]);

  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + newImages.length + existingImages.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const images = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setNewImages((prev) => [...prev, ...images]);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const submitFormData = new FormData();
      submitFormData.append("title", formData.title);
      submitFormData.append("description", formData.description);
      submitFormData.append("severity", formData.severity.value);

      const { data: originalComplaint } =
        await citizenService.getComplaintById(id);
      const removedImageUrls = originalComplaint.images.filter(
        (img) => !existingImages.includes(img),
      );

      if (removedImageUrls.length > 0) {
        submitFormData.append(
          "removedImages",
          JSON.stringify(removedImageUrls),
        );
      }

      newImages.forEach((img) => {
        submitFormData.append("images", img.file);
      });

      await citizenService.updateComplaint(id, submitFormData);
      toast.success("Complaint updated successfully!");
      navigate(`/complaint/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update complaint");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormPageLayout
      title="Edit Complaint"
      onBack={() => navigate(`/complaint/${id}`)}
      loading={loading}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Title *</Label>
          <Input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter complaint title"
            disabled={submitting}
          />
          {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Description *</Label>
          <TextArea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Describe the issue in detail"
            rows={6}
            disabled={submitting}
          />
          {errors.description && (
            <ErrorText>{errors.description.message}</ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Severity *</Label>
          <Controller
            name="severity"
            control={control}
            rules={{ required: "Severity is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={severityOptions}
                styles={customSelectStyles}
                placeholder="Select severity level"
                isSearchable
                isDisabled={submitting}
              />
            )}
          />
          {errors.severity && <ErrorText>{errors.severity.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Images (Optional)</Label>

          {existingImages.length > 0 && (
            <CurrentImagesSection>
              <CurrentImagesLabel>Current Images:</CurrentImagesLabel>
              <ImagesGrid>
                {existingImages.map((img, index) => (
                  <ImageWrapper key={`existing-${index}`}>
                    <ImagePreview src={img} alt={`Existing ${index + 1}`} />
                    <RemoveImageButton
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      disabled={submitting}
                    >
                      ×
                    </RemoveImageButton>
                  </ImageWrapper>
                ))}
              </ImagesGrid>
            </CurrentImagesSection>
          )}

          <FileInputWrapper>
            <FileInputLabel htmlFor="new-images">
              <FontAwesomeIcon icon={faUpload} />
              <FileInputText>Add new images (Max 5 total)</FileInputText>
            </FileInputLabel>
            <FileInput
              id="new-images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewImageChange}
              disabled={submitting}
            />
          </FileInputWrapper>

          {newImages.length > 0 && (
            <NewImagesGrid>
              {newImages.map((img, index) => (
                <ImageWrapper key={`new-${index}`}>
                  <ImagePreview src={img.preview} alt={`New ${index + 1}`} />
                  <RemoveImageButton
                    type="button"
                    onClick={() => removeNewImage(index)}
                    disabled={submitting}
                  >
                    ×
                  </RemoveImageButton>
                </ImageWrapper>
              ))}
            </NewImagesGrid>
          )}
        </FormGroup>

        <ButtonGroup>
          <Button type="submit" disabled={submitting}>
            {submitting ? <ButtonLoader size="small" /> : "Update Complaint"}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate(`/complaint/${id}`)}
            disabled={submitting}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </FormPageLayout>
  );
};

export default EditComplaint;
