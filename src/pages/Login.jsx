import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const navigate = useNavigate()
  const handle = (e) => {
    e.preventDefault()
    navigate('/home')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1512058564366-c9e3b6f4d2f3?auto=format&fit=crop&w=1400&q=60')] bg-cover">
      <div className="w-full max-w-md bg-white/80 p-6 rounded shadow">
     {/* <div style={{margin: "0 auto"}} className="page container mx-auto p-4"> */}
       <h2 className="text-5xl font-bold text-red-600">Prato</h2>
        <h2 className="text-3xl font-bold text-yellow-600">Certo</h2>
     {/* </div> */}
        <form onSubmit={handle} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm">Usuário</label>
            <input required className="w-full p-2 rounded border" placeholder="exemplo123@gmail.com" />
          </div>
          <div>
            <label className="block text-sm">Senha</label>
            <input required type="password" className="w-full p-2 rounded border" placeholder="Senha" />
          </div>
          <button className="btn-primary w-full" type="submit">Esqueceu a senha ?</button>
          <button className="btn-primary w-full" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}