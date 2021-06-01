// Add Line Item to Cart
const addLineItem = async (req, res, next) => {
    //console.log(req.cart)
    //res.send('Masuk Line Item')
    try {
        const result = await req.context.models.Line_Items.create({
            line_item_qty: req.body.line_item_qty,
            line_item_status: 'CART',
            line_item_movie_id: req.body.line_item_movie_id,
            line_item_cart_id: req.params.cart_id
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

// Update Single Line Item by ID
const updateLineItem = async (req, res, next) => {
    try {
        const result = await req.context.models.Line_Items.findOne({
            where: { line_item_id: req.params.line_item_id }
        })
        if (result) {
            try {
                const update = await req.context.models.Line_Items.update({
                    line_item_qty: req.body.line_item_qty,
                    //line_item_status: req.body.line_item_status,
                    line_item_movie_id: req.body.line_item_movie_id
                }, {
                    where: { line_item_id: req.params.line_item_id }
                })
                if (update) {
                    req.params.cart_id = result.line_item_cart_id
                    next()
                }
                else {
                    return res.status(500).send('Something Went Wrong')
                }
            }
            catch (err) {
                console.log(err)
                return res.status(500).send('Something Went Wrong')
            }
        }
        else {
            return res.status(404).send('Item Not Found')
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('Something Went Wrong')
    }
    
}

// Sum Line Items On Single Cart 
const sumLineItems = async (req, res) => {
    const movies = []
    const subTotal = {}
    //console.log(req.items)
    //res.send(req.items)
    for (const item of req.items) {
        try {
            const result = await req.context.models.Movies.findOne({
                where: { movie_id: item.line_item_movie_id }
            })
            if (result) {
                let Movie = {}
                Movie['movie_id'] = item.line_item_movie_id
                Movie['qty'] = item.line_item_qty
                //Movie['movie_price'] = result.movie_price 
                Movie['subtotal'] = item.line_item_qty * result.movie_price
                

                movies.push(Movie)
            }
            else {
                return res.status(500).send('Something Went Wrong')
            }
            
        }
        catch (err) {
            console.log(err)
            return res.status(500).send('Something Went Wrong')
        }
    }
    if (movies.length > 1) {
        subTotal['total_due'] =  movies.reduce((total, subtotal) => ((total.subtotal + subtotal.subtotal)))
        subTotal['total_qty'] = movies.reduce((total, qty) => (total.qty + qty.qty))
        //subTotal['movies'] = movies
        return res.send(subTotal)
    }
    else {
        subTotal['total_due'] = movies[0].qty * movies[0].subtotal
        subTotal['total_qty'] = movies[0].qty
        //subTotal['movies'] = movies
        return res.send(subTotal)
    }
}

// Update All Line Items on Cart
const bulkUpdateLineItems = async (req, res, next) => {
    //const result = []
    for (const item of req.items) {
        try {
            await req.context.models.Line_Items.update({
                line_item_status: req.body.line_item_status, 
                line_item_order_name: req.body.line_item_order_name
            }, { where: { line_item_id: item.line_item_id } })
        }
        catch (err) {
            console.log(err)
            return res.status(500).send('Something Went Wrong')
        }
    }
    next()
    //return res.send(result)
}


export default {
    addLineItem,
    updateLineItem,
    sumLineItems,
    bulkUpdateLineItems
}