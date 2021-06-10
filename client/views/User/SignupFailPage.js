import React from 'react'
import ExclamationIcon from '@heroicons/react/solid/ExclamationIcon'
import { useHistory } from 'react-router-dom'

export default function SignupFailModal() {
    const history = useHistory()
    const onClose = () => {
        history.push('/mini-project/signup')
    }
    return (
        <div className="bg-black min-w-screen min-h-screen animated fadeIn faster fixed flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
            <div className="flex flex-wrap items-center justify-center w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white ring-4 ring-red-600 ">
                <ExclamationIcon className="w-12 h-10 text-red-600" style={{position: 'relative', top: '4px'}}/>
                <div className="text-center p-14 flex justify-center">
                    <h2 className="text-4xl font-bold text-red-600 w-full">SIGNUP FAILED</h2>
                </div>
                <div className='flex items-center justify-center'>
                    <button className="mb-2 md:mb-0 bg-red-600 border border-red-600 px-3 py-2 text-sm tracking-wider text-white rounded-lg focus:ring-0 focus:border-transparent ring-0 border-transparent outline-none"
                    onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}
