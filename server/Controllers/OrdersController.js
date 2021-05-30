import { sequelize } from '../../config/config-db'

// Create Order
const createOrder = async (req, res) => {
    try {
        /* const query = await sequelize.query(`select concat('ORD', CURRENT_DATE, '-', to_char(nextval('orders_order_name_seq'),'0000')), LOCALTIMESTAMP(0)`, {
            type: sequelize.QueryTypes.SELECT
        })
        if (query.length > 0) {
            console.group(query[0].localtimestamp)
            return res.send(query)
            
        } */

        const result = await req.context.models.Orders.create({
            //order_name: `ORD${currentDateStr}${orderSeqNumber[0].concat.replace(/\s+/g, '')}`,
            //order_created_on: Date.now(),
            order_subtotal: req.body.order_subtotal,
            order_discount: req.body.order_discount,
            order_tax: req.body.order_tax,
            order_total_due: req.body.order_total_due,
            order_user_id: req.body.order_user_id
        })
        console.log(Date.now().toString())
        return res.send(result)
        
    }
    catch (err) {
        return res.status(500).send(err)
    }
    
    
}

export default {
    createOrder
}