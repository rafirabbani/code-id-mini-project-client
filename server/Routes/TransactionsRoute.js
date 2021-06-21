import { Router } from 'express'
import IndexController from '../Controllers/IndexController'

const cart = IndexController.CartsController
const lineItem = IndexController.LineItemsController
const router = Router()

// Create New Open Cart and Add New Line Item
router.post('/cart/create', cart.openCart, lineItem.checkLineItem, lineItem.newLineItem, cart.getAllCartsByUser)

// Update Existing Cart With New Line Item
router.put('/cart/update/additem/:cart_id', cart.updateCart, lineItem.checkLineItem, lineItem.newLineItem, cart.getAllCartsByUser)

//Get Items by Order Name
router.get('/items/ordered/:order_name', lineItem.getItemsByOrderNum)

// Get All Open Carts
router.get('/cart/open', cart.getAllOpenCarts)

// Get All Close Carts
router.get('/cart/close', cart.getAllCloseCarts)

// Get All Open Carts for Single User
router.get('/cart/user/:user_id', cart.getAllCartsByUser)

// Update Existing Line Item On Single Carts
router.put('/cart/update/edititem/:line_item_id', lineItem.updateLineItem, cart.getOneCart)
router.delete('/cart/update/deleteitem/:line_item_id', lineItem.deleteLineItem)

// Delete Cart

// Sum Items On Cart
router.get('/cart/sum/:cart_id', cart.sumLineItems, lineItem.sumLineItems)

// Check Out
router.put('/cart/checkout/:cart_id', cart.updateCart, lineItem.bulkUpdateLineItems, cart.getOneCart)

// Get Cart by ID
router.get('/cart/:cart_id', cart.getOneCart)

//Update Ordered Items
router.put('/items/ordered/update/:order_name', lineItem.updateItemsByOrderNumber, lineItem.bulkUpdateLineItems, lineItem.getItemsByOrderNum)

export default router