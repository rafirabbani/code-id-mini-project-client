// Add Line Item to Cart
const addLineItem = async (req, res, next) => {
    //console.log(req.cart)
    //res.send('Masuk Line Item')
    try {
        const result = await req.context.models.Line_Items.create({
            line_item_qty: req.body.line_item_qty,
            line_item_status: 'CART',
            line_item_movie_id: req.body.line_item_movie_id,
            line_item_cart_id: req.cart
        })
        if (result) {
            next()
        }
        //console.log(result)
        //return res.send(result)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

export default {
    addLineItem,

}