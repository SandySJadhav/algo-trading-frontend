import searchInstruments from '@services/firebase/search';
import verifyToken from '@services/firebase/verifyToken';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { searchTerm } = body;
  const headersList = headers();
  const authorization = headersList.get('authorization');
  const { status, message } = await verifyToken(authorization);

  if (status !== 200) {
    return NextResponse.json({ statusCode: status, message }, { status });
  } else if (searchTerm) {
    const result = await searchInstruments(searchTerm);
    return NextResponse.json(result.body, { status: result.status });
  } else {
    return NextResponse.json(
      { statusCode: 400, message: 'Bad Request!' },
      { status: 400 }
    );
  }
}
