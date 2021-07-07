import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/components/Search.module.css'

import { Spinner } from 'react-bootstrap'

import { BsSearch } from 'react-icons/bs'

export default function Search() {

  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const searchEndpoint = (query) => `/api/buscaprodutos?q=${query}`

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    if (query.length) {
      setLoading(true)
      fetch(searchEndpoint(query))
        .then(res => res.json())
        .then(res => {
          setResults(res.results)
          setLoading(false)
          if(res.results.length === 0) {
            setNoResults(true)
          } else {
            setNoResults(false)
          }
        })
    } else {
      setResults([])
      setNoResults(false)
      setLoading(false)
    }
  }, [])

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      setNoResults(false)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div className={styles.search_container} ref={searchRef}>
        <input
            id="search"
            name="search"
            className={styles.search}
            onChange={onChange}
            onFocus={onFocus}
            placeholder="O que você está procurando?"
            autoComplete='off'
            type='text'
            value={query}
        />
        <BsSearch />
        <ul className={styles.results}>
        {
          active && isLoading ? 
            <li className={`${styles.result} ${styles.loading}`}>
              <Spinner className={styles.spinner} animation="border" variant="warning">
                <span className="visually-hidden">Carregando...</span>
              </Spinner> 
            </li>
          : null
        }
        {
          active && noResults ?
            <li className={`${styles.result} ${styles.error}`}>
                <a>Nenhum produto foi encontrado :/</a>
            </li>
          : null
        }
        { active && results.length > 0 && (
            <>
              {results.map(({ nome, slug, id }) => (
                <>
                  <Link href="/produtos/[slug]" as={`/produtos/${slug}`} key={id}>
                      <li className={styles.result}>
                          <a>{nome}</a>
                      </li>
                  </Link>
                </>
              ))}
            </>
          )
        }
      </ul>
    </div>
  )
}