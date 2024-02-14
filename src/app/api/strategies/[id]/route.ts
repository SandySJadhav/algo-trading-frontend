import { updateMyStrategy } from '@services/firebase/strategies';
import verifyToken from '@services/firebase/verifyToken';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type ParamProp = { params: { id: string } };

export async function POST(
  request: NextRequest,
  { params: { id } }: ParamProp
) {
  const body = await request.json();
  const headersList = headers();
  const authorization = headersList.get('authorization');
  const { status, message, user } = await verifyToken(authorization);

  if (status !== 200) {
    return NextResponse.json({ statusCode: status, message }, { status });
  }
  const res = await updateMyStrategy(user?.uid + '', id, body);
  return NextResponse.json({ statusCode: status, message }, { status });
}
