import JWT, { Secret } from "jsonwebtoken";

export const generateToken = async (id: String) => {
  if (process.env.JWT_SECRET) {
    const JWT_SECRET: Secret = process.env.JWT_SECRET || "";
    return JWT.sign({ id }, JWT_SECRET, {
      expiresIn: "30d",
    });
  }

  throw new Error("JWT_SECRET token not set");
};
