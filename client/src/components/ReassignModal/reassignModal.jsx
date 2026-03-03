import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import ButtonLoader from "../Loaders/buttonLoader";
import { customReactSelectStyles } from "../../styles/reactSelectStyles";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  FormGroup,
  Label,
  TextArea,
  DateInput,
  ModalFooter,
  SubmitButton,
  CancelButton,
  ErrorMessage,
} from "./reassignModalStyles";

const AssignmentModal = ({
  mode = "assign",
  officers,
  currentOfficer,
  currentDueDate,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      officer: currentOfficer || null,
      dueDate: currentDueDate || new Date().toISOString().split("T")[0],
      reason: "",
    },
  });

  const officerOptions =
    officers?.map((officer) => ({
      value: officer._id,
      label: `${officer.name} - ${officer.department?.name || "N/A"}`,
    })) || [];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getTitle = () => {
    switch (mode) {
      case "reassign":
        return "Reassign Complaint";
      case "edit":
        return "Edit Assignment";
      default:
        return "Assign Officer";
    }
  };

  const getButtonText = () => {
    switch (mode) {
      case "reassign":
        return "Reassign";
      case "edit":
        return "Update";
      default:
        return "Assign";
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{getTitle()}</ModalTitle>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>Select Officer *</Label>
              <Controller
                name="officer"
                control={control}
                rules={{ required: "Please select an officer" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={officerOptions}
                    placeholder="Choose an officer..."
                    styles={customReactSelectStyles}
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                    isSearchable
                    isClearable
                  />
                )}
              />
              {errors.officer && (
                <ErrorMessage>{errors.officer.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Due Date *</Label>
              <Controller
                name="dueDate"
                control={control}
                rules={{ required: "Please select a due date" }}
                render={({ field }) => (
                  <DateInput
                    {...field}
                    type="date"
                    min={getTodayDate()}
                    $hasError={!!errors.dueDate}
                  />
                )}
              />
              {errors.dueDate && (
                <ErrorMessage>{errors.dueDate.message}</ErrorMessage>
              )}
            </FormGroup>

            {mode === "reassign" && (
              <FormGroup>
                <Label>Reason for Reassignment *</Label>
                <Controller
                  name="reason"
                  control={control}
                  rules={{
                    required: "Please provide a reason",
                    minLength: {
                      value: 10,
                      message: "Reason must be at least 10 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder="Explain why you're reassigning this complaint..."
                      rows={4}
                      $hasError={!!errors.reason}
                    />
                  )}
                />
                {errors.reason && (
                  <ErrorMessage>{errors.reason.message}</ErrorMessage>
                )}
              </FormGroup>
            )}

            <ModalFooter>
              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? <ButtonLoader size="small" /> : getButtonText()}
              </SubmitButton>
              <CancelButton
                type="button"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </CancelButton>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AssignmentModal;
