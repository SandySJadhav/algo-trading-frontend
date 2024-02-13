import { getRequest } from '@services/http.interceptor';

/**
 *
 * @param string query
 * @returns object
 */
export const searchInstrumentAction = async (query?: string) => {
  try {
    const response = await getRequest(
      `/instruments/search?searchTerm=${query ?? ''}`
    );
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
};
