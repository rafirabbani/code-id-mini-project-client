import React from 'react'
import TrashIcon from '@heroicons/react/solid/TrashIcon'

export default function ItemDeleteModal(props) {
    const modalClose = () => {
        props.setItemDeleteModal(false);
    }
    return (
        <div className="backdrop-filter backdrop-blur-xl min-w-screen min-h-screen animated fadeIn faster fixed flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
        <div className="flex flex-wrap items-center justify-center w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white ring-4 ring-red-600 ">
          <TrashIcon className="w-10 h-10 text-red-600"/>
          <div className="text-center p-5 flex-auto justify-center">
          <label className="text-2xl font-bold text-red-600">ITEM DELETED</label>
          </div>
          <button className="mb-2 md:mb-0 bg-red-600 border border-red-600 px-3 py-2 text-sm tracking-wider text-white rounded-lg focus:ring-0 focus:border-transparent ring-0 border-transparent focus:outline-none"
          onClick={modalClose}>Close</button>
      </div>
  </div>
    )
}
