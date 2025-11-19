import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
export default function Favoritos(){
  const { dishes } = useContext(AppContext)
  // placeholder: show same cards
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-red-600 font-bold">Favoritos</h1>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {Object.entries(dishes).map(([name, info])=>(
          <div key={name} className="p-4 bg-red-600 text-white rounded flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={info.img} alt="" className="w-16 h-12 object-cover rounded" />
              <div>{name}</div>
            </div>
            <div>♥</div>
          </div>
        ))}
      </div>
    </div>
  )
}