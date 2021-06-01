import React from 'react'

export default function SignUp() {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10'>
            <div className="mt-2">
                      <form method='POST' action='#'>
                        <div className='block mt-1'><input className='rounded-lg hidden'id='user_id' name='user_id' 
                            type='text' />
                        </div> 
                        <div className='block mt-5'><label>User Name</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='user_name' name='user_name' 
                            type='text' 
                            /* onChange={handleChange('user_name')}  */
                            placeholder={'e.g. Jason Statham'}
                          />
                        </div>
                        <div className='block mt-5'><label>User Email</label></div>
                        <div className='block mt-1'><input className='rounded-lg w-72'id='user_email' name='user_email' 
                            type='text' 
                            /* onChange={handleChange('user_email')}  */
                            placeholder={'e.g. jason.statham@mymail.com'}
                          />
                        </div>
                        <div className='block mt-5'><label>User Password</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='user_password' name='user_password' 
                            type='password' 
                            /* onChange={handleChange('user_password')} */ 
                            placeholder={'Enter Your Password'}
                          />
                        </div>
                        <div className='block mt-5'><label>User Type</label></div>
                         <div className='block mt-1'><select class='rounded-lg w-48' id='user_type' name='user_type' type='text'
                            /* onChange={handleChange('user_type')} */>
                            <option defaultValue hidden>Choose User Type</option>
                            <option value='ADMIN'>Admin</option>
                            <option value='USER'>User</option>
                            </select>
                        </div>
                        </form>
                    </div>
            </div>
        </div>
    )
}
