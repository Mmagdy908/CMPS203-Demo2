import { Request, Response } from "express";
import userModel from "../models/userModel";
import { generateToken } from "../utils/authUtils";


export const registerController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password } = req.body;

        // Name not set
        if (!name) {
            return res.status(403).send({
                success: false,
                error: "Name is required"
            });
        }

        // Email not set
        if (!email) {
            return res.status(403).send({
                success: false,
                error: "Email is required"
            });
        }

        // Password not set
        if (!password) {
            return res.status(403).send({
                success: false,
                error: "Password is required"
            });
        }

        // User already exist
        if (await userModel.findOne({ email })) {
            return res.status(403).send({
                success: false,
                message: "This email already exist try login instead"
            });
        }

        const user = await userModel.create({ name, email, password })

        return res.status(201).send({
            success: true,
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email,
                token: await generateToken(String(user._id))
            }
        });

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Error in registration"
        });
    }
}

export const loginController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (user && await user.passwordMatch(password)) {
            return res.status(200).send({
                success: true,
                message: "Logged in successfully",
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: await generateToken(String(user._id))
                }
            });
        } else {
            return res.status(401).send({
                success: false,
                message: "Incorrect email or password"
            });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Error in login"
        });
    }
}
