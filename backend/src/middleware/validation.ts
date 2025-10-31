import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));
      
      res.status(400).json({ error: 'Validation failed', details: errors });
      return;
    }
    
    next();
  };
};

// Common validation schemas
export const schemas = {
  requestOTP: Joi.object({
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone number must be in E.164 format',
      }),
  }),
  
  verifyOTP: Joi.object({
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required(),
    otp: Joi.string()
      .length(6)
      .pattern(/^\d+$/)
      .required()
      .messages({
        'string.length': 'OTP must be 6 digits',
        'string.pattern.base': 'OTP must contain only digits',
      }),
  }),
  
  createSubscription: Joi.object({
    type: Joi.string()
      .valid('mandi_price', 'weather', 'scheme')
      .required(),
    filter: Joi.object().required(),
    mode: Joi.string()
      .valid('whatsapp', 'sms', 'inapp')
      .default('whatsapp'),
  }),
  
  createOrder: Joi.object({
    amount: Joi.number().positive().required(),
    metadata: Joi.object().optional(),
  }),
  
  createHelpRequest: Joi.object({
    type: Joi.string().required(),
    description: Joi.string().optional(),
    attachments: Joi.array().items(Joi.string()).optional(),
  }),
};
