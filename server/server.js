const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

require("./config/cloudinary");

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const authRoutes = require("./routes/general/authRoutes");
const citizenRoutes = require("./routes/citizen/citizenRoutes");
const complaintRoutes = require("./routes/general/complaintRoutes");
const superAdminRoutes = require("./routes/superAdmin/superAdminRoutes");
const userRoutes = require("./routes/general/userRoutes");
const adminRoutes = require("./routes/admin/adminRoutes");
const officerRoutes = require("./routes/officer/officerRoutes");
const departmentRoutes = require("./routes/superAdmin/departmentRoutes");
const zoneRoutes = require("./routes/superAdmin/zoneRoutes");
const categoryRoutes = require("./routes/general/categoryRoutes");
const settingRoutes = require("./routes/general/settingRoutes");

app.use("/api/citizens", authRoutes);
app.use("/api/citizens", citizenRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/officer", officerRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/superadmin/zones", zoneRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/settings", settingRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
