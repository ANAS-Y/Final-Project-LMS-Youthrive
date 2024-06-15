const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  issue_date: { type: Date, default: Date.now },
  return_date: { type: Date },
  status: { type: String, enum: ['issued', 'returned','requested','pending' ], default: 'pending' }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
