import { toast } from 'react-toastify';

const APIMSession = {
  token: '',
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

export const postRequest = async (url: string, body?: any) => {
  const response = await fetch('/api' + url, {
    method: 'POST',
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + APIMSession.token
    }
  });
  const data = await response.json();
  if (data.statusCode !== 200) {
    toast.error(data.statusCode + ': ' + data.message);
  }
  return data;
};

export const getRequest = async (url: string) => {
  const response = await fetch('/api' + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + APIMSession.token
    }
  });
  const data = await response.json();
  if (data.statusCode !== 200) {
    toast.error(data.statusCode + ': ' + data.message);
  }
  return data;
};
