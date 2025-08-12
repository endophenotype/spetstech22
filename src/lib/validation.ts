/**
 * Input validation and sanitization utilities
 */

/**
 * Validates and sanitizes phone number input
 * @param phone - The phone number string to validate
 * @returns Object with isValid boolean and sanitized phone number
 */
export function validatePhone(phone: string): { isValid: boolean; sanitized: string } {
  // Remove all non-digit characters except +
  const sanitized = phone.replace(/[^\d+]/g, '');
  
  // Check if it's a valid Russian phone number format
  const phoneRegex = /^(\+7|7|8)?[0-9]{10}$/;
  const isValid = phoneRegex.test(sanitized);
  
  return { isValid, sanitized };
}

/**
 * Validates email address format
 * @param email - The email string to validate
 * @returns Object with isValid boolean and sanitized email
 */
export function validateEmail(email: string): { isValid: boolean; sanitized: string } {
  // Basic email sanitization - trim whitespace
  const sanitized = email.trim().toLowerCase();
  
  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const isValid = emailRegex.test(sanitized);
  
  return { isValid, sanitized };
}

/**
 * Sanitizes text input to prevent XSS attacks
 * @param input - The text input to sanitize
 * @returns Sanitized string
 */
export function sanitizeTextInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Validates numeric input (volume, etc.)
 * @param value - The numeric value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Object with isValid boolean and parsed number
 */
export function validateNumeric(value: string, min = 0, max = Infinity): { isValid: boolean; parsed: number } {
  const parsed = parseFloat(value);
  const isValid = !isNaN(parsed) && parsed >= min && parsed <= max;
  
  return { isValid, parsed };
}