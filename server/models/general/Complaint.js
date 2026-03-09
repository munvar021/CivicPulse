const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema(
  {
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Citizen',
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: {
        type: String,
      },
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['pending', 'assigned', 'reassigned', 'in_progress', 'resolved', 'closed', 'rejected', 'delayed'],
      index: true,
    },
    severity: {
      type: String,
      required: true,
      default: 'medium',
      enum: ['low', 'medium', 'high', 'critical'],
      index: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      index: true,
    },
    images: [
      {
        type: String,
      },
    ],
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Officer',
      index: true,
    },
    dueDate: {
      type: Date,
      index: true,
    },
    instructions: {
      type: String,
    },
    resolutionDetails: {
      type: String,
    },
    resolutionDate: {
      type: Date,
    },
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
      },
    },
    timeline: [
      {
        eventType: {
          type: String,
          required: true,
          enum: ['submitted', 'verified', 'assigned', 'accepted', 'in_progress', 'due_date_updated', 'reassigned', 'completed', 'status_change'],
        },
        status: {
          type: String,
          required: true,
        },
        description: String,
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: 'timeline.updatedByModel',
        },
        updatedByModel: {
          type: String,
          enum: ['Officer', 'Admin', 'Citizen', 'SuperAdmin'],
        },
        metadata: {
          oldDueDate: Date,
          newDueDate: Date,
          reason: String,
          fromOfficer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Officer',
          },
          toOfficer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Officer',
          },
        },
        images: [String],
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    progressUpdates: [
      {
        status: {
          type: String,
          required: true,
        },
        remarks: {
          type: String,
          required: true,
        },
        images: [String],
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Officer',
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    reassignmentHistory: [
      {
        fromOfficer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Officer',
        },
        toOfficer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Officer',
          required: true,
        },
        reason: {
          type: String,
          required: true,
        },
        newDueDate: {
          type: Date,
          required: true,
        },
        reassignedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Admin',
          required: true,
        },
        reassignedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

complaintSchema.index({ location: '2dsphere' });
complaintSchema.index({ createdAt: -1 });
complaintSchema.index({ status: 1, department: 1 });
complaintSchema.index({ citizen: 1, status: 1 });
complaintSchema.index({ assignedTo: 1, status: 1 });
complaintSchema.index({ department: 1, createdAt: -1 });

complaintSchema.pre('save', function(next) {
  if (this.isNew) {
    this.timeline = [{
      eventType: 'submitted',
      status: this.status,
      description: this.description,
      updatedByModel: 'Citizen',
      date: this.createdAt || new Date()
    }];
  }
  next();
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;