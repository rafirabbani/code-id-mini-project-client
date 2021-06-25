import React from 'react'
import Loading from '../assets/images/loading-2.svg'

export default function LoadingScreen() {
    return (
        <>
            <div className= "min-w-screen min-h-screen animated fadeIn faster fixed flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-red-600">
                <div className="flex flex-col">
                    <img src={Loading}/>
                    <label className="text-3xl text-center font-serif">Please Wait</label>
                </div>
            </div>
        </>
    )
}
