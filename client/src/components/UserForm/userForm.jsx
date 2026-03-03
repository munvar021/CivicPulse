import React, { useEffect, forwardRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { customReactSelectStyles } from "../../styles/reactSelectStyles";
import {
  Form,
  InputGroup,
  Label,
  Input,
  ErrorMessage,
  PasswordWrapper,
  PasswordToggle,
  HiddenSubmitButton,
  ConditionalInputGroup,
} from "./userFormStyles";

const UserForm = forwardRef(
  ({ onSubmit, defaultValues, departments, zones, isOfficerForm }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      watch,
      control,
      setValue,
    } = useForm({ defaultValues });

    const [showPassword, setShowPassword] = useState(false);
    const role = watch("role");

    useEffect(() => {
      reset(defaultValues);
    }, [defaultValues, reset]);

    const departmentOptions = departments
      ? departments.map((dept) => ({ value: dept._id, label: dept.name }))
      : [];
    const zoneOptions = zones
      ? zones.map((zone) => ({ value: zone._id, label: zone.name }))
      : [];

    return (
      <Form onSubmit={handleSubmit(onSubmit)} ref={ref}>
        <InputGroup>
          <Label>Name</Label>
          <Input
            {...register("name", { required: "Name is required" })}
            placeholder="John Doe"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <Label>Email</Label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="john.doe@example.com"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <Label>Password</Label>
          <PasswordWrapper>
            <Input
              {...register("password", {
                required: !defaultValues?._id ? "Password is required" : false,
                validate: (value) => {
                  if (!value && defaultValues?._id) return true;
                  if (!value) return "Password is required";
                  const pattern =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                  return (
                    pattern.test(value) ||
                    "Password must be at least 8 characters with uppercase, lowercase, number, and special character"
                  );
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder={
                defaultValues?._id
                  ? "Leave blank to keep same password"
                  : "Enter password"
              }
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </PasswordToggle>
          </PasswordWrapper>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputGroup>
        <InputGroup>
          <Label>Phone</Label>
          <Input
            {...register("phone", { required: "Phone is required" })}
            placeholder="123-456-7890"
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </InputGroup>

        {!isOfficerForm && (
          <>
            <InputGroup>
              <Label>Role</Label>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={["citizen", "officer", "admin"].map((r) => ({
                      value: r,
                      label: r.charAt(0).toUpperCase() + r.slice(1),
                    }))}
                    onChange={(option) => {
                      field.onChange(option.value);
                      if (
                        option.value !== "admin" &&
                        option.value !== "officer"
                      ) {
                        setValue("department", null);
                      }
                    }}
                    value={
                      field.value
                        ? {
                            value: field.value,
                            label:
                              field.value.charAt(0).toUpperCase() +
                              field.value.slice(1),
                          }
                        : null
                    }
                    styles={customReactSelectStyles}
                    placeholder="Select Role"
                  />
                )}
              />
              {errors.role && (
                <ErrorMessage>{errors.role.message}</ErrorMessage>
              )}
            </InputGroup>

            <ConditionalInputGroup
              $show={role === "admin" || role === "officer"}
            >
              <Label>Department</Label>
              <Controller
                name="department"
                control={control}
                rules={{
                  required:
                    role === "admin" || role === "officer"
                      ? "Department is required"
                      : false,
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={departmentOptions}
                    value={departmentOptions.find(
                      (option) =>
                        option.value === (field.value?.value || field.value),
                    )}
                    placeholder="Select Department"
                    styles={customReactSelectStyles}
                  />
                )}
              />
              {errors.department &&
                (role === "admin" || role === "officer") && (
                  <ErrorMessage>{errors.department.message}</ErrorMessage>
                )}
            </ConditionalInputGroup>

            <ConditionalInputGroup $show={role === "admin"}>
              <Label>Zone</Label>
              <Controller
                name="zone"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={zoneOptions}
                    value={zoneOptions.find(
                      (option) =>
                        option.value === (field.value?.value || field.value),
                    )}
                    placeholder="Select Zone (Optional)"
                    styles={customReactSelectStyles}
                    isClearable
                  />
                )}
              />
            </ConditionalInputGroup>
          </>
        )}

        <HiddenSubmitButton type="submit" />
      </Form>
    );
  },
);

export default UserForm;
