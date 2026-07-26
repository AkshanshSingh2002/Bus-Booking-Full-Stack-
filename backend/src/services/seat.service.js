import { where } from 'sequelize';
import Seat from '../models/seat.js';

export const createSeatService = async (data) => {
    return await Seat.create(data);
};

export const getSeatByIdService = async (id) => {
    return await Seat.findByPk(id);
};

export const getSeatByBusIdService = async (id) => {
    return await Seat.findAll({
        where: {
            busId: id
        }
    });
};

export const getAllSeatService = async () => {
    return await Seat.findAll();
};

export const deleteSeatByIdService = async (id) => {
    return await Seat.destroy({
        where: {
            id
        }
    });
};