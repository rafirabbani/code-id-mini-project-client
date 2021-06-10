import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AdminHeader from './Components/AdminHeader'

export default function AdminHome() {

    return (
        <div>
            <label><AdminHeader title={"HOME"}/></label>
            <label className="mt-10">HELLO THIS IS ADMIN ONLY PAGE</label>
        </div>
    )
}
