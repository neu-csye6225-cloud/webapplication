import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()
const sequelize = new Sequelize({
  dialect: process.env.DIALECT, // Change this to your desired database dialect (e.g., postgres, sqlite)
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.MYSQL_DATABASE,
  
});

export default sequelize;