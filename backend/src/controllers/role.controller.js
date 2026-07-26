import { addRoleService } from '../services/role.service.js';

export const addRole = async (req, res) => {
    try {
        const role = await addRoleService(req.body.roleName);
        
        res.status(200).json({
            success: true,
            message: "User LoggedIn",
            data: role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};