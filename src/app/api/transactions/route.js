import connectDB from '@/lib/db';
import Transaction from '@/models/transaction';

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return Response.json(transactions);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const newTx = await Transaction.create(body);
  return Response.json(newTx);
}
