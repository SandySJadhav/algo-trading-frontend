
// NEW HTTP ENDPOINTS
const APIM_ENV = process.env.APIM_ENV;

const APIMSession = {
  token: {},
  get getToken() {
    return this.token;
  },
  set setToken(token) {
    this.token = token;
  }
};

export const getUserSession = () => APIMSession.getToken;

export const setUserSession = token => {
  APIMSession.setToken = token;
};

export const getRequest = async url => {
  const response = await fetch(APIM_ENV + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + APIMSession.token
    }
  });
  const data = await response.json();
  return data;
};

export const postRequest = async (url, body) => {
  const response = await fetch(APIM_ENV + url, {
    method: 'POST',
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + APIMSession.token
    }
  });
  const data = await response.json();
  return data;
};

export const deleteRequest = async url => {
  const response = await fetch(APIM_ENV + url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + APIMSession.token
    }
  });
  const data = await response.json();
  return data;
};
