import React, { useState, useEffect } from 'react'
import Popcorn from '../../assets/images/popcorn-png-3.png'
import CartIcon from '@heroicons/react/outline/ShoppingCartIcon'
import { useSelector } from 'react-redux'
import { Transition } from '@headlessui/react'

export default function Header() {
    const [profileModal, setProfileModal] = useState(false)
    const { auth } = useSelector((state) => state)

    return (

        <>
        <nav className="fixed z-50 flex items-center justify-between bg-red-600 w-full top-0">
                <div className='flex justify-start mt-3'>
                    <a className='inline-block'><img src={Popcorn} className="ml-10 py-2 px-2" alt='icon' width="60" height="60"></img></a>
                    <a className="text-white py-2 px-3 text-2xl relative mt-1 ml-5 inline" href='/mini-project/store/home'>Home</a>
                    <a className="text-white py-2 px-3 text-2xl relative mt-1 ml-5 inline" href='#'>Profile</a>
                </div>
                <div className='flex justify-end'>
                    <button className="py-2 px-3 mr-5 focus:outline-none inline"><CartIcon className='w-10 max-h-10 text-white mt-1' width='25' height='25'/></button>
                    <button onClick={()=> setProfileModal((profileModal) => !profileModal)} className='focus:outline-none'><img className="rounded-full ring-2 ring-white mr-10 inline relative mt-1 bg-white " src={`/api/users/avatar/${auth.userID}`} alt="avatar" width="25" height="25"/></button>
                    
                    <Transition show={profileModal} enter="transition-opacity duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="rounded-lg absolute right-0 w-40 mt-14 mr-7 py-1 bg-gray-800 border border-gray-800 ring-4 ring-gray-800">
                            <a href="#" className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-red-600 hover:bg-white">Profile</a>
                            <div className="py-2">
                                <hr></hr>
                            </div>
                            <a href="#" className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-red-600 hover:bg-white">Cart</a>
                            <div className="py-2">
                                <hr></hr>
                            </div>
                            <button className="w-full transition-colors duration-200 block px-4 py-2 text-normal text-left rounded-lg text-red-600 hover:text-white hover:bg-red-600">    
                                Logout
                            </button>
                        </div>
                    </Transition>

                </div>
            </nav>
        </>
    )
}
