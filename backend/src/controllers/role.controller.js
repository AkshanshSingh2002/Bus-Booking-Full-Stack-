import { addRoleService, changeRoleByIdService } from '../services/role.service.js';

export const addRole = async (req, res) => {
    try {
        const role = await addRoleService(req.body.roleName);
        
        res.status(200).json({
            success: true,
            message: "Added the Role",
            data: role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const changeRoleById = async (req, res) => {
    try {
        const role = await changeRoleByIdService(req.body);
        
        res.status(200).json({
            success: true,
            message: "Role Changed",
            data: role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};