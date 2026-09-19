import { Role, User } from "../models/index.js";
import { conflict, notFound } from "../utils/appError.js";

export const addRoleService = async (roleName) => {
    const normalized = String(roleName || "").trim().toUpperCase();
    if (!normalized) throw new Error("Role name is required");
    if (await Role.findOne({ where: { roleName: normalized } })) throw conflict("Role already exists");
    return Role.create({ roleName: normalized });
};

export const changeRoleByIdService = async ({ userId, roleName }) => {
    const user = await User.findByPk(userId);
    if (!user) throw notFound("User not found");
    const role = await Role.findOne({ where: { roleName: String(roleName).toUpperCase() } });
    if (!role) throw notFound("Role not found");
    await user.setRoles([role]);
    return { message: "Role successfully changed" };
};
