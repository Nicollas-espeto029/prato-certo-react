import React from 'react'

export default function Configuracoes(){
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-red-600 font-bold">Configurações</h1>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-red-600 text-white rounded flex items-center justify-between">
            <span>Tema</span>
            <input type="checkbox" />
          </div>
          <div className="p-4 bg-red-600 text-white rounded flex items-center justify-between">
            <span>Notificação</span>
            <input type="checkbox" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-red-600 text-white rounded">Idioma: PT-br</div>
          <div className="p-4 bg-red-600 text-white rounded">Sobre</div>
        </div>
      </div>
    </div>
  )
}