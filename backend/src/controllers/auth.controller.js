import { userLoginService, registerService, getUserByIdService } from '../services/auth.service.js';

export const loginUser = async (req, res) => {
    try {
        const user = await userLoginService(req.body);

        res.status(200).json({
            success: true,
            message: "User LoggedIn",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const registerUser = async (req, res) => {
    try {
        const user = await registerService(req.body);

        res.status(200).json({
            success: true,
            message: "User Registered",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await getUserByIdService(req.params.userId);

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        });        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}