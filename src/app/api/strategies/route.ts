import { getMyStrategies } from '@services/firebase/strategies';
import verifyToken from '@services/firebase/verifyToken';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const headersList = headers();
  const authorization = headersList.get('authorization');
  const { status, message, user } = await verifyToken(authorization);
  if (status !== 200) {
    return NextResponse.json({ statusCode: status, message }, { status });
  }
  const { data } = await getMyStrategies(user?.uid + '');
  return NextResponse.json({ statusCode: status, message, data }, { status });
}
