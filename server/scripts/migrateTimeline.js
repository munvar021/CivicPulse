const mongoose = require('mongoose');
const Complaint = require('../models/general/Complaint');
require('dotenv').config();

const migrateTimeline = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const complaints = await Complaint.find({ 'timeline.0': { $exists: true } }).lean();
    console.log(`Found ${complaints.length} complaints with timeline entries`);

    let updated = 0;
    for (const complaint of complaints) {
      const hasInvalidTimeline = complaint.timeline.some(entry => !entry.eventType);
      
      if (hasInvalidTimeline) {
        await Complaint.updateOne(
          { _id: complaint._id },
          { $set: { timeline: [] } }
        );
        updated++;
      }
    }

    console.log(`Updated ${updated} complaints by clearing invalid timeline entries`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateTimeline();
