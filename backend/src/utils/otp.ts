import redis from './redis';

const OTP_EXPIRY = 300; // 5 minutes in seconds
const MAX_ATTEMPTS = 3;

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOTP = async (phone: string, otp: string): Promise<void> => {
  const key = `otp:${phone}`;
  await redis.setex(key, OTP_EXPIRY, otp);
  await redis.setex(`${key}:attempts`, OTP_EXPIRY, '0');
};

export const verifyOTP = async (phone: string, otp: string): Promise<boolean> => {
  const key = `otp:${phone}`;
  const attemptsKey = `${key}:attempts`;
  
  const storedOTP = await redis.get(key);
  if (!storedOTP) {
    throw new Error('OTP expired or not found');
  }
  
  const attempts = parseInt(await redis.get(attemptsKey) || '0');
  if (attempts >= MAX_ATTEMPTS) {
    await redis.del(key, attemptsKey);
    throw new Error('Maximum OTP attempts exceeded');
  }
  
  if (storedOTP !== otp) {
    await redis.incr(attemptsKey);
    return false;
  }
  
  // OTP verified, clean up
  await redis.del(key, attemptsKey);
  return true;
};

export const getOTPAttempts = async (phone: string): Promise<number> => {
  const attemptsKey = `otp:${phone}:attempts`;
  return parseInt(await redis.get(attemptsKey) || '0');
};
