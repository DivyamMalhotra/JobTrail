const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  link: { type: String },
  status: {
    type: String,
    enum: ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Wishlist'
  },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'], default: 'Full-time' },
  dateApplied: { type: Date, default: Date.now },
  notes: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);