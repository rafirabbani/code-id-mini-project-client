import Sequelize from 'sequelize';
import config from './config'

// config database
const sequelize = new Sequelize({
  database: "d5hl1q5624h5se",
  username: "ctlefhhqsiumnk",
  password: "7644bd5514993de4227f29b4c098f5a25523c85b648d4e59994918899a05f883",
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