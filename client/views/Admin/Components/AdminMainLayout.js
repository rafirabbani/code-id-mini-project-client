import React from 'react'
import Sidebar from './AdminSidebar'

export default function MainLayout(props) {
    return (
        <div>
            <div className='grid grid-cols-6 gap-4'>
                <div className><Sidebar/></div>
                <div className='col-span-5'>
                    <main>
                        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                            {/* Replace with your content */}
                            {props.children}
                            {/* /End replace */}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
