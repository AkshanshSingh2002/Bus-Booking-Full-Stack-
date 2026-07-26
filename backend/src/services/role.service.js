import { where } from "sequelize";
import Role from "../models/role.js";

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
}