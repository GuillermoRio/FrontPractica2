'use client'

import { getAllCountries, getCountryNameBySearch } from '@/lib/api/country'
import { Country } from '@/types'
import { AxiosError } from 'axios'
import { useState, useEffect } from 'react'

import './globals.css'
import { useRouter } from 'next/navigation'

const Home = () => {

  const [palabra, setPalabra] = useState<string | null>(null)
  const [palabraFinal, setPalabraFinal] = useState<string | null>('')

  const [pais, setPais] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    getAllCountries()
      .then((p) => {
        setPais(p)
      })
      .catch((e: AxiosError) => {
        setError(e.message)
      })
  }, [])

  useEffect(() => {
    if (!palabraFinal) return

    setLoading(true)
    setError(null)

    getCountryNameBySearch(palabraFinal)
      .then((p) => {
        setPais(p)
      })
      .catch((e) => {
        setError(`Error al buscar.${e}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [palabraFinal])

  return (
    <div className="container">
      {loading && <h1> Loading...</h1>}

      <h1 style={{ textAlign: 'center' }}>Buscador de paises y banderas</h1>
      <br/>
      <div className="search">
        <input
          onChange={(p) => {
            setPalabra(p.target.value)
          }}
        ></input>
        <button onClick={() => {
          setPalabraFinal(palabra)
          }}
          >Buscar
        </button>
      </div>
      <div className="list">
        {!loading &&
          pais.length > 0 &&
          pais.map((p) => {
            console.log(p)
            return(
              <div className="cardContent" key={p.name.common}>
                <button 
                className='cardButton'
                  onClick={() =>
                    router.push(`/country/` + p.name.common)
                  }>
                  <img src={p.flags.png} alt={p.name.common} />

                </button>
                <div>Country: {p.name.common}</div>
                <div>Population: {p.population}</div>
              </div>
            )
          })
        }
        </div>
    </div>
  )
}

export default Home