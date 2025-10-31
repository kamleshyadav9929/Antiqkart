import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

let client: twilio.Twilio | null = null;

if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
}

export const sendSMS = async (to: string, message: string): Promise<void> => {
  if (!client || !phoneNumber) {
    console.warn('Twilio not configured. SMS not sent:', { to, message });
    return;
  }
  
  try {
    await client.messages.create({
      body: message,
      from: phoneNumber,
      to: to,
    });
    console.log('SMS sent successfully to:', to);
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

export const sendWhatsApp = async (to: string, message: string): Promise<void> => {
  if (!client || !whatsappNumber) {
    console.warn('Twilio WhatsApp not configured. Message not sent:', { to, message });
    return;
  }
  
  try {
    await client.messages.create({
      body: message,
      from: whatsappNumber,
      to: `whatsapp:${to}`,
    });
    console.log('WhatsApp message sent successfully to:', to);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    // Fallback to SMS
    console.log('Falling back to SMS...');
    await sendSMS(to, message);
  }
};

export const sendOTP = async (phone: string, otp: string): Promise<void> => {
  const message = `Your KisaanSaarthi OTP is: ${otp}. Valid for 5 minutes. Do not share with anyone.`;
  
  // Try SMS first (WhatsApp requires approved templates)
  await sendSMS(phone, message);
};
