import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

function FoodCard({name, info, onRemove}){
  return (
    <div className="food-card" style={{backgroundImage: info.img ? `url(${info.img})` : 'none'}}>
      <div className="overlay"></div>
      <div className="food-content">
        <span className="food-name">{name}</span>
        <span className="food-cat">{info.category}</span>
        <span className="food-ings">Ingredientes: {info.ingredients.join(', ')}</span>
        <div className="food-actions">
          <Link to={`/detalhes/${encodeURIComponent(name)}`} className="btn">Ver</Link>
          <button className="btn" onClick={()=>onRemove(name)}>Remover</button>
        </div>
      </div>
    </div>
  )
}

function ProductItem({name, qty, onConsume, onRemove}){
  return (
    <li className="product-item">
      <span>{name}: {qty.toFixed(1)} kg</span>
      <div>
        <button onClick={()=>onConsume(name)}>Consumir</button>
        <button onClick={()=>onRemove(name)}>Remover</button>
      </div>
    </li>
  )
}

export default function Home(){
  const { dishes, removeDish, products, addProduct, consumeProduct, removeProduct, addDish } = useContext(AppContext)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const [dishName, setDishName] = useState('')
  const [dishCategory, setDishCategory] = useState('')
  const [dishIngredients, setDishIngredients] = useState('')
  const [dishImg, setDishImg] = useState('')

  const [productName, setProductName] = useState('')
  const [productQty, setProductQty] = useState('')

  const handleAddDish = (e) => {
    e.preventDefault()
    if(!dishName || !dishCategory) return
    addDish(dishName.trim(), {category: dishCategory, ingredients: dishIngredients.split(',').map(i=>i.trim()), img: dishImg})
    setDishName(''); setDishCategory(''); setDishIngredients(''); setDishImg('')
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    const qty = parseFloat(productQty)
    if(!productName || isNaN(qty) || qty <= 0) return
    addProduct(productName.trim(), qty)
    setProductName(''); setProductQty('')
  }

  const entries = Object.entries(dishes).filter(([name, info])=>{
    if(search && !name.toLowerCase().includes(search.toLowerCase())) return false
    if(category && info.category !== category) return false
    return true
  })

  return (
    <div className="page container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-red-600">Prato Certo</h1>
      </header>

      <main className="flex gap-4 flex-wrap">
        <section id="menu-section" className="flex-2 min-w-[280px] w-full md:w-2/3">
          <h2 className="text-xl text-red-600">Cardápio</h2>

          <div className="controls flex gap-2 my-2 flex-wrap">
            <input className="flex-1 min-w-[120px] p-2 rounded border" placeholder="Buscar prato..." value={search} onChange={e=>setSearch(e.target.value)} />
            <select className="p-2 rounded border" value={category} onChange={e=>setCategory(e.target.value)}>
              <option value="">Todas</option>
              <option value="Café da manhã">Café da manhã</option>
              <option value="Almoço">Almoço</option>
              <option value="Lanche">Lanche</option>
            </select>
          </div>

          <div id="menu">
            {entries.map(([name, info])=>(
              <FoodCard key={name} name={name} info={info} onRemove={removeDish} />
            ))}
          </div>
        </section>

        <aside id="manage-section" className="bg-white p-4 rounded w-full md:w-1/3">
          <h2 className="text-red-600">Adicionar Prato</h2>
          <form onSubmit={handleAddDish} className="space-y-2">
            <input value={dishName} onChange={e=>setDishName(e.target.value)} placeholder="Nome do prato" required />
            <select value={dishCategory} onChange={e=>setDishCategory(e.target.value)} required>
              <option value="">Selecione a categoria</option>
              <option value="Café da manhã">Café da manhã</option>
              <option value="Almoço">Almoço</option>
              <option value="Lanche">Lanche</option>
            </select>
            <input value={dishIngredients} onChange={e=>setDishIngredients(e.target.value)} placeholder="Ingredientes (separados por vírgula)" required />
            <input value={dishImg} onChange={e=>setDishImg(e.target.value)} placeholder="URL da imagem de fundo (opcional)" />
            <button className="btn-primary" type="submit">Adicionar Prato</button>
          </form>

          <h2 className="text-red-600 mt-4">Estoque de Produtos (kg)</h2>
          <form onSubmit={handleAddProduct} className="space-y-2">
            <input value={productName} onChange={e=>setProductName(e.target.value)} placeholder="Nome do produto" required />
            <input value={productQty} onChange={e=>setProductQty(e.target.value)} type="number" min="0.1" step="0.1" placeholder="Quantidade em kg" required />
            <button className="btn-primary" type="submit">Adicionar Produto</button>
          </form>

          <ul id="product-list" className="mt-2">
            {Object.entries(products).map(([name, qty])=>(
              <ProductItem key={name} name={name} qty={qty} onConsume={consumeProduct} onRemove={removeProduct} />
            ))}
          </ul>
        </aside>
      </main>
    </div>
  )
}