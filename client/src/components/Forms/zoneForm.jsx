import React, { useEffect, forwardRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { customReactSelectStyles } from "../../styles/reactSelectStyles";
import {
  Form,
  Input,
  ErrorMessage,
  InputGroup,
  Label,
  HiddenSubmitButton,
  SmallText,
} from "../UserForm/userFormStyles";

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const ZoneForm = forwardRef(({ onSubmit, defaultValues }, ref) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    const coordsString =
      defaultValues?.location?.coordinates?.[0]
        ?.map((coord) => `${coord[0]},${coord[1]}`)
        .join("; ") || "";
    reset({
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      status:
        statusOptions.find((opt) => opt.value === defaultValues?.status) ||
        statusOptions[0],
      coordinates: coordsString,
    });
  }, [defaultValues, reset]);

  const handleFormSubmit = (data) => {
    let coordinates;
    if (data.coordinates && data.coordinates.trim()) {
      const pairs = data.coordinates.split(";").map((pair) => {
        const [lng, lat] = pair.trim().split(",").map(Number);
        return [lng, lat];
      });
      pairs.push(pairs[0]);
      coordinates = [pairs];
    } else {
      coordinates = [
        [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0],
          [0, 0],
        ],
      ];
    }

    onSubmit({
      name: data.name,
      description: data.description,
      status: data.status?.value || data.status || "active",
      location: { type: "Polygon", coordinates },
    });
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)} ref={ref}>
      <InputGroup>
        <Label>Zone Name *</Label>
        <Input
          {...register("name", { required: "Zone name is required" })}
          placeholder="Enter zone name"
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </InputGroup>
      <InputGroup>
        <Label>Description *</Label>
        <Input
          {...register("description", { required: "Description is required" })}
          placeholder="Enter description"
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </InputGroup>
      <InputGroup>
        <Label>Coordinates (Optional)</Label>
        <Input
          {...register("coordinates")}
          placeholder="lng,lat; lng,lat; lng,lat (e.g., 0,0; 0,1; 1,1; 1,0)"
        />
        <SmallText>
          Enter polygon coordinates as longitude,latitude pairs separated by
          semicolons. Leave empty for default.
        </SmallText>
      </InputGroup>
      <InputGroup>
        <Label>Status</Label>
        <Controller
          name="status"
          control={control}
          defaultValue={{ value: "active", label: "Active" }}
          render={({ field }) => (
            <Select
              {...field}
              options={statusOptions}
              styles={customReactSelectStyles}
              placeholder="Select status"
            />
          )}
        />
      </InputGroup>
      <HiddenSubmitButton type="submit" />
    </Form>
  );
});

export default ZoneForm;
