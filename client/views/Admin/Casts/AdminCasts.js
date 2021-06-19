import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import { TrashIcon, FolderOpenIcon } from '@heroicons/react/outline'
import { useSelector, useDispatch } from 'react-redux'
import CastActions from '../../../Actions/CastActions'
import AdminCreateCastModal from './AdminCreateCast'


export default function AdminCasts() {
    const dispatch = useDispatch()
    const [createCastModal, setCreateCastModal] = useState(false)
    const { cast } = useSelector((state) => state)
    const { casts, createCast } = cast

    useEffect(() => {
        dispatch(CastActions.getCastsList())
    },[])

    useEffect(() => {
        dispatch(CastActions.getCastsList())
    }, [createCast])

    
    return (
        <div>
            <div className="flex flex-row items-center justify-between w-full flex-shrink-0">
                <label><AdminHeader title={'Casts'}/></label>
                <button className="bg-blue-500 text-white text-xl px-3 py-3 rounded-lg focus:outline-none active:bg-blue-300" onClick={()=> setCreateCastModal(true)}>Add New Cast</button>
            </div>
            <div className="flex items-center justify-start -ml-5">
                <div className="flex flex-col w-full">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Cast ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Cast Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Cast Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                        casts && casts.map((cast) => (
                                            <tr key={cast.cast_id}>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{cast.cast_id}</div>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left"><img src={`/api/casts/image/download/${cast.cast_id}`} alt="cast_image" style={{width: '100px', height: '100px'}}/></div>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{cast.cast_name}</div>
                                                </td>
                                                <td className="flex items-center justify-center whitespace-nowrap content-left text-sm py-14 font-medium">
                                                    <a>
                                                        <button className="focus:outline-none"  /* onClick={() => handleDetail(movie.movie_id, movie.movie_title, movie.movie_episode, movie.movie_director, 
                                                            movie.movie_studio, movie.movie_tv_status, movie.movie_duration, movie.movie_release, movie.movie_country, 
                                                            movie.movie_genre, movie.movie_rating, movie.movie_network, movie.movie_trailer, movie.movie_views,
                                                            movie.movie_price) } */>
                                                            <FolderOpenIcon className="h-5 w-5 text-blue-500 mr-2"/></button>
                                                    </a>
                                                    <a>
                                                        <button className="focus:outline-none"  /* onClick={ () => {
                                                                if (
                                                                    window.confirm(
                                                                        "Are you sure you wish to delete this item?"
                                                                    )
                                                                )
                                                                    onDestroy(movie.movie_id)
                                                             }} */  ><TrashIcon className="h-5 w-5 text-red-500 ml-2"/></button>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {
                        createCastModal ? <AdminCreateCastModal setCreateCastModal={()=> setCreateCastModal(false)} title="Add New Cast"/> : null
                    }
                </div>
            </div>
        </div>
    )
}
