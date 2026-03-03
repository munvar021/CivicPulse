import Dashboard from "../Pages/Citizen/Dashboard/dashboard";
import ReportIssue from "../Pages/Citizen/ReportIssue/reportIssue";
import MyComplaints from "../Pages/Citizen/MyComplaints/myComplaints";
import ComplaintDetailsLayout from "../components/Layouts/ComplaintDetailsLayout/complaintDetailsLayout";
import NearbyComplaintDetails from "../Pages/Citizen/NearbyComplaintDetails/nearbyComplaintDetails";
import EditComplaint from "../Pages/Citizen/EditComplaint/editComplaint";
import ResolutionFeedback from "../Pages/Citizen/ResolutionFeedback/resolutionFeedback";
import Profile from "../Pages/Citizen/Profile/profile";
import NearbyIssues from "../Pages/Citizen/NearbyIssues/nearbyIssues";
import OfficerDashboard from "../Pages/Officer/Dashboard/dashboard";
import AssignedTasks from "../Pages/Officer/AssignedTasks/assignedTasks";
import UpdateStatus from "../Pages/Officer/UpdateStatus/updateStatus";
import CompleteTask from "../Pages/Officer/CompleteTask/completeTask";
import WorkHistory from "../Pages/Officer/WorkHistory/workHistory";
import OfficerProfile from "../Pages/Officer/Profile/profile";
import AdminDashboard from "../Pages/Admin/Dashboard/dashboard";
import ComplaintManagement from "../Pages/Admin/ComplaintManagement/complaintManagement";
import AssignOfficer from "../Pages/Admin/AssignOfficer/assignOfficer";
import Escalations from "../Pages/Admin/Escalations/escalations";
import Reports from "../Pages/Admin/Reports/reports";
import AdminProfile from "../Pages/Admin/Profile/profile";
import OfficerManagement from "../Pages/Admin/OfficerManagement/officerManagement";
import SuperAdminDashboard from "../Pages/SuperAdmin/Dashboard/dashboard";
import ZoneManagement from "../Pages/SuperAdmin/ZoneManagement/zoneManagement";
import UserManagement from "../Pages/SuperAdmin/UserManagement/userManagement";
import SystemMonitoring from "../Pages/SuperAdmin/SystemMonitoring/systemMonitoring";
import GlobalReports from "../Pages/SuperAdmin/GlobalReports/globalReports";
import Settings from "../Pages/SuperAdmin/Settings/settings";
import SuperAdminProfile from "../Pages/SuperAdmin/Profile/profile";
import SuperAdminComplaintManagement from "../Pages/SuperAdmin/ComplaintManagement/complaintManagement";
import DepartmentManagement from "../Pages/SuperAdmin/DepartmentManagement/departmentManagement";

const citizenRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/report-issue", component: ReportIssue },
  { path: "/my-complaints", component: MyComplaints },
  { path: "/complaint/:id", component: ComplaintDetailsLayout },
  { path: "/edit-complaint/:id", component: EditComplaint },
  { path: "/feedback/:id", component: ResolutionFeedback },
  { path: "/profile", component: Profile },
  { path: "/nearby-issues", component: NearbyIssues },
  { path: "/nearby-complaint/:id", component: NearbyComplaintDetails },
];

const officerRoutes = [
  { path: "/officer/dashboard", component: OfficerDashboard },
  { path: "/officer/assigned-tasks", component: AssignedTasks },
  { path: "/officer/task/:id", component: ComplaintDetailsLayout },
  { path: "/officer/update-status/:id", component: UpdateStatus },
  { path: "/officer/complete-task/:id", component: CompleteTask },
  { path: "/officer/work-history", component: WorkHistory },
  { path: "/officer/profile", component: OfficerProfile },
];

const adminRoutes = [
  { path: "/admin/dashboard", component: AdminDashboard },
  { path: "/admin/complaints", component: ComplaintManagement },
  { path: "/admin/complaint/:id", component: ComplaintDetailsLayout },
  { path: "/admin/assign/:id", component: AssignOfficer },
  { path: "/admin/escalations", component: Escalations },
  { path: "/admin/reports", component: Reports },
  { path: "/admin/profile", component: AdminProfile },
  { path: "/admin/officers", component: OfficerManagement },
];

const superAdminRoutes = [
  { path: "/superadmin/dashboard", component: SuperAdminDashboard },
  { path: "/superadmin/complaints", component: SuperAdminComplaintManagement },
  { path: "/superadmin/complaint/:id", component: ComplaintDetailsLayout },
  { path: "/superadmin/zones", component: ZoneManagement },
  { path: "/superadmin/users", component: UserManagement },
  { path: "/superadmin/departments", component: DepartmentManagement },
  { path: "/superadmin/monitoring", component: SystemMonitoring },
  { path: "/superadmin/reports", component: GlobalReports },
  { path: "/superadmin/settings", component: Settings },
  { path: "/superadmin/profile", component: SuperAdminProfile },
];

export const routesByRole = {
  citizen: citizenRoutes,
  officer: officerRoutes,
  admin: adminRoutes,
  superAdmin: superAdminRoutes,
};
