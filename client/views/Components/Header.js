import React, { useState } from 'react'
import Popcorn from '../../assets/images/popcorn-png-3.png'
import CartIcon from '@heroicons/react/outline/ShoppingCartIcon'
import SearchIcon from '@heroicons/react/outline/SearchIcon'
import AuthActions from '../../Actions/AuthActions'
import { useSelector, useDispatch } from 'react-redux'
import { Transition } from '@headlessui/react'
import { useHistory } from 'react-router-dom'


export default function Header(props) {
    const [search, setSearch] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const [genreModal, setGenreModal] = useState(false)
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch()
        }
    }

    const onSearch = () => {
        window.location.assign(`/mini-project/movies/search/title?movie_title=${search}`)
        props.setNewSearch(true)
    }

    const onGenre = (genre) => {
        window.location.assign(`/mini-project/movies/search/genre?movie_genre=${genre}`)
        props.setNewSearch(true)
    }

    return (

        <>
        <nav className="fixed z-50 flex items-center justify-between bg-red-600 w-full top-0">
                <div className='flex justify-start mt-3'>
                    <img src={Popcorn} className="ml-10 py-2 px-2" alt='icon' style={{width: '70px', height: '75px'}}></img>
                    <a className="text-white py-2 px-3 text-2xl relative mt-1 ml-5 inline" href='/mini-project/store/home'>Home</a>
                    <a className="text-white py-2 px-3 text-2xl relative mt-1 ml-5 inline" href={`/mini-project/user/profile`}>Profile</a>
                    <button className="text-white px-3 text-2xl relative mb-5 ml-5 inline focus:outline-none" onMouseOver={()=> setGenreModal(true)} onMouseOut={()=> setGenreModal(false)}>Genre</button>
                    <a className="text-white py-2 px-3 text-2xl relative mt-1 ml-5 inline" href={`/mini-project/admin/home`} style={auth && auth.userType !== "ADMIN" ? {visibility: "hidden"} : {visibility: "visible"}}>Admin</a>
                </div>
                <div>
                    <input className="text-sm px-5 py-5 border-black border-2 focus:outline-none" style={{width: '300px'}} placeholder="Find Your Favorite Movie here..."
                    onChange={handleSearch} onKeyDown={handleKeyDown}/>
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
                    <button onMouseOver={()=> setProfileModal(true)} onMouseOut={()=> setProfileModal(false)}
                        className='focus:outline-none active:outline-none' id="profile">
                        <img className="rounded-full ring-2 ring-white mr-10 inline relative mt-1 bg-white " src={auth.userID && `/api/users/avatar/${auth.userID}`} alt="avatar" style={{width: '35px', height: '35px'}}/>
                    </button>
                    
                    <Transition show={profileModal} enter="transition-opacity duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="group rounded-lg absolute right-0 w-40 mt-14 mr-7 py-1 bg-gray-800 border border-gray-800 ring-4 ring-gray-800" onMouseOut={()=> setProfileModal(false)} onMouseOver={()=> setProfileModal(true)}>
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
                    <Transition show={genreModal} enter="transition-opacity duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="group rounded-lg absolute left-80 mt-16 py-1 bg-red-600 border border-gray-200 ring-4 ring-gray-200 flex flex-col flex-wrap max-h-36 w-72" onMouseOut={()=> setGenreModal(false)} onMouseOver={()=> setGenreModal(true)}>
                            <button onClick={()=> onGenre('Action')} className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-gray-800 hover:bg-white focus:outline-none">Action</button>
                            <button onClick={()=> onGenre('Adventure')} className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-gray-800 hover:bg-white focus:outline-none">Adventure</button>
                            <button onClick={()=> onGenre('Comedy')} className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-gray-800 hover:bg-white focus:outline-none">Comedy</button>
                            <button onClick={()=> onGenre('Crime')} className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-gray-800 hover:bg-white focus:outline-none">Crime</button>
                            <button onClick={()=> onGenre('Drama')} className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-gray-800 hover:bg-white focus:outline-none">Drama</button>
                            <button onClick={()=> onGenre('Fantasy')} className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-gray-800 hover:bg-white focus:outline-none">Fantasy</button>
                            <button onClick={()=> onGenre('Horror')} className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-gray-800 hover:bg-white focus:outline-none">Horror</button>
                            <button onClick={()=> onGenre('Romance')} className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-gray-800 hover:bg-white focus:outline-none">Romance</button>
                            <button onClick={()=> onGenre('Thriller')} className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-gray-800 hover:bg-white focus:outline-none">Thriller</button>
                        </div>
                    </Transition>
                </div>
            </nav>
        </>
    )
}
