import { where } from 'sequelize';
import Bus from '../models/bus.js';

export const createBusService = async (data) => {
    return await Bus.create(data);
};

export const getBusByIdService = async (id) => {
    return await Bus.findByPk(id);
};

export const getAllBusService = async () => {
    return await Bus.findAll();
};

export const deleteBusByIdService = async (id) => {
    return await Bus.destroy({
        where: {
            id
        }
    });
};