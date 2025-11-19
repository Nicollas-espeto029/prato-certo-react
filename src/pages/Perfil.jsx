import React from 'react'

export default function Perfil(){
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-red-600 font-bold">Perfil</h1>
      <div className="mt-6 bg-white rounded p-6">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div>
            <h2 className="font-bold">Nome de usuario</h2>
            <p className="text-sm text-gray-600">usuario@exemplo.com</p>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label>Telefone</label>
            <input className="w-full p-2 border rounded" />
            <label>RA</label>
            <input className="w-full p-2 border rounded" />
            <label>Senha</label>
            <input type="password" className="w-full p-2 border rounded" />
          </div>
          <div className="space-y-2">
            <label>Endereço</label>
            <input className="w-full p-2 border rounded" />
            <button className="btn-primary mt-2">Adicionar Email</button>
            <button className="btn-primary mt-2">Adicionar Telefone</button>
          </div>
        </div>
      </div>
    </div>
  )
}