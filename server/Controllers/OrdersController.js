import { sequelize } from '../../config/config-db'

// Create Order
const createOrder = async (req, res) => {
    const currentDate = new Date()
    //console.log(currentDate.getTimezoneOffset())
    const currentDateStr = currentDate.toISOString().slice(0,10).replace(/\W/g, '')
    //console.log(currentDateStr)
    try {
        const orderSeqNumber = await sequelize.query(`select concat('-', to_char(nextval('orders_order_name_seq'),'0000'))`, {
            type: sequelize.QueryTypes.SELECT
        })
        const timeStamp = await sequelize.query(`select LOCALTIMESTAMP(0)`, {
            type: sequelize.QueryTypes.SELECT
        });
        const dateFromDB = new Date(timeStamp[0].localtimestamp)
        console.log(dateFromDB.toUTCString())
        //console.log(currentDate.valueOf() - dateFromDB.valueOf())
        //console.log(obj)
        //orderSeqNumber[0].concat.replace(/\s+/g, ''))
        const result = await req.context.models.Orders.create({
            order_name: `ORD${currentDateStr}${orderSeqNumber[0].concat.replace(/\s+/g, '')}`,
            order_created_on: dateFromDB,
            order_subtotal: req.body.order_subtotal,
            order_discount: req.body.order_discount,
            order_tax: req.body.order_tax,
            order_total_due: req.body.order_total_due,
            order_user_id: req.body.order_user_id
        })
        return res.send(result)
    }
    catch (err) {
        return res.send(err)
    }
    
}

export default {
    createOrder
}