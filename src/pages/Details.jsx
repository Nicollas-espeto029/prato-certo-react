import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export default function Details(){
  const { id } = useParams()
  const name = decodeURIComponent(id || '')
  const { dishes } = useContext(AppContext)
  const info = dishes[name]

  if(!info) return <div className="p-8">Prato não encontrado. <Link to="/home">Voltar</Link></div>

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-red-600">Detalhes</h1>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img src={info.img} alt={name} className="w-full rounded shadow" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <div>
            <h3 className="font-bold">Descrição</h3>
            <ul className="list-disc ml-5">
              {info.ingredients.map((i, idx)=> <li key={idx}>{i}</li>)}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold">Deixe sua avaliação abaixo</h3>
            <div className="mt-3 flex items-center gap-4">
              <div className="w-64 h-20 bg-gray-200 rounded"></div>
              <div className="p-2 bg-red-600 rounded-full text-white">★ ★ ★ ★ ★</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}