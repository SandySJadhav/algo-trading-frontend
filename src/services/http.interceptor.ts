import { toast } from 'react-toastify';

// NEW HTTP ENDPOINTS
const APIM_ENV = process.env.APIM_ENV;

const APIMSession = {
  token: {},
  get getToken() {
    return this.token;
  },
  set setToken(token: string) {
    this.token = token;
  }
};

export const getUserSession = () => APIMSession.getToken;

export const setUserSession = (token: string) => {
  APIMSession.setToken = token;
};

export const postRequest = async (url: string, body: any) => {
  const response = await fetch(APIM_ENV + url, {
    method: 'POST',
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + APIMSession.token,
      'Access-Control-Allow-Origin': window.location.origin
    }
  });
  const data = await response.json();
  if (data.statusCode !== 200) {
    toast.error(data.statusCode + ': ' + data.message);
  }
  return data;
};

export const getRequest = async (url: string) => {
  const response = await fetch(APIM_ENV + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + APIMSession.token,
      'Access-Control-Allow-Origin': window.location.origin
    }
  });
  const data = await response.json();
  if (data.statusCode !== 200) {
    toast.error(data.statusCode + ': ' + data.message);
  }
  return data;
};
