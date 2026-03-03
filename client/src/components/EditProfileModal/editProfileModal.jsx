import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ButtonLoader from "../Loaders/buttonLoader";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ErrorText,
  PasswordInputWrapper,
  PasswordToggle,
  ButtonGroup,
  SubmitButton,
  CancelButton,
} from "./editProfileModalStyles";

const EditProfileModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: initialData,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");

  if (!isOpen) return null;

  const handleFormSubmit = (data) => {
    const submitData = { ...data };
    if (!submitData.password) {
      delete submitData.password;
      delete submitData.confirmPassword;
    }
    onSubmit(submitData);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Edit Profile</ModalTitle>
          <CloseButton onClick={onClose} disabled={isLoading}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormGroup>
              <Label>Name *</Label>
              <Input
                type="text"
                {...register("name", { required: "Name is required" })}
                disabled={isLoading}
              />
              {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Email *</Label>
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format",
                  },
                })}
                disabled={isLoading}
              />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Phone</Label>
              <Input type="text" {...register("phone")} disabled={isLoading} />
            </FormGroup>

            <FormGroup>
              <Label>New Password (Leave blank to keep current)</Label>
              <PasswordInputWrapper>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                      message:
                        "Password must contain uppercase, lowercase, number, and special character",
                    },
                  })}
                  disabled={isLoading}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </PasswordToggle>
              </PasswordInputWrapper>
              {errors.password && (
                <ErrorText>{errors.password.message}</ErrorText>
              )}
            </FormGroup>

            {password && (
              <FormGroup>
                <Label>Confirm Password *</Label>
                <PasswordInputWrapper>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: password
                        ? "Please confirm your password"
                        : false,
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    disabled={isLoading}
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                    />
                  </PasswordToggle>
                </PasswordInputWrapper>
                {errors.confirmPassword && (
                  <ErrorText>{errors.confirmPassword.message}</ErrorText>
                )}
              </FormGroup>
            )}

            <ButtonGroup>
              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? <ButtonLoader size="small" /> : "Save Changes"}
              </SubmitButton>
              <CancelButton
                type="button"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </CancelButton>
            </ButtonGroup>
          </form>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditProfileModal;
