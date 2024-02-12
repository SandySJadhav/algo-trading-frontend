import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  const authorization = request.headers.get('authorization');
  if (authorization) {
    const idToken = (authorization + '').split(' ')?.[1];
    if (idToken) {
      return NextResponse.next();
    }
  }
  return NextResponse.json({
    statusCode: 401,
    message: 'Unauthorized!'
  });
};

export const config = {
  matcher: '/api/:path*'
};
