export const validateEmail = (email: string) =>
  email?.length > 0 && !!/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.exec(email);

export const validatePass = (pass: string) =>
  pass?.length > 0 && !!/^[\w\W]{6,20}$/i.exec(pass);

declare global {
  interface Window {
    timeout: any;
  }
}

export const extractUserData = (user: any) => {
  const {
    accessToken,
    displayName,
    email,
    emailVerified,
    isAnonymous,
    photoURL,
    uid,
    stsTokenManager: { refreshToken }
  } = user || {};
  return {
    accessToken,
    displayName,
    email,
    emailVerified,
    isAnonymous,
    photoURL,
    uid,
    refreshToken
  };
};

/**
 *
 * @param {function} func
 * @param {number} wait
 * @returns {function}
 */
export const debounce = (func: () => void, wait: number) => {
  // creates a debounce and recognizes last action only
  return function (...args: any) {
    const context = globalThis;
    clearTimeout(window.timeout);
    window.timeout = setTimeout(() => {
      delete window.timeout;
      return func.apply(context, args);
    }, wait);
  };
};
