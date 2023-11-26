import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()
const sequelize = new Sequelize({


  dialect: "mysql",//process.env.DB_DIALECT,
  host:"localhost", //process.env.MYSQL_HOST,
  username: "root",//process.env.MYSQL_USER,
  password: "root",//process.env.MYSQL_PASSWORD,
  database: "sys",//process.env.MYSQL_DATABASE,
  
});
export default sequelize;