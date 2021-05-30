import { Router } from 'express'
import IndexController from '../Controllers/IndexController'

const cart = IndexController.CartsController
const lineItem = IndexController.LineItemsController
const router = Router()

// Create New Open Cart and Add New Line Item
router.post('/cart/create', cart.openCart, lineItem.addLineItem, cart.getAllCartsByUser)

// Update Existing Cart With New Line Item
router.put('/cart/update/additem/:cart_id', cart.updateCart, lineItem.addLineItem, cart.getAllCartsByUser)

// Get All Open Carts
router.get('/cart', cart.getAllCarts)

// Get All Open Carts for Single User
router.get('/cart/user/:user_id', cart.getAllCartsByUser)

// Update Existing Line Item On Single Carts
router.put('/cart/update/edititem/:line_item_id', lineItem.updateLineItem, cart.updateCart, cart.getAllCartsByUser)

// Delete Cart

// Sum Items On Cart
router.get('/cart/sum/:cart_id', cart.sumLineItems, lineItem.sumLineItems)

export default router