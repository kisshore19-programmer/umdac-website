// app/api/test-email/route.ts
import { sendWelcomeEmail } from '@/lib/emails/send';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, name } = await req.json();
  const result = await sendWelcomeEmail(email, name);
  return NextResponse.json(result);
}