import React, { useEffect, useState } from 'react'
import Item from './Item'
import ItemUpdateModal from './ItemUpdateModal'
import ItemDeleteModal from './ItemDeleteModal'
import Header from '../../Components/Header'
import CartActions from '../../../Actions/CartActions'
import ItemActions from '../../../Actions/ItemActions'
import { useSelector, useDispatch } from 'react-redux'

export default function Cart() {
    const [totalDue, setTotalDue] = useState([])
    const [totalQTY, setTotalQTY] = useState([])
    const [itemUpdateModal, setItemUpdateModal] = useState(false)
    const [itemDeleteModal, setItemDeleteModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const dispatch = useDispatch()
    const { cart, auth, item } = useSelector((state) => state)
    const { cartUser } = cart
    const { itemInfo } = item

    useEffect(() => {
        dispatch(CartActions.getCartUser(auth.userID))
        dispatch(ItemActions.sumItems(JSON.parse(localStorage.getItem('cartID'))))
    }, [])

    useEffect(() => {
        if (itemInfo) {
            const { total_due, total_qty } = itemInfo
            setTotalDue(total_due.subtotal)
            setTotalQTY(total_qty.qty)
        }
        setUpdate(false)

    }, [itemInfo, update, totalDue, totalQTY])

    useEffect(() => {
        dispatch(CartActions.getCartUser(auth.userID))
        dispatch(ItemActions.sumItems(JSON.parse(localStorage.getItem('cartID'))))
        setUpdate(false)
    }, [update])

    /* useEffect(() => {
        if (!sumItems)
        dispatch(CartActions.sumItems(cartUser[0].cart_id))
    }, [cartUser, sumItems]) */

    const onClick = () => {
        console.log(totalDue, totalQTY)
        //dispatch(ItemActions.getItemInfo(data))
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
                        {
                            cartUser && cartUser[0].line_items.map((item) => (
                                <Item key={item.line_item_id} movieID={item.line_item_movie_id} lineItemID={item.line_item_id} qty={item.line_item_qty} 
                                setUpdate={()=> setUpdate(true)} setItemUpdateModal={()=> setItemUpdateModal(true)}
                                setItemDeleteModal={()=> setItemDeleteModal(true)}/>
                            ))
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
                                    <label className="text-red-600 text-md">Total Due: {itemInfo && `Rp${totalDue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</label>
                                    <label className="text-red-600 text-md mt-1">Total DVD(s): {itemInfo && totalQTY}</label>
                                </span>
                                <button className="text-white w-full bg-red-600 py-1 mt-4 rounded-lg hover:ring-2 ring-white active:bg-red-800 focus:outline-none hover:bg-red-400" 
                                onClick={onClick}>Buy</button>
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
        </div>
    )
}
