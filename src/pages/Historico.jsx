import React from 'react'
export default function Historico(){
  // simple mock
  const days = ['SEG','TER','QUA','QUI','SEX']
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-red-600 font-bold">Histórico</h1>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <aside className="flex flex-col gap-4">
          {days.map((d,i)=>(
            <div key={d} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full text-white flex items-center justify-center">{d}</div>
              <div className="text-sm text-gray-600">2{i+1}/09/2025</div>
            </div>
          ))}
        </aside>
        <div>
          <div className="space-y-3">
            <div className="p-3 bg-red-600 text-white rounded flex items-center justify-between">
              <div className="flex items-center gap-3"><img src="https://i.imgur.com/8Yp5LqL.jpg" className="w-12 h-10 object-cover rounded" /> Strogonoff</div>
              <div></div>
            </div>
            <div className="p-3 bg-red-600 text-white rounded flex items-center justify-between">
              <div className="flex items-center gap-3"><img src="https://i.imgur.com/jL7uY5J.jpg" className="w-12 h-10 object-cover rounded" /> Carne moida</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}