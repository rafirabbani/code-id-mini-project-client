import React from 'react'
import { useSelector } from 'react-redux'
import Trolls from './assets/images/trolls.jpg'

export default function NotFoundPage() {
    const { auth } = useSelector((state) => state)

    return (
        <div className="bg-red-600">
            <div className='flex min-h-screen min-w-screen items-center justify-center'>
                <div className="flex flex-col">
                    <div className="px-1 py-1"><img className="rounded-xl"src={Trolls} style={{width:"1075px", height:"420px"}}/></div>
                    <label className="font-serif text-5xl mt-5 px-1 py-1">You Are Lost Please Go Back Before Trolls Eat You</label>
                    <div className="flex flex-row items-center justify-start mt-5 px-1 py-1">
                        <div className="mx-5 hover:underline" hidden={auth && auth.isLoggedIn  ? false : true}><a href={`/store/home`}>Home</a></div>
                        <div className="mx-5 hover:underline" hidden={auth && auth.isLoggedIn  ? false : true}><a href={`/user/profile`}>Profile</a></div>
                        <div className="mx-5 hover:underline" hidden={auth && auth.userType === 'ADMIN' ? false : true}><a href={`/admin/home`}>Admin</a></div>
                        <div className="mx-5 hover:underline" hidden={auth && auth.isLoggedIn  ? true : false}><a href={`/`}>Get Me Out</a></div>
                    </div>
                
                </div>
                
            </div>
        </div>
    )
}
