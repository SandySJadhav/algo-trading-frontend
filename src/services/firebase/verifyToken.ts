import Firestore from './firestore';

const verifyToken = async (authorization?: string | null) => {
  try {
    if (authorization) {
      const idToken = (authorization + '').split(' ')?.[1];
      if (idToken) {
        await Firestore.auth.verifyIdToken(idToken);
        return {
          status: 200,
          message: 'Success!'
        };
      }
    }
    // Forbidden
    return {
      status: 403,
      message: 'Unauthorized!'
    };
  } catch (error: any) {
    if (error.code === 'auth/id-token-expired') {
      // Session Expired
      return {
        status: 440,
        message: 'Session Expired!'
      };
    } else {
      // Forbidden
      return {
        status: 403,
        message: 'Unauthorized!'
      };
    }
  }
};

export default verifyToken;
