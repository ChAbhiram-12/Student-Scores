import mongoose from 'mongoose';

export interface IMark extends mongoose.Document {
  student: mongoose.Types.ObjectId;
  subject: string;
  marks: number;
  maxMarks: number;
  semester: number;
  academicYear: string;
}

const markSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true,
    min: 0
  },
  maxMarks: {
    type: Number,
    required: true,
    default: 100
  },
  semester: {
    type: Number,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Compound index to ensure unique marks per subject per student per semester
markSchema.index({ student: 1, subject: 1, semester: 1, academicYear: 1 }, { unique: true });

export default mongoose.model<IMark>('Mark', markSchema); 