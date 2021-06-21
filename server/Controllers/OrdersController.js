//import { sequelize } from '../../config/config-db'
import { Op } from 'sequelize'

// Create New Open Order
const createOrder = async (req, res) => {
    try {
        const result = await req.context.models.Orders.findAll({
            where: { order_user_id: req.body.userID, order_status: 'OPEN' }
        })
        if (result.length > 0) {
            return res.status(400).send('You Have Unfinished Order')
        }
        else {
            //console.log(req.body)
            try {
                const result = await req.context.models.Orders.create({
                    order_subtotal: req.body.subtotal,
                    order_discount: req.body.disc,
                    order_tax: req.body.tax,
                    order_total_due: req.body.totalDue, 
                    order_total_qty: req.body.totalQTY,
                    order_status: 'OPEN',
                    order_user_id: req.body.userID,
                    order_city: req.body.city,
                    order_address: req.body.address
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
            where: { order_user_id: req.params.user_id },
            order: [
                ['order_created_on', 'DESC']
            ]
            
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
        }, {
            where: { order_name: req.params.order_name }
        })
        if (result) {
            //return res.send(result)
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

const getOpenOrderByUser  = async (req, res) => {
    try {
        const result = await req.context.models.Orders.findOne({
            where: { order_user_id: req.params.user_id, order_status: 'OPEN' }
        })
        if (result) 
        return res.status(200).send(result)
        else return res.status(404).send('No Order Found')
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('Something Went Wrong')
    }
}

const getPaidOrderByUser = async (req, res) => {
    try {
        const result = await req.context.models.Orders.findAll({
            where: { order_user_id: req.params.user_id, order_status: 'PAID' },
            order: [
                ['order_created_on', 'DESC']
            ]
            
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

const getCancelledOrderByUser = async (req, res) => {
    try {
        const result = await req.context.models.Orders.findAll({
            where: { order_user_id: req.params.user_id, order_status: 'CANCELLED' },
            order: [
                ['order_created_on', 'DESC']
            ]
            
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

export default {
    createOrder,
    getAllOrdersUser,
    updateOrder,
    getOrderByName,
    getOpenOrderByUser,
    getPaidOrderByUser,
    getCancelledOrderByUser
}