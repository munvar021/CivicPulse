import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import toast from "../../../utils/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import FormPageLayout from "../../../components/Layouts/FormPageLayout/formPageLayout";
import ButtonLoader from "../../../components/Loaders/buttonLoader";
import ImageModal from "../../../components/ImageModal/imageModal";
import { useImageModal } from "../../../hooks/useImageModal";
import officerService from "../../../services/officerService";
import {
  InfoText,
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
  CompactInfoText,
  ImagePreviewGrid,
  SuccessButton,
  CancelButton,
} from "./completeTaskStyles";

const CompleteTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const imagePreviews = images.map((img) => img.preview);
  const { isOpen, currentIndex, openModal, closeModal, navigateToImage } =
    useImageModal(imagePreviews);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      remarks: "",
    },
  });

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
    if (images.length === 0) {
      toast.error("Please upload at least one proof image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("status", "resolved");
      formData.append("remarks", data.remarks);

      images.forEach((img) => {
        formData.append("images", img.file);
      });

      await officerService.updateTaskProgress(id, formData);
      toast.success("Task marked as completed successfully");
      navigate("/officer/assigned-tasks");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to complete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormPageLayout
      title="Mark Task as Completed"
      onBack={() => navigate(`/officer/task/${id}`)}
      loading={loading}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InfoText>
          Upload proof of completion to verify the work has been done.
        </InfoText>

        <FormGroup>
          <Label>Completion Remarks *</Label>
          <Controller
            name="remarks"
            control={control}
            rules={{
              required: "Completion remarks are required",
              minLength: {
                value: 20,
                message: "Remarks must be at least 20 characters",
              },
            }}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Describe the work completed in detail..."
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
          <Label>Upload Completion Proof (Required) *</Label>
          <FileInputWrapper>
            <FileInputLabel htmlFor="proof-images">
              <FontAwesomeIcon icon={faUpload} />
              <FileInputText>Choose proof images (Max 5)</FileInputText>
            </FileInputLabel>
            <HiddenFileInput
              id="proof-images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              disabled={loading}
            />
          </FileInputWrapper>
          <CompactInfoText>
            Upload clear images showing the resolved issue
          </CompactInfoText>
          {images.length > 0 && (
            <ImagePreviewGrid>
              {images.map((img, index) => (
                <ImagePreview key={index}>
                  <img
                    src={img.preview}
                    alt={`Proof ${index + 1}`}
                    onClick={() => openModal(index)}
                  />
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
          <SuccessButton type="submit" disabled={loading}>
            {loading ? <ButtonLoader size="small" /> : "Submit Completion"}
          </SuccessButton>
          <CancelButton
            type="button"
            onClick={() => navigate(`/officer/task/${id}`)}
            disabled={loading}
          >
            Cancel
          </CancelButton>
        </ButtonGroup>
      </form>
      <ImageModal
        isOpen={isOpen}
        onClose={closeModal}
        images={imagePreviews}
        currentIndex={currentIndex}
        onNavigate={navigateToImage}
      />
    </FormPageLayout>
  );
};

export default CompleteTask;
