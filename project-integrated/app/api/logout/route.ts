import { NextResponse } from 'next/server';

export async function GET() {

  const response = new NextResponse('Logged out', {
    status: 302, 
    headers: {
      'Set-Cookie': 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict',
      'Location': '/login' 
    }
  });
  return response;
}