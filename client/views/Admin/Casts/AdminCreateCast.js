import React, { useState, Fragment, useRef, useEffect } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { DocumentAddIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import MovieActions from '../../../Actions/MovieActions'
import CastsAction from '../../../Actions/CastActions'

export default function AdminCreateCast(props) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true)
    const [blob, setBlob] = useState([])
    const [values, setValues] = useState([])
    const cancelButtonRef = useRef()
    const { movie } = useSelector((state) => state)
    const { moviesNoLimit } = movie

    const modalClose = () => {
      props.setCreateCastModal(false)
      setOpen(!open)
    }

    const handleChange = name => event => {
      setValues({...values, [name]: event.target.value})
    }

    const uploadSingleFile = name => event => {
      //1.untuk ubah file ke blob agar bisa di preview image nya
      setBlob({ ...blob, [name]: URL.createObjectURL(event.target.files[0])})
    
      //2. simpan data File, bisa juga gunakan blob, lalu blob diconvert lagi
      // ke File type, spy ga bingung kita coba gunakan cara ini aja
      setValues({ ...values, ['cast_image']: event.target.files[0]})
    }

    useEffect(() => {
      dispatch(MovieActions.movieListNoLimit())
    }, [])

    const onSubmit = () => {
      //console.log(values)
       dispatch(CastsAction.createCast(values))
      modalClose()
    }

    return (
        <div>
            <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-scroll backdrop-filter backdrop-blur-md bg-gray-500 bg-opacity-20"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={modalClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
           <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ring-4 ring-blue-500">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="leading-6 font-medium text-gray-900 mt-8">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center justify-center flex-shrink-0">
                                <DocumentAddIcon className="text-blue-600" aria-hidden="true" width="50" height="50" />
                                <label className="text-2xl uppercase ml-5">{props.title}</label>
                            </div>
                                {/* <button className="focus:outline-none text-blue-600 ml-10">
                                    <PencilAltIcon className='' width="35" height="35"/>
                                </button> */}
                        </div> 
                    </Dialog.Title>
                    <div className=" flex items-center justify-center min-w-screen">                    
                        <div className="flex flex-col w-full ml-3 mt-5">
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Cast Name</label></div>
                            <div className="mb-5 mt-1"><input className="rounded-lg w-48 border-blue-500 text-sm" type="text" name="cast_name" onChange={handleChange('cast_name')}/></div>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Cast Birthdate</label></div>
                            <div className="mb-5 mt-1"><input className="rounded-lg w-48 border-blue-500 text-sm" type="date" name="cast_birthdate" onChange={handleChange('cast_birthdate')}/></div>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Cast Gender</label></div>
                            <div className="mb-5 mt-1"><select className="rounded-lg w-48 border-blue-500 text-sm" type="text" name="cast_gender" onChange={handleChange('cast_gender')}>
                                <option defaultValue hidden>Select Cast Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Cast Movie</label></div>
                            <div className="mb-5 mt-1"><select className="rounded-lg w-48 border-blue-500 text-sm" type="text" name="movie_tv_status" onChange={handleChange('cast_movie_id')}>
                                <option defaultValue hidden>Select Movie Title</option>
                                {
                                    moviesNoLimit && moviesNoLimit.map((movie) => (
                                        <option value={movie.movie_id} key={movie.movie_id}>{movie.movie_title}</option>
                                    )) 
                                }
                                </select>
                            </div>              
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Cast Image</label></div>
                                <div className="mt-1 col-span-6 sm:col-span-2 lg:col-span-3 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg w-48">
                                    <div className="space-y-2 text-center">
                                        <div className="mx-auto h-48 w-24 text-gray-600">
                                            <img src={blob.image} alt='' className="mx-auto h-48 w-48" />
                                        </div>
                                        <div className="flex text-sm">
                                            <label for="image" className="relative cursor-pointer rounded-lg font-medium hover:text-blue-600">
                                                Upload Image
                                                <input id="image" name="image" onChange={uploadSingleFile('image')} type="file" className="sr-only" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>               
                    </div>
                </div>
            </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={modalClose}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
        </div>
    )
}
