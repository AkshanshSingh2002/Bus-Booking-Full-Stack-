import { where } from "sequelize";
import Role from "../models/role.js";
import User from "../models/user.js";

export const addRoleService = async (roleName) => {
    const existingRole = await Role.findOne({
        where: {
            roleName: roleName
        }
    });

    if (existingRole) {
        throw new Error("Role already exists");
    }

    const role = await Role.create({
        roleName: roleName
    });

    return role
};

export const changeRoleByIdService = async (data) => {
    const user = await User.findByPk(data.userId);

    if (!user) {
        throw new Error("User not found");
    }

    const previousRoles = await user.getRoles();

    const newRole = await Role.findOne({
        where: {
            roleName: data.roleName
        }
    });

    if (!newRole) {
        throw new Error("Role not found");
    }

    await user.setRoles(newRole);

    return "Role Successfully changed";
};