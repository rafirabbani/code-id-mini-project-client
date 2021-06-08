import React from 'react'
import ExclamationIcon from '@heroicons/react/solid/ExclamationIcon'

export default function WarningModal(props) {
    //console.log(props)
    const onClose = () => {
        props.setWarningModal()
    }
    return (
            <div className="backdrop-filter backdrop-blur-sm min-w-screen min-h-screen animated fadeIn faster fixed flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
                <div className="flex flex-wrap items-center justify-center w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white ring-4 ring-red-600 ">
                    <ExclamationIcon className="w-10 h-10 text-red-600"/>
                    <div className="text-center p-5 flex-auto justify-center">
                        <h2 className="text-2xl font-bold text-red-600">INVALID EMAIL OR PASSWORD</h2>
                    </div>
                    <button className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-3 py-2 text-sm tracking-wider text-white rounded-lg focus:ring-0 focus:border-transparent ring-0 border-transparent outline-none"
                    onClick={onClose}>Close</button>
                </div>
            </div>
    )
}
