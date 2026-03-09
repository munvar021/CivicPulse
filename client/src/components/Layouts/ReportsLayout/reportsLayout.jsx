import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoleHeader from "../../Headers/roleHeader";
import StatCard from "../../StatCard/statCard";
import Filter from "../../Filter/filter";
import Button from "../../Button/button";
import Loader from "../../Loaders/loader";
import {
  PageContainer,
  LoaderContainer,
  PageTitle,
  FilterBar,
  StatsGrid,
  ReportSection,
  SectionTitle,
  EmptyMessage,
  ErrorMessage,
  TableWrapper,
  ReportTable,
  TableHeader,
  TableRow,
  TableCell,
} from "./reportsLayoutStyles";

const ReportsLayout = ({
  title,
  service,
  periodOptions,
  statsConfig,
  tableConfig,
  exportFileName = "report",
}) => {
  const [period, setPeriod] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchReports();
  }, [period]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await service.getReports(period);
      setStats(data.stats || data.overallStats || {});
      setTableData(
        data.tableData || data.priorityBreakdown || data.zoneComparison || [],
      );
    } catch (err) {
      setError("Failed to load reports. Please try again.");
      setStats({});
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const csvRows = [
      [`${title} - ${period.toUpperCase()}`],
      [""],
      ["Overall Statistics"],
      ["Metric", "Value"],
      ...Object.entries(stats).map(([key, value]) => [key, value]),
      [""],
      [tableConfig.title],
      tableConfig.columns.map((col) => col.label),
      ...tableData.map((row) =>
        tableConfig.columns.map((col) =>
          col.getValue ? col.getValue(row) : row[col.key],
        ),
      ),
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportFileName}_${period}_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <>
        <RoleHeader />
        <PageContainer>
          <LoaderContainer>
            <Loader size="large" />
          </LoaderContainer>
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

        <FilterBar>
          <Filter
            noMargin
            filters={[
              {
                label: "Report Period",
                value: period,
                options: periodOptions,
                onChange: (option) => setPeriod(option.value),
                isSearchable: false,
              },
            ]}
          />
          <Button onClick={handleExport}>Export Report</Button>
        </FilterBar>

        <StatsGrid>
          {statsConfig.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stats[stat.key] || 0}
              icon={<FontAwesomeIcon icon={stat.icon} />}
              color={stat.color}
            />
          ))}
        </StatsGrid>

        <ReportSection>
          <SectionTitle>{tableConfig.title}</SectionTitle>
          {tableData.length === 0 ? (
            <EmptyMessage>No data available for this period.</EmptyMessage>
          ) : (
            <TableWrapper>
              <ReportTable>
                <thead>
                  <TableRow>
                    {tableConfig.columns.map((col, index) => (
                      <TableHeader key={index}>{col.label}</TableHeader>
                    ))}
                  </TableRow>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                      {tableConfig.columns.map((col, colIndex) => (
                        <TableCell key={colIndex}>
                          {col.render ? col.render(row) : row[col.key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </tbody>
              </ReportTable>
            </TableWrapper>
          )}
        </ReportSection>
      </PageContainer>
    </>
  );
};

export default ReportsLayout;
