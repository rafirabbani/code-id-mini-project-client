import React from 'react'
import { useHistory } from 'react-router-dom'
import ExclamationIcon from '@heroicons/react/solid/ExclamationIcon'

export default function LoginBlockPage() {
    const history = useHistory()
    const onClose = () => {
        history.push('/mini-project/signin')
        //props.setLoginCheck()
    }
    return (
        <div className="bg-black min-w-screen min-h-screen animated fadeIn faster fixed flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
                <div className="flex flex-wrap items-center justify-center w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white ring-4 ring-red-600 ">
                    <ExclamationIcon className="w-10 h-10 text-red-600"/>
                    <div className="text-center p-5 flex-auto justify-center">
                        <h2 className="text-2xl font-bold text-red-600">YOU HAVE TO LOGGED IN TO ACCESS THIS PAGE</h2>
                    </div>
                    <button className="mb-2 md:mb-0 bg-red-600 border border-red-600 px-3 py-2 text-sm tracking-wider text-white rounded-lg focus:ring-0 focus:border-transparent ring-0 border-transparent outline-none"
                    onClick={onClose}>Close</button>
                </div>
            </div>
    )
}
