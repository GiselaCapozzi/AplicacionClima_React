import { useForm } from "./hooks/useForm";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { ClimaCiudad } from "./components/ClimaCiudad";
import { useState } from "react";

export const WeatherApp = () => {
  const URL_BASE = import.meta.env.VITE_URL_BASE;
  const API_KEY = import.meta.env.VITE_API_KEY_CLIMA;

  const initialForm = {
    ciudad: '',
    isLoading: true,
    isError: null
  };

  const { ciudad, isLoading, isError, setFormState, handleChange } = useForm(initialForm);
  const [dataClima, setDataClima] = useState(null);

  const fetchClima = async () => {
    try {
      const res = await fetch(`${URL_BASE}?q=${ciudad}&lang=es&appid=${API_KEY}`)
      if (res.ok) {
        const data = await res.json()
        setDataClima(data);
        setFormState({
          isLoading: false,
          isError: '',
          ciudad: ''
        })
      } else {
        setFormState({
          ciudad: '',
          isError: 'No se encuentra esa ciudad, prueba con otra',
          isLoading: false
        })
        setDataClima(null)
      }
    } catch (error) {
      if (error.message == 'city not found') {
        console.log('Ciudad no encontrada')
      }
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima() 
    setFormState({
      ciudad: '',
      isLoading: false,
      isError: ''
    })
  }

  return (
    <div className="container">
      <h1>Aplicación de Clima</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='Buscar...'
          onChange={handleChange}
          name='ciudad'
          value={ciudad}
        />
        <Button type='submit'>Submit</Button>
      </form>
      {isError && (<p>{isError}</p>)}
      {
        dataClima ? <ClimaCiudad
          dataClima={dataClima}
          isLoading={isLoading}
          isError={isError}
        /> : <p>Ingrese una ciudad para saber el clima...</p>
      }
    </div>
  )
}
