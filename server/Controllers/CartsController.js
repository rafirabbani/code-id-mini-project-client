import { sequelize } from '../../config/config-db'

// Create New Open Cart
const openCart = async (req, res, next) => {
    try {
        const date = await sequelize.query(`SELECT CURRENT_DATE`, {
            type: sequelize.QueryTypes.SELECT
        })
        if (date) {
            try {
                const result = await req.context.models.Carts.create({
                    cart_created_on: date[0].current_date,
                    cart_status: 'OPEN',
                    cart_user_id: req.body.cart_user_id
                })
                if (result) {
                    req.cart = result.cart_id
                    next()
                }
                //console.log(result)
                //return res.send(result)
            }
            catch (err) {
                console.log(err)
                return res.status(500).send('Something Went Wrong When Creating Cart')
            }
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('Something Happenend')
    }
}

// Update Cart
const updateCart =  async (req, res, next) => {
    try {
        const result = await req.context.models.Carts.findOne({
            where: { cart_id: req.params.id }
        })
        if(result) {
            await req.context.models.Carts.update({
                cart_status: req.body.cart_status
            }, { where: { cart_id: req.params_id }
            })
            req.cart = req.params.id
            //console.log(result)
            next()
        }
        else {
            return res.status(404).send('Cart Not Found')
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

const getAllCarts = async (req, res) => {
    try {
        const result = await req.context.models.Carts.findAll({
            include: req.context.models.Line_Items
        })
        return res.send(result)
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export default {
    openCart,
    updateCart,
    getAllCarts
}