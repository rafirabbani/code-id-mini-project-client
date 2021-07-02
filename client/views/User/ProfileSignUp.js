import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Popcorn from '../../assets/images/popcorn-png-3.png'
import UserActions from '../../Actions/UserActions'
import DatePicker from "react-datepicker"
//import { ArrowRightIcon } from '@heroicons/react/outline'
/* import DatePicker from 'react-datepicker'
import Calendar from 'react-calendar'
import dateStyles from "react-datepicker/dist/react-datepicker.css"
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'*/

export default function Profile() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [startDate, setStartDate] = useState(new Date())
  const [warning, setWarning] = useState(false)
  const data = useSelector((state) => state.user)
  const [values, setValues] = useState([])
  const [blob, setBlob] = useState([])
  
  const uploadSingleFile = name => event => {
    //1.untuk ubah file ke blob agar bisa di preview image nya
    setBlob({ ...blob, [name]: URL.createObjectURL(event.target.files[0])})

    //2. simpan data File, bisa juga gunakan blob, lalu blob diconvert lagi
    // ke File type, spy ga bingung kita coba gunakan cara ini aja
    setValues({ ...values, ['user_avatar']: event.target.files[0]})
  }

  useEffect(() => {
    //console.log(data)
    if (data.user) {
      setValues({...values, ['user_email']: data.user.user_email, ['user_password']: data.user.user_password })
    }
    else {
      history.push('/mini-project/signup')
    } 

  }, [data, history])

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value })
    if (name === 'user_birthdate') {
      setStartDate(event.target.value)
    }
    setWarning(false)
  }

  const handleDateChange = (date) => {
    setStartDate(date)
    setValues({...values, ['user_birthdate']: date})
    
  }

  const onSubmit = (e) => {
    console.log(values)
    e.preventDefault()
    if (values.user_name) {
      //cons
      dispatch(UserActions.createUser(values)).then((result) => {
        //console.log(values)
        //console.log(result.status)
        if (result.status == 200) {
          history.push('/signup/success')
        }
        else if (result.status === 400) {
          //console.log(result)
          history.push('/signup/fail')
        }
      })
    }
    else {
      setWarning(true)
    }
  }

  const toLandingPage = () => {
    history.push('/mini-project/')
  }

  const toLogin = () => {
    history.push('/mini-project/signin')
  }
  
  return (
        <div className='min-h-screen'>
          <nav className="flex items-center justify-between bg-red-600 ">
            <img src={Popcorn} className="h-14 w-14 ml-10 py-2 px-2" alt='icon'></img>
            <button className="mr-10 text-white py-2 px-3 rounded text-xl focus:outline-none" onClick={toLandingPage}>Home</button>
          </nav>
          <div className="flex flex-wrap items-center justify-center min-h-screen">
            <div className=' text-red-600 font-bold rounded-lg border ring-4 ring-red-600 px-10 py-10 border-red-600'>
              <h1 className='text-xl text-center font-bold mb-10'>Please Fill In Your Details to Sign Up</h1>
              <form method='post'action='#'>
                <div className='mt-1'>
                  <input className='rounded-lg hidden'id='user_id' name='user_id' type='text' />
                </div> 
                <div className='text-sm'><label>Name</label></div>
                <div className='mt-1'>
                  <input className='rounded-lg w-full ring-red-600 border-red-600 focus:ring-green-400 focus:border-green-400'id='user_name' name='user_name' type='text' onChange={handleChange('user_name')}/>
                </div>
                <h1 className='text-yellow-400 font-bold text-sm mt-1' style={!warning ? {visibility: 'hidden'}  : null }>Name Required!!!</h1>
                <div className='mt-2 text-sm'><label>Birth Date</label></div>
                <div className='mt-1'>
                  {/* <Calendar/> */}
                  {/* <DatePicker className='border-red-600 rounded-lg w-full focus:border-green-400 focus:ring-green-400 text-red-600' id='user_birthdate' name='user_birthdate' selected={values.user_birthdate} onChange={(date)=>handleDateChange(date)} dateFormat="yyyy-MM-dd"/> */}
                  <input className='rounded-lg w-full'id='user_birthdate' name='user_birthdate' type='date' onChange={handleChange('user_birthdate')}/>
                </div>
                <div className='mt-7 text-sm'><label>Gender</label></div>
                <div className='mt-1'><select className='rounded-lg border-red-600 focus:ring-green-400 focus:border-green-400 appearance-none' id='user_gender' name='user_gender'
                  onChange={handleChange('user_gender')}>
                  <option  defaultValue hidden>Choose Your Gender</option>
                  <option value='Male' className='focus:bg-black focus:text-white'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='?'>?</option>
                  </select>
                </div>
                {/* <div className='mt-7 text-sm'><label>Avatar</label></div>
                <div className="mt-1 col-span-6 sm:col-span-2 lg:col-span-3 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                  <div className="space-y-2 text-center">
                    <div className="mx-auto h-48 w-24 text-gray-400">
                      <img src={blob.image} alt='' className="mx-auto h-48 w-48" />
                    </div>
                    <div className="flex text-sm">
                      <label for="image" className="relative cursor-pointer bg-white rounded-lg font-medium hover:text-blue-400">
                        Upload Image
                        <input id="image" name="image" onChange={uploadSingleFile('image')} type="file" className="sr-only" />
                      </label>
                    </div>
                  </div>
                </div> */}
                <button className='bg-red-600 text-white font-bold rounded-lg w-full mt-5 py-1 flex items-center justify-center text-xl focus:outline'
                  onClick={onSubmit}>
                  Sign Up</button>
              </form>
              <h1 className='mt-5 text-sm text-blue-600'>Already have an account? <button className='text-xs ml-3 font-bold focus:outline-none' onClick={toLogin}>Sign In Here</button></h1>
            </div>
          </div>
          {/* <DatePicker className='rounded-lg w-full' id='user_birthdate' name='user_birthdate' selected={startDate} onChange={(date) => setStartDate(date)} dateFormat='yyyy-MM-dd'/> */}
        </div>
  )
}
