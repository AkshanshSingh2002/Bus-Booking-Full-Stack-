import dotenv from "dotenv";
import User from "../models/user.js";
import Role from "../models/role.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import redis from "../config/redis.js"
import { Model, where } from "sequelize";

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
    const userRole = await user.addRole(role);

    const userCache = {
        userId: user.userId,
        userName: user.userName,
        userEmail: user.userEmail,
        userMobileNumber: user.userMobileNumber,
        userRole: userRole
    };  

    await redis.set(`user:${user.userId}`, JSON.stringify(userCache), "EX", 300);

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

export const getUserByIdService = async (userId) => {

    const cacheUser = await redis.get(`user:${userId}`);

    if (cacheUser) {
        return JSON.parse(cacheUser);
    }

    const user = await User.findByPk(userId, {
        include: {
            model: Role,
            as: "roles",
            attributes: ["roleName"]
        }
    });

    if (!user) {
        throw new Error("User not found! Please check user ID");
    }

    await redis.set(
        `user:${userId}`,
        JSON.stringify(user),
        "EX",
        120
    );

    return user;
};

