import React from 'react'
import CheckIcon from '@heroicons/react/solid/CheckIcon'

export default function UpdateModal(props) {
    const modalClose = () => {
        props.setItemUpdateModal(false);
    }
    return (
      <div className="backdrop-filter backdrop-blur-xl min-w-screen min-h-screen animated fadeIn faster fixed flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
        <div className="flex flex-wrap items-center justify-center w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white ring-4 ring-green-400 ">
          <CheckIcon className="w-10 h-10 text-green-400"/>
          <div className="text-center p-5 flex-auto justify-center">
          <label className="text-2xl font-bold text-green-400">CART UPDATED</label>
          </div>
          <button className="mb-2 md:mb-0 bg-green-400 border border-green-400 px-3 py-2 text-sm tracking-wider text-white rounded-lg focus:ring-0 focus:border-transparent ring-0 border-transparent focus:outline-none"
          onClick={modalClose}>Close</button>
      </div>
  </div>
    )
}
