import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CRUDPageLayout from "../../../components/Layouts/CRUDPageLayout/crudPageLayout";
import UserForm from "../../../components/UserForm/userForm";
import adminService from "../../../services/adminService";
import { fetchDepartments } from "../../../store/slices/departmentsSlice";

const officerService = {
  getAll: (params) => adminService.getOfficers(params),
  create: (data) => adminService.createOfficer(data),
  update: (id, data) => adminService.updateOfficer(id, data),
  delete: (id) => adminService.deleteOfficer(id),
};

const OfficerManagement = () => {
  const dispatch = useDispatch();
  const { list: departments } = useSelector((state) => state.departments);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone", sortable: false },
  ];

  return (
    <CRUDPageLayout
      title="Officer Management"
      service={officerService}
      columns={columns}
      FormComponent={UserForm}
      formProps={{ departments, isOfficerForm: true }}
      addButtonLabel="Add Officer"
      editTitle="Edit Officer"
      addTitle="Add Officer"
      deleteConfirmMessage={(officer) =>
        `Are you sure you want to delete "${officer?.name}"? This action cannot be undone.`
      }
    />
  );
};

export default OfficerManagement;
