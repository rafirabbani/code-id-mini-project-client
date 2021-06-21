import React, { useEffect } from 'react'
import AdminHeader from './Components/AdminHeader'
import MainLayout from './Components/AdminMainLayout'

export default function AdminHome() {

    return (
        <div>
            <MainLayout>
                <label><AdminHeader title={"HOME"}/></label>
                <label className="mt-10">HELLO THIS IS ADMIN ONLY PAGE</label>
            </MainLayout>
        </div>
    )
}
