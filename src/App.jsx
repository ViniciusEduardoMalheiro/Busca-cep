import styles from '../src/App.module.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

export function App() {

  const [cep, setCep] = useState([]);
  const [address, setAddress] = useState({});

  function handleChange(event) {
    setCep(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      setAddress(response.data)
    } catch (error) {
      console.log(error)
    }
    
  }


  return (
    <div className={styles.container}>
      <div className={styles.header} >
        <h1>Busca CEP</h1>
      </div>
      <form action="" className={styles.form} onSubmit={handleSubmit} >
            <p>Insira o CEP</p>
            <input type="number" placeholder='Digite o CEP aqui' value={cep} onChange={handleChange} />
            {address && (
              <div>
                <p>CEP: <strong>{address.cep}</strong></p>
                <p>Logradouro: <strong>{address.logradouro}</strong></p>
                <p>Complemento: <strong>{address.complemento}</strong></p>
                <p>Bairro: <strong>{address.bairro}</strong></p>
                <p>Localidade: <strong>{address.localidade}</strong></p>
                <p>Estado: <strong>{address.uf}</strong></p>
              </div>
            )}
            <button type='submit'  >Pesquisar</button>
      </form>
    </div>
  )
}

