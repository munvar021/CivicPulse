import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import FormPageLayout from "../../../components/Layouts/FormPageLayout/formPageLayout";
import Button from "../../../components/Button/button";
import ButtonLoader from "../../../components/Loaders/buttonLoader";
import ConfirmationModal from "../../../components/ConfirmationModal/confirmationModal";
import { useAuth } from "../../../context/authContext";
import citizenService from "../../../services/citizenService";
import toast from "../../../utils/toast";
import {
  ProofSection,
  ProofImage,
  RatingSection,
  StarContainer,
  Star,
  Label,
  TextArea,
  ButtonGroup,
  ErrorText,
} from "./resolutionFeedbackStyles";

const ResolutionFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isReopening, setIsReopening] = useState(false);

  const onSubmit = async (data) => {
    if (!authUser) {
      toast.error("You must be logged in to provide feedback.");
      return;
    }
    if (!data.rating || data.rating === 0) {
      toast.error("Please provide a rating.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      await citizenService.submitFeedback(id, {
        rating: data.rating,
        comment: data.comment,
      });
      toast.success("Feedback submitted successfully!");
      navigate("/my-complaints");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReopen = async () => {
    if (!authUser) {
      toast.error("You must be logged in to reopen a complaint.");
      return;
    }
    try {
      setIsReopening(true);
      await citizenService.reopenComplaint(id);
      toast.success("Complaint has been reopened.");
      navigate("/my-complaints");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reopen complaint.");
    } finally {
      setIsReopening(false);
      setIsConfirmModalOpen(false);
    }
  };

  return (
    <FormPageLayout
      title="Resolution Feedback"
      onBack={() => navigate("/my-complaints")}
    >
      {error && <ErrorText>{error}</ErrorText>}

      <ProofSection>
        <h3>Completion Proof</h3>
        <ProofImage src="/placeholder-proof.jpg" alt="Completion proof" />
        <p>Uploaded by field officer on 2024-01-18</p>
      </ProofSection>

      <form onSubmit={handleSubmit(onSubmit)}>
        <RatingSection>
          <Label>Rate the Resolution:</Label>
          <Controller
            name="rating"
            control={control}
            defaultValue={0}
            rules={{ required: true, min: 1 }}
            render={({ field: { onChange, value } }) => (
              <StarContainer>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    filled={star <= value}
                    onClick={() => onChange(star)}
                  >
                    ★
                  </Star>
                ))}
              </StarContainer>
            )}
          />
        </RatingSection>
        {errors.rating && <ErrorText>A rating is required.</ErrorText>}

        <Label>Your Feedback:</Label>
        <Controller
          name="comment"
          control={control}
          defaultValue=""
          rules={{ required: "Feedback comment is required." }}
          render={({ field }) => (
            <TextArea
              {...field}
              placeholder="Share your experience with the resolution..."
              rows="5"
            />
          )}
        />
        {errors.comment && <ErrorText>{errors.comment.message}</ErrorText>}

        <ButtonGroup>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <ButtonLoader size="small" /> : "Submit Feedback"}
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => setIsConfirmModalOpen(true)}
          >
            Reopen Complaint
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/my-complaints")}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleReopen}
        title="Reopen Complaint"
        message="Are you sure you want to reopen this complaint? This will reset its status."
        type="delete"
        isLoading={isReopening}
      />
    </FormPageLayout>
  );
};

export default ResolutionFeedback;
