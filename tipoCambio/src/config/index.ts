import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    exchange: {
      url: process.env.EXCHANGE_URL,
      apiKey: process.env.EXCHANGE_RATE_API_KEY,
    },
  };
});
