import { postRequest } from "@services/http.interceptor";

export const searchAction = async body => {
  try {
    const response = await postRequest(`/search`, body);
    return response;
  } catch (error) {
    console.error(error);
  }
};
