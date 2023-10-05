import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql', // Change this to your desired database dialect (e.g., postgres, sqlite)
  host: 'localhost',
  username: 'root',
  password: 'Datta@123',
  database: 'sys',
});

export default sequelize;