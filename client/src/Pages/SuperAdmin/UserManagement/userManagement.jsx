import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import RoleHeader from "../../../components/Headers/roleHeader";
import Button from "../../../components/Button/button";
import Table from "../../../components/Table/table";
import Pagination from "../../../components/Pagination/pagination";
import Loader from "../../../components/Loaders/loader";
import ConfirmationModal from "../../../components/ConfirmationModal/confirmationModal";
import Modal from "../../../components/Modal/modal";
import UserForm from "../../../components/UserForm/userForm";
import Filter from "../../../components/Filter/filter";
import toast from "../../../utils/toast";
import { useAuth } from "../../../context/authContext";
import superAdminService from "../../../services/superAdminService";
import {
  PageContainer,
  PageTitle,
  ActionBar,
  ActionButton,
  ActionsWrapper,
  DeleteActionButton,
} from "./userManagementStyles";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [filterRole, setFilterRole] = useState("citizen");
  const [filterDepartment, setFilterDepartment] = useState({
    value: "all",
    label: "All Departments",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const formRef = React.useRef();
  const { user: authUser } = useAuth();

  const roleOptions = [
    { value: "citizen", label: "Citizens", hasSecondaryFilter: false },
    { value: "admin", label: "Admins", hasSecondaryFilter: true },
    { value: "officer", label: "Officers", hasSecondaryFilter: true },
  ];

  useEffect(() => {
    fetchData();
  }, [authUser, filterRole, filterDepartment, currentPage, searchTerm]);

  useEffect(() => {
    setFilterDepartment({ value: "all", label: "All Departments" });
    setCurrentPage(1);
  }, [filterRole]);

  const fetchData = async () => {
    if (!authUser) {
      toast.error("Not authorized");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const deptsResponse = await superAdminService.getDepartments();
      setDepartments(deptsResponse.data);

      const zonesResponse = await superAdminService.getZones();
      setZones(zonesResponse.data);

      const usersResponse = await superAdminService.getUsers(
        filterRole,
        filterDepartment.value,
        currentPage,
        searchTerm,
      );
      setUsers(usersResponse.data.users || usersResponse.data);
      setTotalPages(usersResponse.data.totalPages || 1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setIsConfirmModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await superAdminService.deleteUser(userToDelete._id);
      setUsers(users.filter((user) => user._id !== userToDelete._id));
      toast.success("User deleted successfully");
      setIsConfirmModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      setIsSaving(true);
      const dataToSave = {
        ...formData,
        ...(formData.password && { password: formData.password }),
        department: formData.department
          ? typeof formData.department === "object"
            ? formData.department.value
            : formData.department
          : null,
        zone: formData.zone
          ? typeof formData.zone === "object"
            ? formData.zone.value
            : formData.zone
          : null,
      };

      const promise = editingUser
        ? superAdminService.updateUser(editingUser._id, dataToSave)
        : superAdminService.createUser(dataToSave);

      const { data: savedUser } = await promise;

      if (editingUser) {
        setUsers(
          users.map((user) => (user._id === savedUser._id ? savedUser : user)),
        );
        toast.success("User updated successfully");
      } else {
        setUsers([...users, savedUser]);
        toast.success("User created successfully");
      }

      setIsModalOpen(false);
      setEditingUser(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save user");
    } finally {
      setIsSaving(false);
    }
  };

  const getColumns = () => {
    const baseColumns = [
      { key: "name", label: "Name", sortable: true },
      { key: "email", label: "Email", sortable: true },
      { key: "phone", label: "Phone", sortable: false },
      { key: "role", label: "Role", sortable: true },
    ];

    if (filterRole !== "citizen") {
      baseColumns.push({
        key: "department",
        label: "Department",
        sortable: true,
        render: (department) => (department ? department.name : "N/A"),
      });
    }

    if (filterRole === "admin") {
      baseColumns.push({
        key: "zone",
        label: "Zone",
        sortable: true,
        render: (zone) => (zone ? zone.name : "N/A"),
      });
    }

    baseColumns.push({
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (_, user) => (
        <ActionsWrapper>
          <ActionButton onClick={() => handleEdit(user)} title="Edit">
            <FontAwesomeIcon icon={faEdit} />
          </ActionButton>
          <DeleteActionButton
            onClick={() => openDeleteConfirmation(user)}
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </DeleteActionButton>
        </ActionsWrapper>
      ),
    });

    return baseColumns;
  };

  if (loading) {
    return (
      <>
        <RoleHeader />
        <PageContainer>
          <Loader size="large" />
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <RoleHeader />
      <PageContainer>
        <PageTitle>User Management</PageTitle>
        <ActionBar>
          <Button onClick={handleAddUser}>Add User</Button>
        </ActionBar>

        <Filter
          filters={[
            {
              label: "Role",
              value: filterRole,
              options: roleOptions.map((opt) => ({
                value: opt.value,
                label: opt.label,
              })),
              onChange: (option) => setFilterRole(option.value),
            },
            ...(roleOptions.find((opt) => opt.value === filterRole)
              ?.hasSecondaryFilter
              ? [
                  {
                    label: "Department",
                    value: filterDepartment.value,
                    options: [
                      { value: "all", label: "All Departments" },
                      ...departments.map((dept) => ({
                        value: dept._id,
                        label: dept.name,
                      })),
                    ],
                    onChange: setFilterDepartment,
                  },
                ]
              : []),
          ]}
        />

        <Table
          columns={getColumns()}
          data={users}
          emptyMessage="No users found."
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {isModalOpen && (
          <Modal
            title={editingUser ? "Edit User" : "Add User"}
            onClose={() => {
              setIsModalOpen(false);
              setEditingUser(null);
            }}
            onSave={() =>
              formRef.current.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true }),
              )
            }
            isLoading={isSaving}
          >
            <UserForm
              ref={formRef}
              onSubmit={handleSave}
              defaultValues={
                editingUser
                  ? {
                      ...editingUser,
                      password: "",
                      department: editingUser.department
                        ? {
                            value: editingUser.department._id,
                            label: editingUser.department.name,
                          }
                        : null,
                      zone: editingUser.zone
                        ? {
                            value: editingUser.zone._id,
                            label: editingUser.zone.name,
                          }
                        : null,
                    }
                  : {
                      name: "",
                      email: "",
                      password: "",
                      phone: "",
                      role: "citizen",
                      department: null,
                      zone: null,
                    }
              }
              departments={departments}
              zones={zones}
            />
          </Modal>
        )}

        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => {
            setIsConfirmModalOpen(false);
            setUserToDelete(null);
          }}
          onConfirm={handleDelete}
          title="Delete User"
          message={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}
          type="delete"
          isLoading={isDeleting}
        />
      </PageContainer>
    </>
  );
};

export default UserManagement;
