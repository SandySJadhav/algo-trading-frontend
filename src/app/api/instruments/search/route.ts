import searchInstruments from '@services/firebase/search';
import verifyToken from '@services/firebase/verifyToken';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const headersList = headers();
  const authorization = headersList.get('authorization');
  const { status, message } = await verifyToken(authorization);
  if (status !== 200) {
    return NextResponse.json({ statusCode: status, message }, { status });
  }

  const searchParams = request.nextUrl.searchParams;
  const searchTerm = searchParams.get('searchTerm');
  if (searchTerm) {
    const { data } = await searchInstruments(searchTerm);
    return NextResponse.json({ statusCode: status, message, data }, { status });
  } else {
    return NextResponse.json(
      { statusCode: 400, message: 'Bad Request!' },
      { status: 400 }
    );
  }
}
