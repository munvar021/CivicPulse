import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../../../components/Loaders/loader";
import {
  faUsers,
  faFileAlt,
  faBolt,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import RoleHeader from "../../../components/Headers/roleHeader";
import StatCard from "../../../components/StatCard/statCard";
import {
  PageContainer,
  PageTitle,
  StatsGrid,
  Section,
  SectionTitle,
  MetricCard,
  MetricLabel,
  MetricValue,
  ChartPlaceholder,
  UptimeIcon,
  ChartSubtitle,
  ErrorMessage,
  ChartTitle,
} from "./systemMonitoringStyles";
import superAdminService from "../../../services/superAdminService";

const SystemMonitoring = () => {
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonitoringData = async () => {
      try {
        const { data } = await superAdminService.getSystemMonitoringData();
        setMetrics(data);
      } catch (err) {
        setError(err.message || "Failed to fetch monitoring data");
      } finally {
        setLoading(false);
      }
    };

    fetchMonitoringData();
  }, []);

  const formatValue = (value, unit = "") => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }
    return `${value}${unit}`;
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

  if (error) {
    return (
      <>
        <RoleHeader />
        <PageContainer>
          <ErrorMessage>Error: {error}</ErrorMessage>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <RoleHeader />
      <PageContainer>
        <PageTitle>System Monitoring</PageTitle>

        <StatsGrid>
          <StatCard
            label="Active Users"
            value={formatValue(metrics.activeUsers)}
            icon={<FontAwesomeIcon icon={faUsers} />}
            color="#667eea"
          />
          <StatCard
            label="Today's Submissions"
            value={formatValue(metrics.todaySubmissions)}
            icon={<FontAwesomeIcon icon={faFileAlt} />}
            color="#10b981"
          />
          <StatCard
            label="Avg Response Time"
            value={formatValue(metrics.avgResponseTime)}
            icon={<FontAwesomeIcon icon={faBolt} />}
            color="#f59e0b"
          />
          <StatCard
            label="System Uptime"
            value={formatValue(metrics.systemUptime)}
            icon={<UptimeIcon icon={faCircle} />}
            color="#10b981"
          />
        </StatsGrid>

        <Section>
          <SectionTitle>Usage Trends</SectionTitle>
          <ChartPlaceholder>
            <ChartTitle>
              <FontAwesomeIcon icon={faFileAlt} /> Complaint Submission Trends
            </ChartTitle>
            <ChartSubtitle>
              Visual representation of daily/weekly submissions will be
              displayed here
            </ChartSubtitle>
          </ChartPlaceholder>
        </Section>

        <Section>
          <SectionTitle>Peak Usage Periods</SectionTitle>
          <MetricCard>
            <MetricLabel>Peak Hour:</MetricLabel>
            <MetricValue>{formatValue(metrics.peakHour)}</MetricValue>
          </MetricCard>
          <MetricCard>
            <MetricLabel>Busiest Day:</MetricLabel>
            <MetricValue>{formatValue(metrics.busiestDay)}</MetricValue>
          </MetricCard>
          <MetricCard>
            <MetricLabel>Average Daily Load:</MetricLabel>
            <MetricValue>
              {formatValue(metrics.averageDailyLoad, " complaints")}
            </MetricValue>
          </MetricCard>
        </Section>
      </PageContainer>
    </>
  );
};

export default SystemMonitoring;
