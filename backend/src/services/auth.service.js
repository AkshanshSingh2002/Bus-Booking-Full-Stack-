import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Role } from "../models/index.js";
import redis from "../config/redis.js";
import { badRequest, conflict, notFound, unauthorized } from "../utils/appError.js";

const publicUser = (user) => ({
    userId: user.userId,
    userName: user.userName,
    userEmail: user.userEmail,
    userMobileNumber: user.userMobileNumber,
    roles: user.roles?.map((role) => role.roleName) || []
});

export const registerService = async ({ userName, userEmail, userPassword, userMobileNumber }) => {
    if (!userName || !userEmail || !userPassword || !userMobileNumber) throw badRequest("All registration fields are required");
    const existing = await User.findOne({ where: { userName } });
    const existingEmail = await User.findOne({ where: { userEmail } });
    if (existing || existingEmail) throw conflict("Username or email already exists");

    const role = await Role.findOne({ where: { roleName: "USER" } });
    if (!role) throw new Error("USER role is not configured");

    const user = await User.create({ userName, userEmail, userPassword: await bcrypt.hash(userPassword, 12), userMobileNumber });
    await user.addRole(role);
    await redis.del(`user:${user.userId}`);
    return publicUser({ ...user.toJSON(), roles: [role] });
};

export const userLoginService = async ({ userName, userPassword }) => {
    const user = await User.findOne({ where: { userName }, include: [{ model: Role, as: "roles", attributes: ["roleName"] }] });
    if (!user || !(await bcrypt.compare(userPassword || "", user?.userPassword || ""))) throw unauthorized("Invalid username or password");
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured");

    const roles = user.roles.map((role) => role.roleName);
    const token = jwt.sign({ userId: user.userId, userName: user.userName, roles }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "15m" });
    return { token, user: publicUser(user) };
};

export const getUserByIdService = async (userId) => {
    const cache = await redis.get(`user:${userId}`);
    if (cache) return JSON.parse(cache);
    const user = await User.findByPk(userId, { attributes: { exclude: ["userPassword"] }, include: [{ model: Role, as: "roles", attributes: ["roleName"] }] });
    if (!user) throw notFound("User not found");
    const data = publicUser(user);
    await redis.set(`user:${userId}`, JSON.stringify(data), "EX", 300);
    return data;
};
