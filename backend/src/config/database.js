import { Sequelize } from "sequelize";

const required = ["MYSQL_DATABASE", "MYSQL_USER", "MYSQL_HOST"];
for (const key of required) {
    if (!process.env[key]) throw new Error(`Missing required environment variable: ${key}`);
}

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD || "",
    {
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT || 3306),
        dialect: "mysql",
        logging: process.env.NODE_ENV === "development" ? console.log : false,
        define: { timestamps: true, underscored: true },
        pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
        dialectOptions: { connectTimeout: 10000 },
        retry: { max: 3 }
    }
);

export default sequelize;
