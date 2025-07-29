import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        gender: { 
            type: String, 
            enum: ["Male", "Female"], 
            required: true, 
        },
        country: {
            type: String,
            required: true,
        },
        state: { 
            type: String, 
            required: true 
        },
        role: {
            type: String,
            enum: ["user", "rider", "accounts", "manager", "admin"],
            default: "user",
            required: true,
        },
        emailVerified: { 
            type: Boolean, 
            default: false 
        },
        emailVerificationToken: { 
            type: String 
        },
        emailVerificationTokenExpires: { 
            type: Date 
        },
        passwordResetToken: { 
            type: String 
        },
        passwordResetTokenExpires: { 
            type: Date 
        },
    },
    { timestamps: true }
);

const Profile = mongoose.models.Profile ?? mongoose.model('Profile', profileSchema);

export default Profile;