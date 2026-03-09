import React, { useEffect, forwardRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  Input,
  ErrorMessage,
  InputGroup,
  Label,
  HiddenSubmitButton,
} from "../UserForm/userFormStyles";

const DepartmentForm = forwardRef(
  ({ onSubmit, defaultValues, isSubmitting = false }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({ defaultValues });

    useEffect(() => {
      reset(defaultValues);
    }, [defaultValues, reset]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)} ref={ref}>
        <InputGroup>
          <Label>Department Name</Label>
          <Input
            {...register("name", { required: "Department name is required" })}
            placeholder="Enter department name"
            disabled={isSubmitting}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <Label>Description</Label>
          <Input
            {...register("description")}
            placeholder="Enter department description"
            disabled={isSubmitting}
          />
        </InputGroup>
        <HiddenSubmitButton type="submit" />
      </Form>
    );
  },
);

export default DepartmentForm;
