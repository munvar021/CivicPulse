import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import CRUDPageLayout from "../../../components/Layouts/CRUDPageLayout/crudPageLayout";
import ZoneForm from "../../../components/Forms/zoneForm";
import superAdminService from "../../../services/superAdminService";
import toast from "../../../utils/toast";
import {
  StatusBadge,
  ActiveButton,
  InactiveButton,
} from "./zoneManagementStyles";

const zoneService = {
  getAll: (params) => superAdminService.getZones(params),
  create: (data) => superAdminService.createZone(data),
  update: (id, data) => superAdminService.updateZone(id, data),
  delete: (id) => superAdminService.deleteZone(id),
};

const ZoneManagement = () => {
  const handleStatusChange = async (zone, fetchData) => {
    const newStatus = zone.status === "active" ? "inactive" : "active";
    try {
      await superAdminService.updateZone(zone._id, { status: newStatus });
      toast.success(`Zone status updated to ${newStatus}.`);
      fetchData();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update zone status.",
      );
    }
  };

  const columns = [
    { key: "name", label: "Zone Name", sortable: true },
    { key: "description", label: "Description", sortable: false },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (status) => (
        <StatusBadge color={status === "active" ? "#10b981" : "#6b7280"}>
          {status}
        </StatusBadge>
      ),
    },
  ];

  return (
    <CRUDPageLayout
      title="Zone Management"
      service={zoneService}
      columns={columns}
      FormComponent={ZoneForm}
      addButtonLabel="Add New Zone"
      editTitle="Edit Zone"
      addTitle="Add New Zone"
      useRedux={true}
      reduxSlice="zones"
      additionalActions={(zone, fetchData) => {
        const ButtonComponent =
          zone.status === "active" ? ActiveButton : InactiveButton;
        return (
          <ButtonComponent
            onClick={() => handleStatusChange(zone, fetchData)}
            title={zone.status === "active" ? "Deactivate" : "Activate"}
          >
            <FontAwesomeIcon
              icon={zone.status === "active" ? faToggleOff : faToggleOn}
            />
          </ButtonComponent>
        );
      }}
    />
  );
};

export default ZoneManagement;
