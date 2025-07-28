import nodemailer from "nodemailer";

// Create a Nodemailer transporter using SMTP
// The configuration details are loaded from environment variables.
const transporter = nodemailer.createTransport({
  service: "smtp.gmail.com", // Use Gmail as the email service
  // host: process.env.EMAIL_SERVER_HOST,
  // port: parseInt(process.env.EMAIL_SERVER_PORT || "2552"), // Default to 587 if not set
  // secure: process.env.EMAIL_SERVER_PORT === "465", // Use SSL/TLS if port is 465
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  // Add better error handling for Gmail
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error("SMTP Configuration Error:", error);
  } else {
    console.log("SMTP Server is ready to send emails");
  }
});

/**
 * Sends a verification email to the user.
 * @param email The recipient's email address.
 * @param token The verification token (6-digit OTP).
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Sender address
      to: email, // List of recipients
      subject: "Verify your email address - Dara Hauls App", // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0056b3;">Email Verification</h2>
          <p>Thank you for registering! Please use the 6-digit code below to verify your email address:</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; letter-spacing: 8px; margin: 0;">${token}</h1>
          </div>
          <p>This code will expire in 1 hour.</p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Best regards,<br/>Dara Hauls Team</p>
        </div>
      `, // HTML body
    });
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending verification email to ${email}:`, error);
    throw new Error("Failed to send verification email.");
  }
};

/**
 * Sends a password reset email to the user.
 * @param email The recipient's email address.
 * @param token The password reset token.
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Reset your password for Dara Hauls App",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0056b3;">Password Reset Request</h2>
          <p>You have requested to reset your password. Please click the link below to proceed:</p>
          <p>
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px;">
              Reset Password
            </a>
          </p>
          <p>This link will expire in 1 hour.</p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Best regards,<br/>Dara Hauls Team</p>
        </div>
      `,
    });
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending password reset email to ${email}:`, error);
    throw new Error("Failed to send password reset email.");
  }
};

/**
 * Resends a verification email to the user.
 * @param email The recipient's email address.
 * @param token The verification token (6-digit OTP).
 */
export const resendVerificationEmail = async (email: string, token: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Sender address
      to: email, // List of recipients
      subject: "Resend: Verify your email address - Dara Hauls App", // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0056b3;">Email Verification (Resent)</h2>
          <p>You requested a new verification code. Please use the 6-digit code below to verify your email address:</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; letter-spacing: 8px; margin: 0;">${token}</h1>
          </div>
          <p>This code will expire in 1 hour.</p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Best regards,<br/>Dara Hauls Team</p>
        </div>
      `, // HTML body
    });
    console.log(`Verification email resent to ${email}`);
  } catch (error) {
    console.error(`Error resending verification email to ${email}:`, error);
    throw new Error("Failed to resend verification email.");
  }
};