import React, { createContext, useState, useEffect } from 'react'

export const AppContext = createContext()

const initialDishes = {
  "Bolacha": {category:"Café da manhã", ingredients:["Bolacha cream cracker"], img:"https://cdn.awsli.com.br/1943/1943462/produto/235109774794e16750b.jpg"},
  "Arroz, Feijão e frango": {category:"Almoço", ingredients:["Arroz","Feijão","Frango","Sal","Óleo"], img:"https://img.freepik.com/fotos-premium/arroz-feijao-e-file-de-frango-grelhado-vista-superior_499484-1144.jpg"},
  "Salada de alface e tomate": {category:"Almoço", ingredients:["Alface","Tomate"], img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiAdNhMTLPeybbSAjC6kjLRDrl4r00u6yk3w&s"},
  "Bolacha com suco": {category:"Lanche", ingredients:["Bolacha cream cracker","Suco"], img:"https://conteudo.imguol.com.br/c/noticias/39/2022/09/09/merenda-servida-nesta-sexta-na-escola-francisca-mendes-guimaraes-em-nova-fatima-ba-1662734212435_v2_900x506.jpg"}
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