import { postRequest } from "@services/http.interceptor";

export const searchScriptAction = async (body: any) => {
  try {
    const response = await postRequest(`/instruments/search`, body);
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
};
