import React, { useMemo } from "react";
import {
  TableWrapper,
  TableContainer,
  StyledTable,
  TableHeader,
  TableRow,
  TableCell,
  NoData,
} from "./tableStyles";

const Table = ({
  columns,
  data,
  onRowClick,
  emptyMessage = "No data available",
  isLoading = false,
}) => {
  if (data.length === 0 && !isLoading) {
    return <NoData>{emptyMessage}</NoData>;
  }

  return (
    <TableWrapper>
      <TableContainer>
        <StyledTable>
          <thead>
            <TableRow>
              {columns.map((column) => (
                <TableHeader key={column.key} width={column.width}>
                  {column.label}
                </TableHeader>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <TableRow
                key={row._id || row.id || index}
                $clickable={!!onRowClick}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column) => (
                  <TableCell key={column.key} data-label={column.label}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </TableWrapper>
  );
};

export default Table;
