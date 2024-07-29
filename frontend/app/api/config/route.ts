import { NextResponse } from 'next/server';
import config from '../../../public/config.json';

export async function GET() {
  return NextResponse.json(config);
}
