import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  // Validate and process the submission data here
  console.log(data);

  return NextResponse.json({ message: 'Submission received' });
}
