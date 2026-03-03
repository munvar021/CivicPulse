import React from "react";
import RoleHeader from "../../Headers/roleHeader";
import Table from "../../Table/table";
import Filter from "../../Filter/filter";
import Pagination from "../../Pagination/pagination";
import Loader from "../../Loaders/loader";
import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "./tablePageLayoutStyles";

const TablePageLayout = ({
  title,
  columns,
  data,
  filters,
  currentPage,
  totalPages,
  onPageChange,
  loading,
  error,
  emptyMessage = "No data found.",
  actionBar,
}) => {
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

  if (error) {
    return (
      <>
        <RoleHeader />
        <PageContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <RoleHeader />
      <PageContainer>
        <PageTitle>{title}</PageTitle>

        {actionBar}

        {filters && filters.length > 0 && <Filter filters={filters} />}

        <Table columns={columns} data={data} emptyMessage={emptyMessage} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </PageContainer>
    </>
  );
};

export default TablePageLayout;
