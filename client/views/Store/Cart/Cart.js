import React, { useEffect, useState } from 'react'
import Item from './Item'
import ItemUpdateModal from './ItemUpdateModal'
import ItemDeleteModal from './ItemDeleteModal'
import AddressModal from './SetAddressModal'
import BuyWarningModal from './BuyWarningModal'
import Header from '../../Components/Header'
import CartActions from '../../../Actions/CartActions'
import ItemActions from '../../../Actions/ItemActions'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function Cart() {
    const [cartEmpty, setCartEmpty] = useState(false)
    const [totalDue, setTotalDue] = useState(0)
    const [totalQTY, setTotalQTY] = useState(0)
    const [disc, setDisc] = useState(0)
    const [tax, setTax] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [itemUpdateModal, setItemUpdateModal] = useState(false)
    const [itemDeleteModal, setItemDeleteModal] = useState(false)
    const [addressModal, setAddressModal] = useState(false)
    const [buyWarningModal, setBuyWarningModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const { cart, auth, item, order } = useSelector((state) => state)
    const { cartUser } = cart
    const { itemInfo } = item
    const { createdOrder } = order

    useEffect(() => {
        dispatch(CartActions.getCartUser(auth.userID))
    }, [])

    useEffect(() => {
        if (cartUser && cartUser.length > 0) {
            dispatch(ItemActions.sumItems(cartUser[0].cart_id))
        }
        if (cartUser) {
            if (cartUser.length > 0) {
                if (cartUser[0].line_items.length > 0){
                    setCartEmpty(false)
                }
                else {
                    setCartEmpty(true)
                }
            }
            else setCartEmpty(true)
        }
    }, [cartUser])

    useEffect(() => {
        if (itemInfo) {
            const { total_due, total_qty, disc, tax, subtotal } = itemInfo
            setSubtotal(subtotal)
            setTotalQTY(total_qty)
            setDisc(disc)
            setTax(tax)
            setTotalDue(total_due)
        }
        setUpdate(false)

    }, [ itemInfo ])  

    useEffect(() => {
        dispatch(CartActions.getCartUser(auth.userID))
        if (cartUser && cartUser.length > 0) {
            dispatch(ItemActions.sumItems(cartUser[0].cart_id))
        }
        //dispatch(ItemActions.sumItems(cartUser[0].cart_id))
        setUpdate(false)
    }, [update])

    const onClick = () => {
        if (!cartEmpty) {
            setAddressModal(true)
        }
        else {
            setBuyWarningModal(true)
        }
        
    }

    return (
        <div>
            <Header/>
            <div className="flex flex-row min-w-screen items-center justify-between mt-20">
                <div className="flex flex-col flex-wrap pl-36 py-5 text-black">
                    <div className="flex flex-col h-screen">
                        <div className="py-5">
                            <label className="text-4xl text-black px-1 py-5">Your Cart</label>
                        </div>
                        <div className="text-3xl text-black text-center" hidden={cartEmpty ? false : true}>Cart Empty</div>
                         {
                            cartUser && cartUser.length > 0 ? cartUser[0].line_items.map((item) => (
                                <Item key={item.line_item_id} movieID={item.line_item_movie_id} lineItemID={item.line_item_id} qty={item.line_item_qty} 
                                setUpdate={()=> setUpdate(true)} setItemUpdateModal={()=> setItemUpdateModal(true)}
                                setItemDeleteModal={()=> setItemDeleteModal(true)}/>
                            )) : null
                        }
                        {/* <div className='py-5'>{cartUser && cartUser[0].cart_id}</div> */}
                    </div>
                </div>
                <div className="flex flex-col flex-wrap pr-36 py-5 fixed right-5 top-24">
                    <div className="flex flex-col">
                        <div className='py-5'>
                            <div className="flex flex-wrap flex-col flex-grow-0 px-5 py-5 ring-2 ring-red-600 rounded-md">
                                <label className='text-3xl text-center text-red-600'>Cart Summary</label>
                                <span className="flex flex-col mt-5">
                                <label className="text-red-600 text-md">Subtotal: {`Rp${subtotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</label>
                                    <label className="text-red-600 text-md mt-1">Total DVD(s): {totalQTY}</label>
                                    <label className="text-red-600 text-md mt-1">Discount: {`Rp${disc.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</label>
                                    <label className="text-red-600 text-md mt-1">Tax: {`Rp${tax.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</label>
                                    <label className="text-red-600 text-md mt-1">Total Due: {`Rp${totalDue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</label>
                                </span>
                                <button className="text-white w-full bg-red-600 py-1 mt-4 rounded-lg hover:ring-2 ring-white active:bg-red-800 focus:outline-none hover:bg-red-400" 
                                onClick={onClick}>Confirm & Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            {
                itemUpdateModal ? <ItemUpdateModal setItemUpdateModal={()=> setItemUpdateModal(false)}/> : null
            }
            {
                itemDeleteModal ? <ItemDeleteModal setItemDeleteModal={()=> setItemDeleteModal(false)}/> : null
            }
            {
                addressModal ? <AddressModal setAddressModal={()=> setAddressModal(false)} subtotal={subtotal} 
                totalQTY={totalQTY} disc={disc} tax={tax} totalDue={totalDue} cartID={cartUser && cartUser[0].cart_id}/> : null
            }
            {
                buyWarningModal ? <BuyWarningModal setBuyWarningModal={()=> setBuyWarningModal(false)}/> : null
            }
        </div>
    )
}
