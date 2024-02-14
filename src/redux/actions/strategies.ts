import { getRequest, postRequest } from '@services/http.interceptor';

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

export const updateStrategyAction = async (id: string, body?: any) => {
  try {
    const response = await postRequest(`/strategies/${id}`, body);
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
