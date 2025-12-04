import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Details from './pages/Details'
import Perfil from './pages/Perfil'
import Configuracoes from './pages/Configuracoes'
import Favoritos from './pages/Favoritos'
import Historico from './pages/Historico'
import { AppProvider } from './context/AppContext'

export default function App(){
  return (
    <AppProvider>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/detalhes/:id" element={<Details/>} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="/configuracoes" element={<Configuracoes/>} />
        <Route path="/favoritos" element={<Favoritos/>} />
        <Route path="/historico" element={<Historico/>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AppProvider>
  )
}