import { FirebaseDB } from './firestore';
import { strategy_prop } from '@mytypes/strategy';

export const getMyStrategies = async (userId: string) => {
  const response = await FirebaseDB.collection('subscriptions')
    .doc(userId)
    .get();

  if (!response.exists) {
    return {
      data: [],
      status: 200
    };
  }

  const data: strategy_prop[] = [];

  const userSubscriptions = response.data();
  if (userSubscriptions && userSubscriptions.subscriptions?.length > 0) {
    const userStrategies = await FirebaseDB.collection('strategies')
      .where('strategy_id', 'in', userSubscriptions.subscriptions)
      .get();
    if (userStrategies.empty) {
      return {
        data: [],
        status: 200
      };
    }
    userStrategies.forEach((strategy: any) => {
      const str: strategy_prop = strategy.data();
      str.instrument_to_watch = str.instrument_to_watch.id;
      data.push(str);
    });
  }

  return {
    data,
    status: 200
  };
};
