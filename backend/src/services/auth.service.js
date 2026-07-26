import dotenv from "dotenv";
import User from "../models/user.js";
import Role from "../models/role.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { where } from "sequelize";

dotenv.config();

export const registerService = async (data) => {
    const existingUser = await User.findOne({
        where: {
            userName: data.userName
        }
    });

    if (existingUser) {
        throw new Error("User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(data.userPassword, 10);

    const user = await User.create({
        userName: data.userName,
        userEmail: data.userEmail,
        userPassword: hashedPassword,
        userMobileNumber: data.userMobileNumber
    });

    const role = await Role.findOne({
        where: {
            roleName: "USER"
        }
    });

    //     import { Op } from "sequelize";

    // const roles = await Role.findAll({
    //     where: {
    //         roleName: {
    //             [Op.in]: ["USER", "MANAGER"]
    //         }
    //     }
    // });
    await user.addRole(role);

    return user;
};

export const userLoginService = async (data) => {

    const user = await User.findOne({
        where: {
            userName: data.userName
        }
    });

    if (!user) {
        throw new Error("Invalid UserName");
    }

    const isPassword = await bcrypt.compare(
        data.userPassword,
        user.userPassword
    )

    if (!isPassword) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign(
        {
            id: user.id,
            userName: user.userName,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )

    return token;
};

