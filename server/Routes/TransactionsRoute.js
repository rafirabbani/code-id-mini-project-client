import { Router } from 'express'
import IndexController from '../Controllers/IndexController'

const cart = IndexController.CartsController
const lineItem = IndexController.LineItemsController
const router = Router()

// Create New Open Cart and Add New Line Item
router.post('/cart', cart.openCart, lineItem.addLineItem, cart.getAllCarts)

//Update Existing Cart With New Line Item
router.put('/cart/update/:id', cart.updateCart, lineItem.addLineItem, cart.getAllCarts)

router.get('/cart', cart.getAllCarts)

export default router