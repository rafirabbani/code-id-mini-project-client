import React, { useState, useEffect } from 'react'
import bgImage from "../../assets/images/landing-page.jpg"
import Popcorn from "../../assets/images/popcorn-png-3.png"
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AuthActions from '../../Actions/AuthActions'
import WarningModal from './WarningModal'

export default function SignIn() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [warningEmail, setWarningEmail] = useState(false)
    const [warningPassword, setWarningPassword] = useState(false)
    const [values, setValues] = useState([])
    const [warningModal, setWarningModal] = useState(false)

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
        if (name === 'user_email') {
            setWarningEmail(false)
        }
        else if (name === 'user_password') {
            setWarningPassword(false)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (values.user_email && values.user_password) {
            dispatch(AuthActions.signIn(values)).then(result => {
                //console.log(result)
                if (result.status === 401) {
                    setWarningModal(true)
                }
                else if (result.status === 200) {
                    history.push('/store/home')
                }
            })
        }
        else if (!values.user_email && values.user_password) {
            setWarningEmail(true)
        }
        else if(!values.user_password && values.user_email) {
            setWarningPassword(true)
        }
        else {
            setWarningEmail(true)
            setWarningPassword(true)
        }
    }

    return (
        <div>
        <section className="min-h-screen flex items-stretch text-white ">
            <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style={{backgroundImage: `url(${bgImage})`}}>
                <div className="absolute bg-black opacity-70 inset-0 z-0"></div>
                <div className="w-full px-10 z-10">
                    
                    {/* <p className="text-3xl my-4">Capture your personal memory in unique way, anywhere.</p> */}
                </div>
            </div>
            <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style={{backgroundColor: `#161616`}}>
                <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style={{backgroundImage: `url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)`}}>
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                </div>
                <div className="w-full py-6 z-20">
                    <div className="flex flex-row items-center justify-center">
                        <img src={Popcorn} style={{width:"100px", height:"100px"}}/>
                    </div>
                    <h1 className="my-6">
                    <h1 className="text-2xl font-bold text-center tracking-wide text-red-600">Your Watching Experience Starts Here...</h1>
                    </h1>
                    <form method="post" action="#" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"> 
                        <div className="pb-2 pt-4">
                            <input type="email" name="email" id="email" placeholder="Email" className="block w-full p-4 text-lg rounded-sm bg-black focus:border-red-600 focus:ring-0"
                            onChange={handleChange('user_email')}/>
                            <label className='text-sm text-yellow-400 mt-1' style={{ visibility: (!warningEmail ? 'hidden' : 'visible') }}>Email Required!!!</label>
                        </div>
                        <div className="pb-2 pt-4">
                            <input className="block w-full p-4 text-lg rounded-sm bg-black focus:border-red-600 focus:ring-0" type="password" name="password" id="password" placeholder="Password"
                            onChange={handleChange('user_password')}/>
                            <label className='text-sm text-yellow-400 mt-1' style={{ visibility: (!warningPassword ? 'hidden' : 'visible') }}>Password Required!!!</label>
                        </div>
                        <div className="text-right text-gray-400">
                            <a className="mx-1 text-sm cursor-default">Dont Have Account?</a>
                            <a href="/signup"className="mx-1 text-sm hover:underline hover:cursor-pointer hover:text-white">Register Here</a>
                        </div>
                        <div className="px-4 pb-2 pt-4">
                            <button className="uppercase block w-full p-4 text-lg rounded-full bg-red-600 hover:bg-red-800 focus:outline-none"
                            onClick={onSubmit}>sign in</button>
                        </div>
                    </form>
                </div>
                {
                    warningModal ? <WarningModal setWarningModal={()=> setWarningModal(false)}/> : null
                }
            </div>
        </section>
    </div>
    )
}
