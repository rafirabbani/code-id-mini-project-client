import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AuthActions from '../../../Actions/AuthActions'
import Popcorn from '../../../assets/images/popcorn-png-3.png'
import { FilmIcon, SparklesIcon, LogoutIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    const history = useHistory()
    const dispatch = useDispatch()
    
    const logOut = () => {
        dispatch(AuthActions.signOut()).then(() => {
            history.push('/mini-project/signin')
        })
    }
    
    return (
        <div>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:w-48 py-18 px-6 bg-black">
                <a href="/mini-project/admin/home" className='justify-center items-center'><img src={Popcorn} className='px-auto py-auto mx-5 mt-3' width='50' height='50'/></a>
                <div className="md:flex-col md:items-stretch md:min-h-18 md:flex-no-wrap px-0  items-center justify-between w-full mx-auto">
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none mt-5">
                    <li className="dropdown items-center">
                        </li>
                        <li className="items-center">
                            <Link
                                className={
                                    "text-l py-3 block font-bold hover:bg-gray-200 rounded-xl"
                                }
                                to="/mini-project/admin/movies/"
                            >
                                <i
                                    className={
                                        "text-l flex items-center not-italic text-red-600 "
                                    }
                                ><FilmIcon className='h-5 w-5 text-gray-500 mr-2'/>Movies</i>{""}
                                
                            </Link>
                            <Link
                                className={
                                    "text-l py-3 block font-bold hover:bg-gray-200 rounded-xl"
                                }
                                to="/mini-project/admin/casts/"
                            >
                                <i className={
                                        "text-l flex items-center not-italic text-red-600"
                                    }><SparklesIcon className={'h-5 w-5 text-gray-500 mr-2'}/>Casts</i>{""}                        
                        </Link>
                        </li>
                        <button className='flex items-center text-red-600 text-l py-3 font-bold hover:bg-gray-200 rounded-xl'
                        onClick={logOut}>
                            <LogoutIcon className='h-5 w-5 text-gray-500 mr-2'/>
                            <span>Log Out</span>
                        </button>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
