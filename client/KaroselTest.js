import React, { useState } from 'react'
import Popcorn from './assets/images/popcorn-png-3.png'
import Landing from './assets/images/landing-page.jpg'
import DatePicker from "react-datepicker"
import { Helmet } from 'react-helmet'

import Carousel  from 'react-elastic-carousel'


export default function KaroselTest() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <Carousel className="px-72 justify-center">
                    <img src={Popcorn} width='100' height='100' />
                    <img src={Landing} width='100' height='100' />
                </Carousel>
                
            </div>
        </>
    )
}
