import { getRequest } from '@services/http.interceptor';

export const getMyStrategies = async () => {
  try {
    const response = await getRequest('/strategies');
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
};
