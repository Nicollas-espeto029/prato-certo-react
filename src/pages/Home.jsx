import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// Ícone de configurações
function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
      <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
    </svg>
  )
}


// CARD DE PRATO
function FoodCard({ name, info, onRemove }) {
  const [isOpen, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div
      className="food-card"
      style={{ backgroundImage: info.img ? `url(${info.img})` : 'none' }}
    >
      <div className="overlay"></div>
      <div className="food-content">
        <span className="food-name">{name}</span>
        <br />
        <span className="food-cat">{info.category}</span>

        <div className="food-actions">
          <Link to={`/detalhes/${encodeURIComponent(name)}`} className="btn">
            Ver
          </Link>

          <button className="btn" onClick={handleClickOpen}>
            Remover
          </button>

          <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
          >
            <DialogTitle>Remover prato</DialogTitle>

            <DialogContent>
              <DialogContentText>
                Tem certeza que deseja remover este prato?
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <button
                className="btn"
                onClick={() => {
                  onRemove(name);
                  handleClose();
                }}
              >
                Sim
              </button>

              <button className="btn" onClick={handleClose}>
                Não
              </button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}



// ITEM DO ESTOQUE
function ProductItem({ name, qty, onConsume, onRemove }) {
  return (
    <li className="product-item">
      <span>{name}: {qty.toFixed(1)} kg</span>
      <div className="support-btn">
        <button onClick={() => onConsume(name)}>Consumir</button>
        <button onClick={() => onRemove(name)}>Remover</button>
      </div>
    </li>
  );
}



// -----------------------------------------------------------
// PÁGINA HOME COMPLETA
// -----------------------------------------------------------
export default function Home() {
  const { dishes, removeDish, products, addProduct, consumeProduct, removeProduct, addDish } = useContext(AppContext)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const [dishName, setDishName] = useState('')
  const [dishCategory, setDishCategory] = useState('')
  const [dishIngredients, setDishIngredients] = useState('')
  const [dishImg, setDishImg] = useState('')

  const [productName, setProductName] = useState('')
  const [productQty, setProductQty] = useState('')

  // DIALOG DO NOVO PRATO
  const [openDishDialog, setOpenDishDialog] = useState(false)
  const handleOpenDish = () => setOpenDishDialog(true)
  const handleCloseDish = () => setOpenDishDialog(false)


  const handleAddDish = (e) => {
    if (e) e.preventDefault()
    if (!dishName || !dishCategory) return

    addDish(
      dishName.trim(),
      {
        category: dishCategory,
        ingredients: dishIngredients.split(',').map(i => i.trim()),
        img: dishImg
      }
    )

    setDishName('')
    setDishCategory('')
    setDishIngredients('')
    setDishImg('')
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    const qty = parseFloat(productQty)
    if (!productName || isNaN(qty) || qty <= 0) return

    addProduct(productName.trim(), qty)
    setProductName('')
    setProductQty('')
  }

  const entries = Object.entries(dishes).filter(([name, info]) => {
    if (search && !name.toLowerCase().includes(search.toLowerCase())) return false
    if (category && info.category !== category) return false
    return true
  })

  return (
    <div className="page container mx-auto p-4">

      <Link
        to="/configuracoes"
        className="bg-red-600 hover:bg-yellow-400 text-white px-3 py-2 rounded-md transition-colors flex items-center justify-center w-min"
        aria-label="Configurações"
      >
        <SettingsIcon />
      </Link>

      <header className="mb-4">
        <h1 className="text-8xl font-bold text-red-600">Prato</h1>
        <h1 className="text-7xl font-bold text-yellow-600">Certo</h1>
      </header>

      <main className="flex gap-4 flex-wrap justify-center">

        {/* MENU */}
        <section id="menu-section" className="flex-2 min-w-[280px] w-full md:w-2/3">
          <h2 className="text-xl text-red-600">Cardápio</h2>

          <div className="controls flex gap-2 my-2 flex-wrap">
            <input
              className="flex-1 min-w-[120px] p-2 rounded border"
              placeholder="Buscar prato..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            {/* BOTÃO ABRE DIALOG */}
            <button
              type="button"
              onClick={handleOpenDish}
              className="bg-red-600 hover:bg-yellow-400 text-white px-5 py-2 rounded-md text-lg transition-colors"
            >
              Adicionar sugestão de prato
            </button>

            <select
              className="p-2 rounded border"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="Café da manhã">Café da manhã</option>
              <option value="Almoço">Almoço</option>
              <option value="Lanche">Lanche</option>
            </select>
          </div>

          <div id="menu">
            {entries.map(([name, info]) => (
              <FoodCard
                key={name}
                name={name}
                info={info}
                onRemove={removeDish}
              />
            ))}
          </div>
        </section>

        {/* LATERAL */}
        <aside id="manage-section" className="bg-white p-4 rounded w-full md:w-1/3">

          <h2 className="text-red-600 mt-4">Estoque de Produtos (kg)</h2>

          <form onSubmit={handleAddProduct} className="space-y-2">
            <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="Nome do produto" required />
            <input value={productQty} onChange={e => setProductQty(e.target.value)} type="number" min="0.1" step="0.1" placeholder="Quantidade em kg" required />
            <button className="btn-primary" type="submit">Adicionar Produto</button>
          </form>

          <ul id="product-list" className="mt-2">
            {Object.entries(products).map(([name, qty]) => (
              <ProductItem
                key={name}
                name={name}
                qty={qty}
                onConsume={consumeProduct}
                onRemove={removeProduct}
              />
            ))}
          </ul>
        </aside>
      </main>


      {/* ------------------ DIALOG DE NOVO PRATO ------------------ */}
      <Dialog open={openDishDialog} onClose={handleCloseDish}>
        <DialogTitle>Adicionar sugestão de prato</DialogTitle>

        <DialogContent className="space-y-3">

          <input
            className="w-full p-2 border rounded"
            placeholder="Nome do prato"
            value={dishName}
            onChange={e => setDishName(e.target.value)}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="URL da imagem"
            value={dishImg}
            onChange={e => setDishImg(e.target.value)}
          />

          <select
            className="w-full p-2 border rounded"
            value={dishCategory}
            onChange={e => setDishCategory(e.target.value)}
          >
            <option value="">Selecione a categoria</option>
            <option value="Café da manhã">Café da manhã</option>
            <option value="Almoço">Almoço</option>
            <option value="Lanche">Lanche</option>
          </select>


          <textarea
            className="w-full p-2 border rounded"
            placeholder="Ingredientes separados por vírgula"
            value={dishIngredients}
            onChange={e => setDishIngredients(e.target.value)}
          ></textarea>

        </DialogContent>

        <DialogActions>
          <button
            onClick={() => {
              handleAddDish();
              handleCloseDish();
            }}
            className="bg-red-600 hover:bg-yellow-400 text-white px-4 py-2 rounded transition-colors"
          >
            Salvar
          </button>

          <button
            onClick={handleCloseDish}
            className="px-4 py-2 rounded bg-gray-300"
          >
            Cancelar
          </button>
        </DialogActions>
      </Dialog>

    </div>
  )
}
