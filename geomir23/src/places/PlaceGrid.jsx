import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { useDispatch, useSelector } from 'react-redux';
import { delPlace } from '../slices/places/thunks';

export const PlaceGrid = ({v} ) => {

  let { usuari, setUsuari,authToken,setAuthToken,email } = useContext(UserContext)

  //console.log(v)

  const dispatch = useDispatch ()
  const { error, isLoading } = useSelector(state=> state.places)
    

  const deletePlace = (id,e) => {

    e.preventDefault();
  
    let confirma = confirm("Estas  segur?")
  
    if (confirma)
    {
       dispatch(delPlace(id,authToken))

  
    }
  
  
  }
  return (
    <div key={v.id } className="p-1 rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
          <img src={ "https://backend.insjoaquimmir.cat/storage/" + v.file.filepath } alt="art cover" loading="lazy" width="1000" height="667" className="h-56 sm:h-full w-full sm:w-5/12 object-cover object-top rounded-lg transition duration-500 group-hover:rounded-xl"/>
          <div className="sm:w-7/12 pl-0 p-5">
            <div className="space-y-2">
              <div className="space-y-4">
                <h4 className="text-2xl font-semibold text-cyan-900">{v.name}</h4>
                <p className="text-gray-600">{v.description}</p>
                <p className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                ❤️ { v.favorites_count }
              </p>
              
              </div>
              <Link to={"/places/"+v.id} className="w-max text-cyan-600"> Llegeix més </Link>
              { v.author.email === email ? 
              (   <>
                  <Link to={"/places/edit/"+v.id} className="w-max text-cyan-600"> Editar </Link>
                  <a href="#" className=" w-max text-cyan-600" onClick={ (e)=> deletePlace(v.id,e) }> Esborrar</a>
                   </> 
              ) : ( <></> )}
            </div>
            
          </div>
          <span className="text-sm text-gray-900 font-light px-0 py-1 whitespace-nowrap">
              
              </span>
        </div>
  )
}
