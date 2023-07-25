export const ClimaCiudad = ({ dataClima, isLoading }) => {
  const { name, main, weather } = dataClima;

  const difKelvin = 273.15;
  return (
    <>
      {
        isLoading ? (<p>Cargando...</p>)
          :
          (
            <div className="container_clima">
              <h2>{name}</h2>
              <p>Temperatura: {`${parseInt(main?.temp - difKelvin)}°C`}</p>
              <p>Condición metereologica: {weather[0].description}</p>
              <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />
            </div> 
          )
      }
    </>
  )
}
