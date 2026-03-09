import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import FormPageLayout from "../../../components/Layouts/FormPageLayout/formPageLayout";
import Button from "../../../components/Button/button";
import Map from "../../../components/Map/map";
import { useAuth } from "../../../context/authContext";
import citizenService from "../../../services/citizenService";
import superAdminService from "../../../services/superAdminService";
import toast from "../../../utils/toast";
import ButtonLoader from "../../../components/Loaders/buttonLoader";
import { customReactSelectStyles } from "../../../styles/reactSelectStyles";

import {
  FormGroup,
  Label,
  Input,
  TextArea,
  FileInput,
  FileInputWrapper,
  FileInputLabel,
  FileInputText,
  LocationInput,
  ButtonContainer,
  ErrorText,
  ImagePreviewContainer,
  ImagePreviewWrapper,
  ImagePreview,
  RemoveImageButton,
} from "./reportIssueStyles";

const ReportIssue = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [geolocationLoading, setGeolocationLoading] = useState(true);
  const [geolocationError, setGeolocationError] = useState("");
  const [departments, setDepartments] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]); // State to manage selected File objects
  const [imagePreviews, setImagePreviews] = useState([]); // State for image previews

  const watchedLocation = watch("location");
  const watchedLat = watch("lat");
  const watchedLng = watch("lng");
  const watchedDepartment = watch("department");

  // Department to categories mapping
  const departmentCategories = {
    "Animal Control & Stray Management": [
      { value: "stray_animals", label: "Stray Animals" },
      { value: "animal_rescue", label: "Animal Rescue" },
      { value: "animal_nuisance", label: "Animal Nuisance" },
      { value: "animal_relocation", label: "Animal Relocation" },
    ],
    "Traffic & Road Safety Coordination": [
      { value: "traffic_signal", label: "Traffic Signal" },
      { value: "road_sign", label: "Road Sign" },
      { value: "unsafe_crossing", label: "Unsafe Crossing" },
      { value: "traffic_hazard", label: "Traffic Hazard" },
    ],
    "Parks & Public Spaces Maintenance": [
      { value: "park_maintenance", label: "Park Maintenance" },
      { value: "park_security", label: "Park Security" },
      { value: "broken_equipment", label: "Broken Equipment" },
      { value: "park_cleanliness", label: "Park Cleanliness" },
    ],
    "Public Health & Vector Control": [
      { value: "vector_control", label: "Vector Control" },
      { value: "disease_prevention", label: "Disease Prevention" },
      { value: "fogging_request", label: "Fogging Request" },
      { value: "hygiene_risk", label: "Hygiene Risk" },
    ],
    "Sewerage & Sanitation": [
      { value: "sewage_overflow", label: "Sewage Overflow" },
      { value: "sewer_blockage", label: "Sewer Blockage" },
      { value: "manhole_issue", label: "Manhole Issue" },
      { value: "sanitation", label: "Sanitation" },
    ],
    "Water Supply & Distribution": [
      { value: "water_supply", label: "Water Supply" },
      { value: "pipeline_leak", label: "Pipeline Leak" },
      { value: "low_pressure", label: "Low Pressure" },
      { value: "water_quality", label: "Water Quality" },
    ],
    "Solid Waste Management": [
      { value: "garbage_collection", label: "Garbage Collection" },
      { value: "illegal_dumping", label: "Illegal Dumping" },
      { value: "overflowing_bins", label: "Overflowing Bins" },
      { value: "waste_transport", label: "Waste Transport" },
    ],
    "Street Lighting & Electrical": [
      { value: "street_light", label: "Street Light" },
      { value: "electrical_hazard", label: "Electrical Hazard" },
      { value: "exposed_wiring", label: "Exposed Wiring" },
      { value: "lighting_maintenance", label: "Lighting Maintenance" },
    ],
    "Drainage & Stormwater": [
      { value: "drainage", label: "Drainage" },
      { value: "waterlogging", label: "Waterlogging" },
      { value: "blocked_drain", label: "Blocked Drain" },
      { value: "flood_prevention", label: "Flood Prevention" },
    ],
    "Roads & Public Works": [
      { value: "road_repair", label: "Road Repair" },
      { value: "footpath_repair", label: "Footpath Repair" },
      { value: "pothole", label: "Pothole" },
      { value: "infrastructure_repair", label: "Infrastructure Repair" },
    ],
  };

  // Get categories based on selected department
  const getCategoryOptions = () => {
    if (watchedDepartment?.label) {
      return departmentCategories[watchedDepartment.label] || [];
    }
    // Return all categories if no department selected
    return Object.values(departmentCategories).flat();
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await superAdminService.getDepartments();
        setDepartments(data);
      } catch (err) {
        toast.error("Failed to fetch departments");
      }
    };
    fetchDepartments();

    if (selectedFiles.length > 0) {
      const newPreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreviews(newPreviews);
      setValue("images", selectedFiles); // Update react-hook-form's value for validation

      return () => {
        newPreviews.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setImagePreviews([]);
      setValue("images", []); // Clear react-hook-form's value
    }
  }, [selectedFiles, setValue]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation({ lat: latitude, lng: longitude });
          setValue("lat", latitude);
          setValue("lng", longitude);
          setValue(
            "location",
            `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          );
          setGeolocationLoading(false);
          setGeolocationError("");
        },
        (error) => {
          let errorMessage = "Unable to retrieve your location.";
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage =
              "Geolocation permission denied. Please enable location services in your browser settings to automatically get your location.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = "Location information is unavailable.";
          } else if (error.code === error.TIMEOUT) {
            errorMessage = "The request to get user location timed out.";
          }
          toast.error(errorMessage);
          setGeolocationError(errorMessage);
          setGeolocationLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    } else {
      const errorMessage =
        "Geolocation is not supported by your browser. Please enter location manually.";
      toast.error(errorMessage);
      setGeolocationError(errorMessage);
      setGeolocationLoading(false);
    }
  }, [setValue]);

  const handleMapClick = (latlng) => {
    setSelectedLocation(latlng);
    setValue("lat", latlng.lat);
    setValue("lng", latlng.lng);
    setValue("location", `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = [...selectedFiles, ...files];

    if (newFiles.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      setSelectedFiles(newFiles.slice(0, 5));
    } else {
      setSelectedFiles(newFiles);
    }
    event.target.value = "";
  };

  const removeImage = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove,
    );
    setSelectedFiles(updatedFiles);
  };

  const onSubmit = async (data) => {
    if (!authUser) {
      toast.error("You must be logged in to report an issue.");
      return;
    }
    if (!data.lat || !data.lng) {
      toast.error("Please select or provide a location.");
      return;
    }

    if (selectedFiles.length > 5) {
      // Use selectedFiles for validation
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category.value);
    formData.append("latitude", data.lat);
    formData.append("longitude", data.lng);
    formData.append("address", data.location);
    formData.append("severity", data.severity?.value || "medium");
    if (data.department?.value) {
      formData.append("department", data.department.value);
    }

    if (selectedFiles.length > 0) {
      // Use selectedFiles for appending
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }
    }

    try {
      await citizenService.createComplaint(formData);
      toast.success("Complaint submitted successfully!");
      navigate("/my-complaints");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit complaint.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormPageLayout
      title="Report New Issue"
      onBack={() => navigate("/dashboard")}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {geolocationLoading && <p>Fetching your location...</p>}
        {geolocationError && <ErrorText>{geolocationError}</ErrorText>}

        <FormGroup>
          <Label>Department *</Label>
          <Controller
            name="department"
            control={control}
            rules={{ required: "Department is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={departments.map((dept) => ({
                  value: dept._id,
                  label: dept.name,
                }))}
                placeholder="Select department..."
                onChange={(selected) => {
                  field.onChange(selected);
                  setValue("category", null); // Reset category when department changes
                }}
                styles={customReactSelectStyles}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                isDisabled={isSubmitting}
              />
            )}
          />
          {errors.department && (
            <ErrorText>{errors.department.message}</ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Issue Category *</Label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={getCategoryOptions()}
                placeholder={
                  watchedDepartment
                    ? "Select category..."
                    : "Select department first..."
                }
                isDisabled={!watchedDepartment || isSubmitting}
                styles={customReactSelectStyles}
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
            )}
          />
          {errors.category && <ErrorText>{errors.category.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Severity</Label>
          <Controller
            name="severity"
            control={control}
            defaultValue={{ value: "medium", label: "Medium" }}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                  { value: "critical", label: "Critical" },
                ]}
                placeholder="Select severity..."
                styles={customReactSelectStyles}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                isDisabled={isSubmitting}
              />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label>Issue Title *</Label>
          <Input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Brief title of the issue"
            disabled={isSubmitting}
          />
          {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Description *</Label>
          <TextArea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Provide detailed description of the issue"
            rows="5"
            disabled={isSubmitting}
          />
          {errors.description && (
            <ErrorText>{errors.description.message}</ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <Label>
            Upload Images (Max 5)
            {selectedFiles.length > 0 && ` (${selectedFiles.length} selected)`}
          </Label>
          <FileInputWrapper>
            <FileInputLabel htmlFor="file-upload">
              <FontAwesomeIcon icon={faUpload} />
              <FileInputText>Choose images (Max 5)</FileInputText>
            </FileInputLabel>
            <FileInput
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
          </FileInputWrapper>
          {selectedFiles.length > 5 && (
            <ErrorText>You can upload a maximum of 5 images.</ErrorText>
          )}

          {imagePreviews.length > 0 && (
            <ImagePreviewContainer>
              {imagePreviews.map((src, index) => (
                <ImagePreviewWrapper key={index}>
                  <ImagePreview src={src} alt={`Preview ${index + 1}`} />
                  <RemoveImageButton
                    type="button"
                    onClick={() => removeImage(index)}
                    disabled={isSubmitting}
                  >
                    &times;
                  </RemoveImageButton>
                </ImagePreviewWrapper>
              ))}
            </ImagePreviewContainer>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Location *</Label>
          <Map
            height="300px"
            center={selectedLocation || { lat: 0, lng: 0 }}
            markers={
              selectedLocation
                ? [
                    {
                      lat: selectedLocation.lat,
                      lng: selectedLocation.lng,
                      popup: "Selected Location",
                    },
                  ]
                : []
            }
            onMapClick={isSubmitting ? undefined : handleMapClick}
          />
          <Input
            type="hidden"
            {...register("lat", { required: "Location Latitude is required" })}
          />
          <Input
            type="hidden"
            {...register("lng", { required: "Location Longitude is required" })}
          />
          <LocationInput
            type="text"
            {...register("location", { required: "Location is required" })}
            placeholder="Click on map or enter coordinates (e.g., 34.0522, -118.2437)"
            disabled={geolocationLoading || isSubmitting}
          />
          {errors.location && <ErrorText>{errors.location.message}</ErrorText>}
        </FormGroup>

        <ButtonContainer>
          <Button type="submit" disabled={isSubmitting || geolocationLoading}>
            {isSubmitting ? (
              <ButtonLoader size="small" />
            ) : geolocationLoading ? (
              "Fetching Location..."
            ) : (
              "Submit Complaint"
            )}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/dashboard")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </ButtonContainer>
      </form>
    </FormPageLayout>
  );
};

export default ReportIssue;
