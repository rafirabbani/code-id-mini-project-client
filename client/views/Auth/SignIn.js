import React, { useState, useEffect } from 'react'
import Popcorn from '../../assets/images/popcorn-png-3.png'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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

    const toLandingPage = () => {
        history.push('/mini-project/')
    }

    const toSignUp = () => {
        history.push('/mini-project/signup')
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
                    history.push('/mini-project/store/home')
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
            <div className='min-h-screen bg-black'>
          <nav className="flex items-center justify-between bg-red-600 ">
            <img src={Popcorn} className="h-14 w-14 ml-10 py-2 px-2" alt='icon'></img>
            <button className="mr-10 text-white py-2 px-3 rounded text-xl" onClick={toLandingPage}>Home</button>
          </nav>
          <div className="flex items-center justify-center mt-20">
              <h1 className='text-white text-center text-3xl font-serif'>WELCOME BACK, PLEASE LOGIN TO ACCESS THE STORE</h1>
          </div>
          <div className="flex flex-wrap items-center justify-center mt-10 mr-5">
            <div className=' text-red-600 font-bold rounded-lg border px-10 py-10 ring-4 ring-red-600 bg-white'>
              <form method='post'action='#'>
                <div className='text-sm'><label>Email</label></div>
                <div className='mt-1'>
                  <input className='rounded-lg w-full ring-red-600 border-red-600 focus:ring-green-400 focus:border-green-400'id='user_email' name='user_email' type='text' onChange={handleChange('user_email')} style={{input: '-internal-autofill-selected'}}/>
                  <h1 className='text-sm text-yellow-400' style={{ visibility: (!warningEmail ? 'hidden' : 'visible') }}>Email Required!!!</h1>
                </div>
                <div className='mt-5 text-sm'><label>Password</label></div>
                <div className='mt-1'>
                  <input className='rounded-lg w-full bg-opacity-0 ring-red-600 border-red-600 focus:ring-green-400 focus:border-green-400'id='user_password' name='user_password' type='password' onChange={handleChange('user_password')}/>
                  <h1 className='text-sm text-yellow-400' style={{ visibility: (!warningPassword ? 'hidden' : 'visible') }}>Password Required!!!</h1>
                </div>
                <button className='bg-red-600 text-white font-bold rounded-lg w-full mt-6 py-1 flex items-center justify-center'
                  onClick={onSubmit}>
                  <h1 className='text-xl'>Sign In</h1></button>
              </form>
              <h1 className='text-sm mt-5 font-normal text-blue-600'>Dont Have an account?<button className='ml-2 text-sm px-1 py-1' onClick={toSignUp}>Sign Up Here</button></h1>
            </div>
          </div>
          {
              warningModal ? <WarningModal setWarningModal={()=> setWarningModal(false)}/> : null
          }
        </div>
    )
}
