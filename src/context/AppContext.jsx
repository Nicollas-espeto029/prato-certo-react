import React, { createContext, useState, useEffect } from 'react'

export const AppContext = createContext()

const initialDishes = {
  "Pão com ovo": {category:"Café da manhã", ingredients:["Pão","Ovo"], img:"https://i.imgur.com/8Yp5LqL.jpg"},
  "Arroz com frango": {category:"Almoço", ingredients:["Arroz","Frango","Sal","Óleo"], img:"https://i.imgur.com/jL7uY5J.jpg"},
  "Salada de alface e tomate": {category:"Almoço", ingredients:["Alface","Tomate","Azeite"], img:"https://i.imgur.com/nxRlFYu.jpg"},
  "Sanduíche natural com suco": {category:"Lanche", ingredients:["Pão","Peito de peru","Alface","Suco"], img:"https://i.imgur.com/6o4HqJf.jpg"}
}

export function AppProvider({children}){
  const [dishes, setDishes] = useState(() => {
    try {
      const raw = localStorage.getItem('dishes')
      return raw ? JSON.parse(raw) : initialDishes
    } catch { return initialDishes }
  })
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem('products')
      return raw ? JSON.parse(raw) : {}
    } catch { return {} }
  })

  useEffect(()=>{
    localStorage.setItem('dishes', JSON.stringify(dishes))
  }, [dishes])

  useEffect(()=>{
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  const addDish = (name, info) => {
    setDishes(prev => ({...prev, [name]: info}))
  }
  const removeDish = (name) => {
    const copy = {...dishes}
    delete copy[name]
    setDishes(copy)
  }

  const addProduct = (name, qty) => {
    setProducts(prev => ({...prev, [name]: ((prev[name]||0) + qty)}))
  }
  const consumeProduct = (name) => {
    setProducts(prev => {
      const copy = {...prev}
      if(!copy[name]) return prev
      copy[name] = +(copy[name] - 1).toFixed(1)
      if(copy[name] <= 0) delete copy[name]
      return copy
    })
  }
  const removeProduct = (name) => {
    const copy = {...products}
    delete copy[name]
    setProducts(copy)
  }

  return (
    <AppContext.Provider value={{
      dishes, addDish, removeDish,
      products, addProduct, consumeProduct, removeProduct
    }}>
      {children}
    </AppContext.Provider>
  )
}