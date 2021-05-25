import users from './Users'
import movies from './Movies'
import casts from './Casts'
import comments from './Comments'
import carts from './Carts'
import line_items from './Line_Items'
import orders from './Orders'
import Sequelize from 'sequelize'
import { sequelize } from '../../config/config-db'

const models = {
    Users: users(sequelize, Sequelize),
    Movies: movies(sequelize, Sequelize),
    Casts: casts(sequelize, Sequelize),
    Comments: comments(sequelize, Sequelize),
    Carts: carts(sequelize, Sequelize),
    Line_Items: line_items(sequelize, Sequelize),
    Orders: orders(sequelize, Sequelize),
}

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export default models;