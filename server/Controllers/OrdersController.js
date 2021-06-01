//import { sequelize } from '../../config/config-db'

// Create New Open Order
const createOrder = async (req, res) => {
    //console.log(req.body)
    req.tax = 0.1
    if (req.body.order_total_qty > 2) {
        req.disc = 0.05
    }
    else {
        req.disc = 0
    }
    const totalDue = (req.body.order_subTotal - (req.body.order_subtotal * req.disc)) + ((req.body.order_subTotal - (req.body.order_subtotal * req.disc)) * req.tax)
    try {
        const result = await req.context.models.Orders.findAll({
            where: { order_user_id: req.body.order_user_id, order_status: 'OPEN' }
        })
        if (result.length > 0) {
            return res.status(400).send('You Have Unfinished Order')
        }
        else {
            try {
                const result = await req.context.models.Orders.create({
                    order_subtotal: req.body.order_subtotal,
                    order_discount: req.disc,
                    order_tax: req.tax,
                    order_total_due: totalDue, 
                    order_total_qty: req.body.order_total_qty,
                    order_status: 'OPEN',
                    order_user_id: req.body.order_user_id,
                })
                return res.send(result)
                
            }
            catch (err) {
                return res.status(500).send('Something Went Wrong')
            }
        }
    }
    catch (err) {   
        console.log(err)
        return res.status(500).send('Something Went Wrong')
    }
}

// Get All Orders for Single User
const getAllOrdersUser = async (req, res) => {
    try {
        const result = await req.context.models.Orders.findAll({
            where: { order_user_id: req.params.user_id }
        })
        if (result.length > 0) {
            return res.send(result)
        }
        else {
            return res.send('You Havent Order Anything')
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('Something Went Wrong')
    }
}

// Update Order by ID 
const updateOrder = async (req, res, next) => {
    try {
        const result = await req.context.models.Orders.update({
            order_status: req.body.order_status,
            order_pay_trx_num: req.body.order_pay_trx_num,
            order_city: req.body.order_city,
            order_address: req.body.order_address
        }, {
            where: { order_name: req.params.order_name }
        })
        if (result.length > 0) {
            next()
        }
        else {
            return res.status(404).send('Order Not Found')
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('Something Went Wrong')
    }
}

//Get Order by order_name 
const getOrderByName = async (req, res) => {
    try {
        const result = await req.context.models.Orders.findOne({
            where: { order_name: req.params.order_name }
        })
        if (result) {
            return res.send(result)
        }
        else {
            return res.status(404).send('Order Not Found')
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('Something Went Wrong')
    }
}

export default {
    createOrder,
    getAllOrdersUser,
    updateOrder,
    getOrderByName
}