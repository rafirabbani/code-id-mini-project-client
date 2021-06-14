import React, { useState, Fragment, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import PencilAltIcon from '@heroicons/react/outline/PencilAltIcon'
import { Transition, Dialog } from '@headlessui/react'
import { DocumentAddIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import MovieActions from '../../../Actions/MovieActions'


export default function AdminUpdateMovie(props) {
    //console.log(props.movie)
    //const history = useHistory()
    const dispatch = useDispatch()
    const [values, setValues] = useState([])
    const [edit, setEdit] = useState(false)
    const [blob, setBlob] = useState([])
    const cancelButtonRef = useRef()
    const [open, setOpen] = useState(true)

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
      }

    const editHandler = () => {
        setEdit(!edit)
        //console.log(edit)
    }

    const modalClose = () => {
        //console.log(values, edit)
        props.setUpdateMovieModal(false);
        setOpen(!open)
    }

    const onSubmit = () => {
      dispatch(MovieActions.updateMovie(props.movie.movie_id, values)).then(
        (result) => {
          if (result.status === 200) {
            //alert(`Movie Update Success`)
            //return <Redirect to="/mini-project/admin/home"/>
          }
          else {
            alert(`Movie Update Failed`)
          }
        })
      modalClose()
    }

    const uploadSingleFile = name => event => {
        //1.untuk ubah file ke blob agar bisa di preview image nya
        setBlob({ ...blob, [name]: URL.createObjectURL(event.target.files[0])})
    
        //2. simpan data File, bisa juga gunakan blob, lalu blob diconvert lagi
        // ke File type, spy ga bingung kita coba gunakan cara ini aja
        setValues({ ...values, ['movie_image']: event.target.files[0]})
      }

    return (
        <>
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
                            <button className="text-blue-600 ml-20 focus:outline-none rounded-md px-1 py-1 mt-1" onClick={editHandler} style={ edit ? {backgroundColor: '#000000', color: '#FFFFFF'} : null }>
                                    <PencilAltIcon className='' width="35" height="35"/>
                                </button>
                        </div> 
                    </Dialog.Title>
                    <div className=" flex items-center justify-center min-w-screen">                    
                        <div className="flex flex-col w-full ml-3 mt-5">
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie Title</label></div>
                            <div className="mb-5 mt-1"><input className="rounded-lg w-48 border-blue-500 text-sm" type="text" name="movie_title" onChange={handleChange('movie_title')} disabled={edit ? false : true} placeholder={props.movie.movie_title}/></div>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie Episode</label></div>
                            <div className="mb-5 mt-1"><input className="rounded-lg w-48 border-blue-500 text-sm" type="text" name="movie_episode" onChange={handleChange('movie_episode')} disabled={edit ? false : true} placeholder={props.movie.movie_episode}/></div>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie Director</label></div>
                            <div className="mb-5 mt-1"><input className="rounded-lg w-48 border-blue-500 text-sm" type="text" name="movie_director" onChange={handleChange('movie_director')} disabled={edit ? false : true} placeholder={props.movie.movie_director}/></div>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie Studio</label></div>
                            <div className="mb-5 mt-1"><input className="rounded-lg  w-48 border-blue-500 text-sm" type="text" name="movie_studio" onChange={handleChange('movie_studio')} disabled={edit ? false : true} placeholder={props.movie.movie_studio}/></div>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie TV Status</label></div>
                            <div className="mb-5 mt-1"><select className="rounded-lg w-48 border-blue-500 text-sm" type="text" name="movie_tv_status" onChange={handleChange('movie_tv_status')} disabled={edit ? false : true}>
                                <option defaultValue hidden>{edit ? `Movie TV Status` : props.movie.movie_tv_status}</option>
                                <option value="Completed">Completed</option>
                                <option value="On Going">On Going</option>
                                </select></div>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie Duration</label></div>
                            <div className="mb-5 mt-1"><input className="rounded-lg w-48 border-blue-500 text-sm" type="text" name="movie_duration" onChange={handleChange('movie_duration')} disabled={edit ? false : true} placeholder={props.movie.movie_duration}/></div>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie Release Status</label></div>
                            <div className="mb-5 mt-1"><select className="rounded-lg  w-48 border-blue-500 text-sm" type="text" name="movie_release" onChange={handleChange('movie_release')} disabled={edit ? false : true}>
                                <option defaultValue hidden className="text-sm">{edit ? `Movie Release Status` : props.movie.movie_release ? `Released` : `Not Released`}</option>
                                <option className="text-sm" value="true">Released</option>
                                <option className="text-sm" value="false">Not Released</option>
                                </select></div>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie Country Origin</label></div>
                            <div className="mb-5 mt-1"><input className="rounded-lg  w-48 border-blue-500 text-xs" type="text" name="movie_country" onChange={handleChange('movie_country')} disabled={edit ? false : true} placeholder={props.movie.movie_country}/></div>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie Genre</label></div>
                            <input className="rounded-lg mb-5 mt-1 w-48 border-blue-500 text-sm" type="text" name="movie_genre" onChange={handleChange('movie_genre')} disabled={edit ? false : true} placeholder={props.movie.movie_genre}/>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie Rating</label></div>
                            <input className="rounded-lg mb-5 mt-1 w-48 border-blue-500 text-sm" type="number" name="movie_rating" onChange={handleChange('movie_rating')} disabled={edit ? false : true} placeholder={props.movie.movie_rating}/>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie Network</label></div>
                            <input className="rounded-lg mb-5 mt-1 w-48 border-blue-500 text-sm" type="text" name="movie_network" onChange={handleChange('movie_network')} disabled={edit ? false : true} placeholder={props.movie.movie_network}/>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie Trailer</label></div>
                            <input className="rounded-lg mb-5 mt-1 w-48 border-blue-500 text-sm" type="text" name="movie_trailer" onChange={handleChange('movie_trailer')} disabled={edit ? false : true} placeholder={props.movie.movie_trailer}/>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Total Views</label></div>
                            <input className="rounded-lg mb-5 mt-1 w-48 border-blue-500 text-sm" type="number" name="movie_views" onChange={handleChange('movie_views')} disabled={edit ? false : true} placeholder={props.movie.movie_views}/>
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie Price</label></div>
                            <input className="rounded-lg mb-5 mt-1 w-48 border-blue-500 text-sm" type="number" name="movie_price" onChange={handleChange('movie_price')} disabled={edit ? false : true} placeholder={props.movie.movie_price}/>  
                            <div className=""><label className="text-l text-gray-600 focus:outline-none ring-0 border-transparent">Movie Image</label></div>
                                <div className="mt-1 col-span-6 sm:col-span-2 lg:col-span-3 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg w-48">
                                    <div className="space-y-2 text-center">
                                        <div className="mx-auto h-48 w-24 text-gray-600">
                                            <img src={edit ? blob.image : `/api/movies/image/download/${props.movie.movie_id}`} alt='' className="mx-auto h-48 w-48" />
                                        </div>
                                        <div className="flex text-sm">
                                            <label htmlFor="image" className="relative cursor-pointer rounded-lg font-medium hover:text-blue-600">
                                                {edit ? `Upload Image` : ''}
                                                <input id="image" name="image" onChange={uploadSingleFile('image')} type="file" className="sr-only" disabled={edit ? false : true} />
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
        </>
    )
}
