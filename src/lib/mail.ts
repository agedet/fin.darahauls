export const sendVerificationEmail = async (email: string, token: string) => {
  console.log(`[Verify Email] http://localhost:3000/api/verify?token=${token}`);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  console.log(`[Reset Password] http://localhost:3000/reset-password?token=${token}`);
};
