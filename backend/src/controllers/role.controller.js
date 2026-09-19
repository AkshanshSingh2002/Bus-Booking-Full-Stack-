import { addRoleService, changeRoleByIdService } from "../services/role.service.js";

export const addRole = async (req, res) => res.status(201).json({ success: true, data: await addRoleService(req.body.roleName) });
export const changeRoleById = async (req, res) => res.status(200).json({ success: true, data: await changeRoleByIdService(req.body) });
