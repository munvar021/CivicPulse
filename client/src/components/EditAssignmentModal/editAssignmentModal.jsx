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
  DateInput,
  ModalFooter,
  SubmitButton,
  CancelButton,
  ErrorMessage,
} from "./editAssignmentModalStyles";

const EditAssignmentModal = ({
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
      officer: currentOfficer,
      dueDate: currentDueDate,
    },
  });

  const officerOptions =
    officers?.map((officer) => ({
      value: officer._id,
      label: officer.name,
    })) || [];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Edit Assignment</ModalTitle>
          <CloseButton onClick={onClose} disabled={isLoading}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>Assigned Officer *</Label>
              <Controller
                name="officer"
                control={control}
                rules={{ required: "Please select an officer" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={officerOptions}
                    placeholder="Select officer..."
                    styles={customReactSelectStyles}
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                    isSearchable
                    isClearable
                    isDisabled={isLoading}
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
                    disabled={isLoading}
                  />
                )}
              />
              {errors.dueDate && (
                <ErrorMessage>{errors.dueDate.message}</ErrorMessage>
              )}
            </FormGroup>

            <ModalFooter>
              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? <ButtonLoader size="small" /> : "Save"}
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

export default EditAssignmentModal;
