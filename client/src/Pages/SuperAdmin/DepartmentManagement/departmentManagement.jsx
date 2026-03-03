import React from "react";
import CRUDPageLayout from "../../../components/Layouts/CRUDPageLayout/crudPageLayout";
import DepartmentForm from "../../../components/Forms/departmentForm";
import superAdminService from "../../../services/superAdminService";

const departmentService = {
  getAll: (params) => superAdminService.getDepartments(params),
  create: (data) => superAdminService.createDepartment(data),
  update: (id, data) => superAdminService.updateDepartment(id, data),
  delete: (id) => superAdminService.deleteDepartment(id),
};

const DepartmentManagement = () => {
  const columns = [
    { key: "name", label: "Name", sortable: true, width: "30%" },
    {
      key: "description",
      label: "Description",
      sortable: false,
      width: "50%",
      render: (desc) => desc || "N/A",
    },
  ];

  return (
    <CRUDPageLayout
      title="Department Management"
      service={departmentService}
      columns={columns}
      FormComponent={DepartmentForm}
      addButtonLabel="Add Department"
      editTitle="Edit Department"
      addTitle="Add Department"
      useRedux={true}
      reduxSlice="departments"
    />
  );
};

export default DepartmentManagement;
