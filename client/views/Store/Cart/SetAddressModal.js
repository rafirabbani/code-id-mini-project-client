import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CartActions from '../../../Actions/CartActions'
import OrderActions from '../../../Actions/OrderAction'

export default function SetAddressModal(props) {
    //console.log(props)
    const [data, setData] = useState({
        city: undefined,
        address: undefined,
        subtotal: undefined,
        totalQTY: undefined,
        disc: undefined,
        tax: undefined,
        totalDue: undefined,
        userID: undefined
    })
    const [addressWarning, setAddressWarning] = useState(false)
    const [cityWarning, setCityWarning] = useState(false)
    const dispatch = useDispatch()
    

    useEffect(() => {
        setData({
            subtotal: props.subtotal,
            totalQTY: props.totalQTY,
            disc: props.disc,
            tax: props.tax,
            totalDue: props.totalDue,
            userID: JSON.parse(localStorage.getItem('data')).user_id
        })
    }, [])

    const handleChange = (name) => (event) => {
        if (name === 'city') {
            setCityWarning(false)
        }
        else {
            setAddressWarning(false)
        }
        setData({...data, [name]: event.target.value})
    }

    const modalClose = () => {
        props.setAddressModal(false)
    }

    const onClick = () => {
        console.log(window.location)
        if (!data.address) {
            setAddressWarning(true)
        }
        if (!data.city){
            setCityWarning(true)
        }
        if (data.address && data.city) {
            dispatch(OrderActions.createOrder(data)).then((response) => {
                if (response.status == 200) {
                    dispatch(CartActions.checkOut(props.cartID, response.data.order_name)).then(() => {
                        window.location.assign('/checkout')
                    })
                }
                else {
                    alert(`you have unfinished order`)
                    modalClose()
                }
            })
        }
        
    }

    return (
        <div className="backdrop-filter backdrop-blur-xl min-w-screen min-h-screen animated fadeIn faster fixed flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
            <div className="grid grid-cols-1 w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white ring-4 ring-blue-400 ">
                <div className="grid grid-cols-1">
                    <label className="text-center text-3xl font-bol">Input Your Address</label>
                    <div className="flex flex-row items-center justify-start mt-10">
                        <div className="grid grid-cols-1">
                            <label className="text-xl font-bold">City</label>
                            <input type="text" className="w-auto h-auto focus:outline-none focus:border-green-400 border-blue-400 border focus:ring-green-400 rounded-md px-1 py-1 mt-1"
                            onChange={handleChange('city')}/>
                            <label className="text-red-600 font-bold text-md" hidden={cityWarning ? false : true}>City Cannot be Empty</label>
                            <label className="mt-5 text-xl font-bold">Address</label>
                            <textarea className=" focus:outline-none focus:border-green-400 border-blue-400 border focus:ring-green-400 rounded-md px-1 py-1 mt-1"
                            onChange={handleChange('address')}/>
                            <label className="text-red-600 font-bold text-md" hidden={addressWarning ? false : true}>Address Cannot be Empty</label>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-end">
                        <button className="bg-red-600 text-center text-md px-2 py-2 rounded-md text-white focus:outline-none mx-3 text-lg"
                            onClick={modalClose}>Cancel</button>
                        <button className="bg-blue-600 text-center text-md px-2 py-2 rounded-md text-white focus:outline-none mx-3 text-lg"
                            onClick={onClick}>Checkout</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
