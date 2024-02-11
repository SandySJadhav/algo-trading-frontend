import { getRequest } from '@services/http.interceptor';

export const getMyStrategies = async (query: string) => {
  try {
    const response = await getRequest(`/instruments/search${query}`);
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
};
