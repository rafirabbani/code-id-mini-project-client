import React from 'react'

export default function Header(props) {
    return (
        <div>
            <label className="flex items-center justify-start text-5xl text-black -ml-5 py-3 mb-5">{props.title}</label>
        </div>
    )
}
