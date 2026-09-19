import { Role } from "../models/index.js";

export const seedDefaultRoles = async () => {
    for (const roleName of ["USER", "ADMIN", "OPERATOR"]) {
        await Role.findOrCreate({ where: { roleName }, defaults: { roleName } });
    }
};
