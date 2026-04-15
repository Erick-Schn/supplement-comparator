import './index.scss'
import { useState, useMemo } from 'react'

export function WheyListing({ content = [] }) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('protein')

  const getDerivedData = (item) => {
    const doses = item.peso && item.peso_dose ? item.peso / item.peso_dose : 0
    const totalProtein = doses * (item.proteina_dose || 0)
    const pricePerProtein = totalProtein ? item.preco / totalProtein : Infinity

    return { doses, pricePerProtein }
  }

  const processedData = useMemo(() => {
    let data = [...content]

    if (search) {
      const term = search.toLowerCase()

      data = data.filter(item =>
        item.nome?.toLowerCase().includes(term) ||
        item.marca?.toLowerCase().includes(term)
      )
    }

    if (sortBy === 'protein') {
      data.sort((a, b) => getDerivedData(a).pricePerProtein - getDerivedData(b).pricePerProtein)
    }

    if (sortBy === 'rating') {
      data.sort((a, b) => (b.nota || 0) - (a.nota || 0))
    }

    return data
  }, [content, search, sortBy])

  return (
    <section className="listing">
      <div className="controls">
        <input
          type="text"
          placeholder="Buscar por nome ou marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="select-wrapper">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="protein">Melhor custo (R$/g proteina)</option>
            <option value="rating">Melhor nota</option>
          </select>
        </div>
      </div>

      {processedData.map((item, index) => {
        const { doses, pricePerProtein } = getDerivedData(item)

        return (
          <div className="card" key={index}>
            <div className="rank">#{index + 1}</div>

            <div className="image">
              <img src={item.link_imagens || 'https://via.placeholder.com/120'} alt="" />
            </div>

            <div className="main">
              <p className="brand">{item.marca}</p>
              <h3 className="name">{item.nome}</h3>

              <div className="tags">
                <span>{item.peso}g</span>
                <span>{Math.round(doses)} doses</span>
                <span>{item.proteina_dose}g prot/dose</span>
              </div>
            </div>

            <div className="highlight">
              <p className="label">R$/g proteina</p>
              <p className="value">
                {pricePerProtein !== Infinity ? `R$ ${pricePerProtein.toFixed(2)}` : '-'}
              </p>
            </div>

            <div className="details">
              <p>💰 R$ {item.preco}</p>
              <p>⭐ {item.nota || '-'}</p>
            </div>

            <div className="action">
              <a href={item.link_afiliado || item.link} target="_blank" rel="noreferrer">
                Ver produto
              </a>
            </div>
          </div>
        )
      })}
    </section>
  )
}
