import { getRequest } from '@services/http.interceptor';

export const getMyStrategiesAction = async () => {
  try {
    const response = await getRequest('/strategies');
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
