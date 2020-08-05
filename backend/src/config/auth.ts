export default {
  jwt: {
    secret: process.env.AUTH_SECRET,
    expiresIn: process.env.TOKEN_EXPIRATION_TIME,
  },
};
