import { NextResponse } from 'next/server';

async function verifyToken(token) {
  try {
    const url = 'http://user-service:3001/auth/verify-token';
    console.log(`Verifying token with: ${token}`);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Verification response status: ', response.status);
    if (response.ok) {
      const userData = await response.json();
      console.log('User data retrieved: ', userData)
      return userData;
    }
    return null;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("Current pathname: ", pathname);
  console.log("Current cookies: ", request.cookies);

  // Ignore API paths and static/image files
  if (pathname.startsWith('/_next/') || pathname.includes('/api/') || pathname.includes('/static/')) {
    console.log("Skipping middleware for path: ", pathname);
    return NextResponse.next();
  }

  // Allow navigation to login page without token check
  if (pathname.startsWith('/user-service/login') || (pathname.startsWith('/user-service/create')) || (pathname === '/')) {
    console.log("Accessing login page, skipping token check.");
    return NextResponse.next();
  }

  // Check for the access token in cookies
  const token = request.cookies.get('accessToken')?.value;
  console.log("Token from cookies: ", token);

  if (!token) {
    console.log("No token found, redirecting to login.");
    return NextResponse.redirect(new URL('/user-service/login', request.url));
  }

  // Verify the token is still valid
  const userData = await verifyToken(token);
  console.log("Token verification result: ", userData);
  if (!userData) {
    console.log("Token is invalid, redirecting to login.");
    return NextResponse.redirect(new URL('/user-service/login', request.url));
  }

  // If token is valid, proceed with the request
  console.log("Token is valid, proceeding with request.");
  const nextResponse = NextResponse.next();
  nextResponse.headers.set('x-user', JSON.stringify(userData.verifiedUser.username));
  console.log('Response headers: ', nextResponse.headers)
  return nextResponse;
}