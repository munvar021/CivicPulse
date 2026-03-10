import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import TablePageLayout from "../TablePageLayout/tablePageLayout";
import Button from "../../Button/button";
import ConfirmationModal from "../../ConfirmationModal/confirmationModal";
import Modal from "../../Modal/modal";
import toast from "../../../utils/toast";
import { fetchDepartments } from "../../../store/slices/departmentsSlice";
import { fetchZones } from "../../../store/slices/zonesSlice";
import {
  ActionBar,
  ActionButton,
  ActionsContainer,
  DeleteActionButton,
} from "./crudPageLayoutStyles";

const CRUDPageLayout = ({
  title,
  service,
  columns,
  FormComponent,
  formProps = {},
  filters = [],
  addButtonLabel = "Add",
  editTitle = "Edit",
  addTitle = "Add",
  deleteConfirmMessage = (item) =>
    `Are you sure you want to delete "${item?.name}"? This action cannot be undone.`,
  onDataFetch,
  additionalActions,
  useRedux = false,
  reduxSlice = null,
}) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => {
    if (!useRedux || !reduxSlice) return null;
    return state[reduxSlice];
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const formRef = useRef();

  useEffect(() => {
    if (useRedux && reduxSlice) {
      if (reduxSlice === "departments") {
        dispatch(
          fetchDepartments({
            page: currentPage,
            search: searchTerm,
            ...filterValues,
          }),
        );
      } else if (reduxSlice === "zones") {
        dispatch(
          fetchZones({
            page: currentPage,
            search: searchTerm,
            ...filterValues,
          }),
        );
      }
    } else {
      fetchData();
    }
  }, [
    currentPage,
    searchTerm,
    ...Object.values(filterValues),
    dispatch,
    useRedux,
    reduxSlice,
  ]);

  useEffect(() => {
    if (useRedux && reduxData) {
      setData(reduxData.list || []);
      setLoading(reduxData.loading || false);
    }
  }, [reduxData, useRedux]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = { page: currentPage, search: searchTerm, ...filterValues };
      const response = await service.getAll(params);

      const items = Array.isArray(response)
        ? response
        : response.data?.items ||
          response.data?.users ||
          response.data?.officers ||
          response.data?.departments ||
          response.data?.zones ||
          response.data ||
          [];

      setData(Array.isArray(items) ? items : []);
      setTotalPages(response.data?.totalPages || 1);
      if (onDataFetch) onDataFetch(response.data || response);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch data");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setIsConfirmModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await service.delete(itemToDelete._id);

      if (useRedux && reduxSlice) {
        if (reduxSlice === "departments") {
          dispatch(fetchDepartments({ page: currentPage, search: searchTerm }));
        } else if (reduxSlice === "zones") {
          dispatch(fetchZones({ page: currentPage, search: searchTerm }));
        }
      } else {
        setData(data.filter((item) => item._id !== itemToDelete._id));
      }

      toast.success("Deleted successfully");
      setIsConfirmModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      setIsSaving(true);
      const savedItem = editingItem
        ? await service.update(editingItem._id, formData)
        : await service.create(formData);

      const item = savedItem.data || savedItem;

      if (useRedux && reduxSlice) {
        if (reduxSlice === "departments") {
          dispatch(fetchDepartments({ page: currentPage, search: searchTerm }));
        } else if (reduxSlice === "zones") {
          dispatch(fetchZones({ page: currentPage, search: searchTerm }));
        }
      } else {
        if (editingItem) {
          setData(data.map((d) => (d._id === item._id ? item : d)));
        } else {
          setData([...data, item]);
        }
      }

      toast.success(
        editingItem ? "Updated successfully" : "Created successfully",
      );
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handleModalClose = () => {
    if (!isSaving) {
      setIsModalOpen(false);
      setEditingItem(null);
    }
  };

  const enhancedColumns = [
    ...columns,
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (_, item) => (
        <ActionsContainer>
          <ActionButton onClick={() => handleEdit(item)} title="Edit">
            <FontAwesomeIcon icon={faEdit} />
          </ActionButton>
          <DeleteActionButton
            onClick={() => openDeleteConfirmation(item)}
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </DeleteActionButton>
          {additionalActions && additionalActions(item, fetchData)}
        </ActionsContainer>
      ),
    },
  ];

  const tableFilters =
    filters.length > 0
      ? filters.map((filter) => ({
          ...filter,
          onChange: (option) => {
            setFilterValues((prev) => ({
              ...prev,
              [filter.key]: option.value,
            }));
            setCurrentPage(1);
          },
        }))
      : [];

  return (
    <>
      <TablePageLayout
        title={title}
        columns={enhancedColumns}
        data={data}
        filters={tableFilters}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        loading={loading}
        emptyMessage={`No ${title.toLowerCase()} found.`}
        actionBar={
          <ActionBar>
            <Button onClick={handleAdd}>{addButtonLabel}</Button>
          </ActionBar>
        }
      />

      {isModalOpen && (
        <Modal
          title={editingItem ? editTitle : addTitle}
          onClose={handleModalClose}
          onSave={() =>
            formRef.current.dispatchEvent(
              new Event("submit", { cancelable: true, bubbles: true }),
            )
          }
          isLoading={isSaving}
        >
          <FormComponent
            ref={formRef}
            onSubmit={handleSave}
            defaultValues={editingItem}
            isSubmitting={isSaving}
            isLoading={isSaving}
            {...formProps}
          />
        </Modal>
      )}

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleDelete}
        title={`Delete ${title.slice(0, -1)}`}
        message={deleteConfirmMessage(itemToDelete)}
        type="delete"
        isLoading={isDeleting}
      />
    </>
  );
};

export default CRUDPageLayout;
