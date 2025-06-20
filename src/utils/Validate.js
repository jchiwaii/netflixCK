export const checkValidData = (email, password, fullName = null) => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid)
    return "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
  if (fullName !== null && fullName.trim().length < 2)
    return "Full name must be at least 2 characters";

  return null; // Return null if validation passes
};
