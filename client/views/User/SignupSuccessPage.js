import React from 'react'
import CheckIcon from '@heroicons/react/solid/CheckIcon'
import { useHistory } from 'react-router-dom'

export default function SignupSuccessModal() {
    const history = useHistory()
    const onClose = () => {
        history.push('/signin')
    }
    return (
        <div className="bg-black min-w-screen min-h-screen animated fadeIn faster fixed flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
            <div className="flex flex-wrap items-center justify-center w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white ring-4 ring-green-400 ">
                <CheckIcon className="w-12 h-10 text-green-400" style={{position: 'relative', top: '4px'}}/>
                <div className="text-center p-14 flex justify-center">
                    <h2 className="text-4xl font-bold text-green-400 w-full">SIGNUP SUCCESS</h2>
                </div>
                <div className='flex items-center justify-center'>
                    <button className="mb-2 md:mb-0 bg-green-400 border border-green-400 px-3 py-2 text-sm tracking-wider text-white rounded-lg focus:ring-0 focus:border-transparent ring-0 border-transparent focus:outline-none"
                    onClick={onClose}>Click Here To Log In Into Your Account</button>
                </div>
            </div>
        </div>
    )
}
