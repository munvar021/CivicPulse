const mongoose = require("mongoose");
const path = require("path");
const Complaint = require("../models/general/Complaint");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const migrateTimeline = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }
    if (!process.env.MONGO_DB_NAME) {
      throw new Error("MONGO_DB_NAME is not set");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME,
    });
    console.log("Connected to MongoDB");

    const complaints = await Complaint.find({
      "timeline.0": { $exists: true },
    }).lean();
    console.log(`Found ${complaints.length} complaints with timeline entries`);

    let updated = 0;
    for (const complaint of complaints) {
      const hasInvalidTimeline = complaint.timeline.some(
        (entry) => !entry.eventType,
      );

      if (hasInvalidTimeline) {
        await Complaint.updateOne(
          { _id: complaint._id },
          { $set: { timeline: [] } },
        );
        updated++;
      }
    }

    console.log(
      `Updated ${updated} complaints by clearing invalid timeline entries`,
    );
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrateTimeline();
