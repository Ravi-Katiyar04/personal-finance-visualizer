import connectDB from '@/lib/db';
import Transaction from '@/models/transaction';

export async function DELETE(req, { params }) {
  await connectDB();
  await Transaction.findByIdAndDelete(params.id);
  return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
}

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();
  const updated = await Transaction.findByIdAndUpdate(params.id, body, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}