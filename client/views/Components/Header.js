import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Popcorn from '../../assets/images/popcorn-png-3.png'
import CartIcon from '@heroicons/react/outline/ShoppingCartIcon'
import SearchIcon from '@heroicons/react/outline/SearchIcon'
import AuthActions from '../../Actions/AuthActions'
import { useSelector, useDispatch } from 'react-redux'
import { Transition } from '@headlessui/react'


export default function Header(props) {
    const [search, setSearch] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()
    const [profileModal, setProfileModal] = useState(false)
    const { auth, cart } = useSelector((state) => state)
    const { cartUser } = cart

    const handleLogout = () => {
        dispatch(AuthActions.signOut()).then(() => {
            history.push('/mini-project/signin')
        })

    }

    const handleSearch = (e) => {
        //console.log(e.target.value)
        setSearch(e.target.value)
    }

    const onSearch = () => {
        history.push(`/mini-project/movies/search/title?movie_title=${search}`)
        props.setNewSearch(true)
    }

    return (

        <>
        <nav className="fixed z-50 flex items-center justify-between bg-red-600 w-full top-0">
                <div className='flex justify-start mt-3'>
                    <img src={Popcorn} className="ml-10 py-2 px-2" alt='icon' style={{width: '70px', height: '75px'}}></img>
                    <a className="text-white py-2 px-3 text-2xl relative mt-1 ml-5 inline" href='/mini-project/store/home'>Home</a>
                    <a className="text-white py-2 px-3 text-2xl relative mt-1 ml-5 inline" href={`/mini-project/user/profile/${auth && auth.userID}`}>Profile</a>
                </div>
                <div>
                    <input className="text-sm px-1 py-5 border-black border-2 focus:outline-none" style={{width: '300px'}} placeholder="   Find Your Favorite Movie here..."
                    onChange={handleSearch}/>
                    <button className='bg-white text-black px-1 py-5 text-sm border-2 border-black border-l-0 hover:bg-gray-300 active:bg-gray-500 focus:outline-none relative' 
                    style={{top: '5px'}} onClick={onSearch}>
                        <SearchIcon className="w-5 h-5"/>
                    </button>
                </div>
                <div className='flex justify-end'>
                    <a className="py-2 px-3 mr-5 focus:outline-none inline" href="/mini-project/store/cart">
                        <a className="relative rounded-full px-2 py-1 text-md bg-black text-white font-bold z-10" >{cartUser && cartUser[0] ? cartUser[0].line_items.length ? cartUser[0].line_items.length : 0 : 0 }</a>
                        <CartIcon className='w-10 max-h-10 text-white mt-1 relative' style={{width: '50px', height: '50px', bottom:"12px"}}/>
                        
                    </a>
                    <button onClick={()=> setProfileModal((profileModal) => !profileModal)} onMouseOver={()=> setProfileModal(true)} /* onMouseOut={()=> setProfileModal(false)}  */
                        className='focus:outline-none active:outline-none' id="profile">
                        <img className="rounded-full ring-2 ring-white mr-10 inline relative mt-1 bg-white " src={auth.userID && `/api/users/avatar/${auth.userID}`} alt="avatar" style={{width: '35px', height: '35px'}}/>
                    </button>
                    
                    <Transition show={profileModal} enter="transition-opacity duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="group rounded-lg absolute right-0 w-40 mt-14 mr-7 py-1 bg-gray-800 border border-gray-800 ring-4 ring-gray-800">
                            <a href={`/mini-project/user/profile/${auth && auth.userID}`} className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-red-600 hover:bg-white focus:outline-none">Profile</a>
                            <div className="py-2">
                                <hr></hr>
                            </div>
                            <a href="/mini-project/store/cart" className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-red-600 hover:bg-white focus:outline-none">Cart</a>
                            <div className="py-2">
                                <hr></hr>
                            </div>
                            <button onClick={handleLogout} className="w-full transition-colors duration-200 block px-4 py-2 text-normal text-left rounded-lg text-red-600 hover:text-white hover:bg-red-600 focus:outline-none">    
                                Logout
                            </button>
                        </div>
                    </Transition>

                </div>
            </nav>
        </>
    )
}
