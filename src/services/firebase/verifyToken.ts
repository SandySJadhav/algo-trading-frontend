import Firestore from './firestore';

const verifyToken = async (authorization?: string | null) => {
  try {
    const idToken = (authorization + '').split(' ')?.[1];
    await Firestore.auth.verifyIdToken(idToken);
    return {
      status: 200,
      message: 'Success!'
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
        status: 400,
        message: 'Bad Request!'
      };
    }
  }
};

export default verifyToken;
