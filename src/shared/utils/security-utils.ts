export const sanitizeUser = (user: any) => {
  const { password, resetTokens, ...sanitized } = user
  return sanitized
}
