export default {
  jwt: {
    secret: process.env.AUTH_SECRET || 'default',
    expiresIn: process.env.TOKEN_EXPIRATION_TIME || '1d',
  },
};
