import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export enum Role {
  ADMIN,
  USER,
}

interface IUser {
  name: string;
  email: string;
  password: string;
  profile?: string;
  role: Role;
  passwordMatch(password: String): Boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    role: {
      type: Number,
      default: Role.USER,
      enum: Role,
    },
  },
  { timestamps: true }
);

// Check password
userSchema.methods.passwordMatch = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password on save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const saltRounds = process.env.PASSWORD_SALT || 10;
    this.password = await bcrypt.hash(this.password, +saltRounds);
  }
});

export default mongoose.model<IUser>("User", userSchema);
