import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import toast from "../../../utils/toast";
import FormPageLayout from "../../../components/Layouts/FormPageLayout/formPageLayout";
import Button from "../../../components/Button/button";
import ButtonLoader from "../../../components/Loaders/buttonLoader";
import adminService from "../../../services/adminService";
import {
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  ErrorText,
} from "./assignOfficerStyles";

const AssignOfficer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [officers, setOfficers] = useState([]);
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!id || id === "undefined") {
      toast.error("Invalid complaint ID");
      navigate("/admin/complaints");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [officersData, complaintData] = await Promise.all([
          adminService.getOfficers(),
          adminService.getComplaintById(id),
        ]);
        setOfficers(officersData);
        setComplaint(complaintData);

        const priorityOption = priorityOptions.find(
          (opt) => opt.value === complaintData.severity,
        );
        if (priorityOption) {
          setValue("priority", priorityOption);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load data");
        navigate("/admin/complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, setValue, navigate]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      await adminService.assignComplaint(id, {
        officer: data.officer.value,
        priority: data.priority.value,
        dueDate: data.dueDate,
        instructions: data.instructions,
      });
      toast.success("Officer assigned successfully");
      navigate(`/admin/complaint/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign officer");
    } finally {
      setSubmitting(false);
    }
  };

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "critical", label: "Critical" },
  ];

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      background: "rgba(255, 255, 255, 0.03)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: "10px",
      padding: "0.1rem",
      backdropFilter: "blur(10px)",
    }),
    menu: (base) => ({
      ...base,
      background: "rgba(30, 30, 30, 0.95)",
      backdropFilter: "blur(20px)",
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "rgba(102, 126, 234, 0.2)" : "transparent",
      color: "#fff",
    }),
    singleValue: (base) => ({ ...base, color: "#fff" }),
    input: (base) => ({ ...base, color: "#fff" }),
  };

  return (
    <FormPageLayout
      title="Assign Officer to Complaint"
      onBack={() => navigate(`/admin/complaint/${id}`)}
      loading={loading}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Select Field Officer *</Label>
          <Controller
            name="officer"
            control={control}
            rules={{ required: "Officer is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={officers.map((officer) => ({
                  value: officer._id,
                  label: `${officer.name} - ${officer.email}`,
                }))}
                placeholder="Select officer..."
                styles={customSelectStyles}
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
            )}
          />
          {errors.officer && <ErrorText>{errors.officer.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Priority Level *</Label>
          <Controller
            name="priority"
            control={control}
            rules={{ required: "Priority is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={priorityOptions}
                placeholder="Select priority..."
                styles={customSelectStyles}
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
            )}
          />
          {errors.priority && <ErrorText>{errors.priority.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Expected Completion Date *</Label>
          <Input
            type="date"
            {...register("dueDate", { required: "Due date is required" })}
          />
          {errors.dueDate && <ErrorText>{errors.dueDate.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Instructions for Officer</Label>
          <TextArea
            {...register("instructions")}
            placeholder="Add any specific instructions or remarks"
            rows="4"
          />
        </FormGroup>

        <ButtonGroup>
          <Button type="submit" disabled={submitting}>
            {submitting ? <ButtonLoader size="small" /> : "Assign Officer"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(`/admin/complaint/${id}`)}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </FormPageLayout>
  );
};

export default AssignOfficer;
