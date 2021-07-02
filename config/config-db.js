import Sequelize from 'sequelize';
import config from './config'

// config database
const sequelize = new Sequelize({
  database: "d5hl1q5624h5se",
  username: "ctlefhhqsiumnk",
  password: "8257e77721cace524b3879cc4f0f2601cb7eb0332f112c76b6707b11e19810ea",
  host: "ec2-50-17-255-120.compute-1.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false, // This line will fix new error
    },
  },
});
  
  sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.log(err));

export {sequelize};