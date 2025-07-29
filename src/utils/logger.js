// Sanitize error messages to prevent sensitive data leaks
const sanitizeError = (error) => {
  if (!error) return "Unknown error";

  // Remove sensitive information from error messages
  const sensitivePatterns = [
    /Bearer [A-Za-z0-9-._~+/]+=*/g, // Bearer tokens
    /password=[^&]*/g, // Password params
    /email=[^&]*/g, // Email params
    /token=[^&]*/g, // Token params
    /key=[^&]*/g, // API keys
  ];

  let errorMessage = error.message || error.toString();
  sensitivePatterns.forEach((pattern) => {
    errorMessage = errorMessage.replace(pattern, "[REDACTED]");
  });

  return errorMessage;
};

// Production-safe logger
export const logger = {
  error: (message, error) => {
    if (import.meta.env.MODE === "development") {
      console.error(message, sanitizeError(error));
    } else {
      // In production, you might want to send this to a logging service
      // For now, we'll just log sanitized errors
      console.error(message, sanitizeError(error));
    }
  },

  // Only log in development
  debug: (...args) => {
    if (import.meta.env.MODE === "development") {
      console.log(...args);
    }
  },
};

export default logger;
