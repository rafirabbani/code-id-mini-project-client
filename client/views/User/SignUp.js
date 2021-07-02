import React, { useState, useEffect } from 'react'
import Popcorn from '../../assets/images/popcorn-png-3.png'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import UserActions from '../../Actions/UserActions'

export default function SignUp() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [warningEmail, setWarningEmail] = useState(false)
  const [warningPassword, setWarningPassword] = useState(false)
  const [notValidEmailWarning, setNotValidEmailWarning] = useState(false)
  const data = useSelector((state) => state.user)
  const [values, setValues] = useState([])

  useEffect(() => {
    if (data.user) {
      setValues({...values, user_email: data.user.user_email})
    }
    else {
      setValues({...values, user_email: ''})
    }
    
  }, []) 

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
    if (name === 'user_email') {
      setWarningEmail(false)
      setNotValidEmailWarning(false)
    }
    else if (name === 'user_password') {
      setWarningPassword(false)
    }
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    //console.log(values, data)
    if (values.user_email && values.user_password){
      if (validateEmail(values.user_email)) {
        dispatch(UserActions.holdPasswordMail(values))
        history.push('/signup/profile')
      } else setNotValidEmailWarning(true)

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
  const toLogin = () => {
    history.push('/signin')
  }

  const toLandingPage = () => {
    history.push('/')
  }
  
    return (
        <div className='min-h-screen'>
          <nav className="flex items-center justify-between bg-red-600 ">
            <img src={Popcorn} className="h-14 w-14 ml-10 py-2 px-2" alt='icon'></img>
            <button className="mr-10 text-white py-2 px-3 rounded text-xl focus-outline-none" onClick={toLandingPage}>Home</button>
          </nav>
          <div className="flex flex-wrap items-center justify-center min-h-screen">
            <div className=' text-red-600 font-bold rounded-lg border ring-4 ring-red-600 px-10 py-10 border-red-600'>
              <h1 className='text-xl text-center font-bold mb-10'>Please Fill In Your Details to Sign Up</h1>
              <form method='post'action='#'>
                <div className='mt-1'>
                  <input className='rounded-lg hidden'id='user_id' name='user_id' type='text' />
                </div> 
                <div className='mt-5 text-sm'><label>User Email</label></div>
                <div className='mt-1'>
                  <input className='rounded-lg w-full ring-red-600 border-red-600 focus:ring-green-400 focus:border-green-400'id='user_email' name='user_email' type='text' onChange={handleChange('user_email')} value={values.user_email}/>
                  <h1 className='text-sm text-yellow-400' style={{ visibility: (!warningEmail ? 'hidden' : 'visible') }}>Email Required!!!</h1>
                  <h1 className='text-sm text-yellow-400' style={{ visibility: (!notValidEmailWarning ? 'hidden' : 'visible') }}>Please Use a Valid Email Address!!!</h1>
                </div>
                <div className='mt-5 text-sm'><label>User Password</label></div>
                <div className='mt-1'>
                  <input className='rounded-lg w-full ring-red-600 border-red-600 focus:ring-green-400 focus:border-green-400'id='user_password' name='user_password' type='password' onChange={handleChange('user_password')}/>
                  <h1 className='text-sm text-yellow-400' style={{ visibility: (!warningPassword ? 'hidden' : 'visible') }}>Password Required!!!</h1>
                </div>
                <button className='bg-red-600 text-white font-bold rounded-lg w-full mt-5 py-1 flex items-center justify-center focus:outline-none'
                  onClick={onSubmit}>
                  <i className='text-xl flex justify-center not-italic'>Next<ArrowRightIcon className='ml-2 w-4' style={{position: 'relative', top: '2px'}}/></i></button>
                <h1 className='text-blue-600 text-sm mt-3'>Already have an account? <button className='text-xs ml-3 font-bold focus:outline-none' onClick={toLogin}>Sign In Here</button></h1>
              </form>
            </div>
          </div>
        </div>
    )
}
