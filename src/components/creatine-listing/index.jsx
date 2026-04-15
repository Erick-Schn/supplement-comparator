import './index.scss'
import { useState, useMemo } from 'react'

export function CreatineListing({ content = [] }) {

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('creatine')

  const getDerivedData = (item) => {
    const doses = item.peso && item.peso_dose
      ? item.peso / item.peso_dose
      : 0

    const totalCreatine = doses * (item.creatina_dose || 0)

    const pricePerCreatine = totalCreatine
      ? item.preco / totalCreatine
      : Infinity

    return { doses, pricePerCreatine }
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

    if (sortBy === 'creatine') {
      data.sort((a, b) =>
        getDerivedData(a).pricePerCreatine - getDerivedData(b).pricePerCreatine
      )
    }

    if (sortBy === 'rating') {
      data.sort((a, b) => (b.nota || 0) - (a.nota || 0))
    }

    return data
  }, [content, search, sortBy])

  const getImage = (item) => {
    if (!item.link_imagens) return null

    if (Array.isArray(item.link_imagens)) {
      return item.link_imagens[0]
    }

    if (typeof item.link_imagens === 'string') {
      return item.link_imagens.split(',')[0].trim()
    }

    return null
  }

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
            <option value="creatine">Melhor custo (R$/g creatina)</option>
            <option value="rating">Melhor nota</option>
          </select>
        </div>
      </div>

      {processedData.map((item, index) => {
        const { doses, pricePerCreatine } = getDerivedData(item)

        return (
          <div className="card" key={index}>

            <div className="rank">#{index + 1}</div>

            <div className="image">
              <img
                src={getImage(item) || 'https://via.placeholder.com/120'}
                alt=""
              />
            </div>

            <div className="main">
              <p className="brand">{item.marca}</p>
              <h3 className="name">{item.nome}</h3>

              <div className="tags">
                <span>{item.peso}g</span>
                <span>{Math.round(doses)} doses</span>
                <span>{item.creatina_dose}g creatina/dose</span>
                <span><b>{item.abenutri ? 'Aprovado' : 'Não Divulgado'} Abenutri</b></span>
              </div>
            </div>

            <div className="highlight">
              <p className="label">R$/g creatina</p>
              <p className="value">
                {pricePerCreatine !== Infinity
                  ? `R$ ${pricePerCreatine.toFixed(2)}`
                  : '-'}
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