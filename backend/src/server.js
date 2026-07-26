import dotenv from "dotenv";
dotenv.config();

import sequelize from "./config/database.js";

import "./models/index.js";

import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function startDB() {
    try {
        await sequelize.authenticate();
        console.log("Connectedt to the Database");

        await sequelize.sync({ alter: true });
        // await sequelize.sync({ force: true });
        console.log("Tables Synced");
    } catch (error) {
        console.error(error);
    }
}

startDB();
