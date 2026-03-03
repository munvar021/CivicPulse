import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoleHeader from "../../Headers/roleHeader";
import StatCard from "../../StatCard/statCard";
import Button from "../../Button/button";
import Card from "../../Card/card";
import Loader from "../../Loaders/loader";
import StatusBadge from "../../StatusBadge/statusBadge";
import PriorityBadge from "../../PriorityBadge/priorityBadge";
import EmptyState from "../../EmptyState/emptyState";
import { formatDate } from "../../../utils/dateFormatter";
import {
  PageWrapper,
  Container,
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  QuickActionsSection,
  QuickActionsGrid,
  StatsSection,
  SectionTitle,
  StatsGrid,
  RecentSection,
  ItemsList,
  ItemCard,
  ItemHeader,
  ItemTitle,
  ItemMeta,
  ErrorMessage,
  BadgeContainer,
} from "./dashboardLayoutStyles";

const DashboardLayout = ({
  userName,
  subtitle,
  stats = [],
  recentItems = [],
  quickActions = [],
  loading = false,
  error = null,
  onItemClick,
  viewAllPath,
  viewAllLabel = "View All",
  emptyStateConfig = {},
}) => {
  const navigate = useNavigate();

  if (loading) return <Loader skeleton="dashboard" />;

  if (error) {
    return (
      <PageWrapper>
        <RoleHeader />
        <Container>
          <ErrorMessage>{error}</ErrorMessage>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <RoleHeader />
      <Container>
        <WelcomeSection>
          <WelcomeTitle>Welcome back, {userName}!</WelcomeTitle>
          {subtitle && <WelcomeSubtitle>{subtitle}</WelcomeSubtitle>}
        </WelcomeSection>

        {quickActions.length > 0 && (
          <QuickActionsSection>
            <QuickActionsGrid>
              {quickActions.map((action, index) => (
                <Card key={index} title={action.title}>
                  <p>{action.description}</p>
                  <Button
                    variant={action.variant || "primary"}
                    onClick={() => navigate(action.path)}
                  >
                    {action.label}
                  </Button>
                </Card>
              ))}
            </QuickActionsGrid>
          </QuickActionsSection>
        )}

        {stats.length > 0 && (
          <StatsSection>
            <SectionTitle>
              {stats[0]?.sectionTitle || "Statistics"}
            </SectionTitle>
            <StatsGrid>
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  label={stat.label}
                  value={stat.value}
                  icon={<FontAwesomeIcon icon={stat.icon} />}
                  color={stat.color}
                />
              ))}
            </StatsGrid>
          </StatsSection>
        )}

        <RecentSection>
          <SectionTitle>
            {emptyStateConfig.sectionTitle || "Recent Items"}
          </SectionTitle>
          {recentItems.length > 0 ? (
            <>
              <ItemsList>
                {recentItems.map((item) => (
                  <ItemCard
                    key={item._id}
                    onClick={() => onItemClick?.(item._id)}
                  >
                    <ItemHeader>
                      <ItemTitle>{item.title}</ItemTitle>
                      <BadgeContainer>
                        {item.status && (
                          <StatusBadge status={item.status} variant="small" />
                        )}
                        {(item.priority || item.severity) && (
                          <PriorityBadge
                            priority={item.priority}
                            severity={item.severity}
                            variant="small"
                          />
                        )}
                      </BadgeContainer>
                    </ItemHeader>
                    <ItemMeta>
                      {item.category && <span>Category: {item.category}</span>}
                      {item.department && (
                        <span>
                          Department: {item.department?.name || item.department}
                        </span>
                      )}
                      {item.location && (
                        <span>
                          Location: {item.location?.address || item.location}
                        </span>
                      )}
                      {item.createdAt && (
                        <span>Date: {formatDate(item.createdAt)}</span>
                      )}
                      {item.dueDate && (
                        <span>Due: {formatDate(item.dueDate)}</span>
                      )}
                    </ItemMeta>
                  </ItemCard>
                ))}
              </ItemsList>
              {viewAllPath && (
                <Button
                  variant="secondary"
                  onClick={() => navigate(viewAllPath)}
                >
                  {viewAllLabel}
                </Button>
              )}
            </>
          ) : (
            <EmptyState
              icon={emptyStateConfig.icon}
              title={emptyStateConfig.title}
              description={emptyStateConfig.description}
              action={emptyStateConfig.action}
            />
          )}
        </RecentSection>
      </Container>
    </PageWrapper>
  );
};

export default DashboardLayout;
