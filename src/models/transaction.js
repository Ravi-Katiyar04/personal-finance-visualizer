import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  description: String,
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Rent', 'Shopping', 'Other'],
    required: true,
  },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

