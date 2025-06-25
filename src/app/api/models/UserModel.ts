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
        phoneNumber: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        emailVerified: { 
            type: Boolean, 
            default: false 
        },
        userRole: {
            type: String,
            enum: ["user", "rider", "manager", "admin"],
            default: "user",
        },
        verificationToken: String,
        resetToken: String,
        resetTokenExpiry: Date,
    },
    { timestamps: true }
);

const Profile = mongoose.models.Profile ?? mongoose.model('Profile', profileSchema);

export default Profile;