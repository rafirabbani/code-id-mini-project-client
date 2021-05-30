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
                    line_item_status: req.body.line_item_status,
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
const sumLineItems = async (req, res, next) => {
    const movies = []
    const subTotal = {}
    //const subTotal = {}
    //console.log(req.items)
    //res.send(req.items)
    for (const item of req.items) {
        try {
            const result = await req.context.models.Movies.findOne({
                where: { movie_id: item.line_item_movie_id }
            })
            if (result) {
                let Movie = {}
                //Movie['movie_id'] = item.line_item_movie_id
                Movie['movie_qty'] = item.line_item_qty
                Movie['movie_price'] = result.movie_price 
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
        subTotal['subtotal'] =  movies.reduce((total, due) => ((total.movie_qty * total.movie_price) + (due.movie_qty * due.movie_price)))
        return res.send(subTotal)
    }
    else {
        //req.subTotal = movies[0].movie_qty * movies[0].movie_price
        subTotal['subtotal'] = movies[0].movie_qty * movies[0].movie_price
        return res.send(subTotal)
    }
    
    //next()
    //return res.send(req.subTotal)
}


export default {
    addLineItem,
    updateLineItem,
    sumLineItems
}