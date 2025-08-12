/**
 * Security utilities for cookie management and other security features
 */

/**
 * Sets a secure cookie with proper security attributes
 * @param name - Cookie name
 * @param value - Cookie value
 * @param maxAge - Max age in seconds
 * @param secure - Whether to set Secure flag (defaults to true in production)
 */
export function setSecureCookie(
  name: string, 
  value: string, 
  maxAge: number, 
  secure = window.location.protocol === 'https:'
): void {
  const secureFlag = secure ? '; Secure' : '';
  const sameSiteFlag = '; SameSite=Strict';
  
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}${secureFlag}${sameSiteFlag}`;
}

/**
 * Creates a safe CSS style string by validating and sanitizing CSS content
 * @param css - CSS content to sanitize
 * @returns Sanitized CSS string
 */
export function sanitizeCSS(css: string): string {
  // Remove potentially dangerous CSS properties and values
  return css
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/expression\s*\(/gi, '') // Remove CSS expressions
    .replace(/url\s*\(\s*["']?javascript:/gi, '') // Remove javascript: in URLs
    .replace(/@import/gi, '') // Remove @import statements
    .replace(/behavior\s*:/gi, '') // Remove IE behavior property
    .trim();
}