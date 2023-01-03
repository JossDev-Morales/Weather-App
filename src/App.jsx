import { useState, useEffect } from 'react'
import './App.css'
function catchdirection(degree) {
  if (degree>337.5||degree<22.5) {
    return "Norte N"
  }else if (degree>22.5||degree<67.5) {
    return "Noreste NE"
  }else if (degree>67.5||degree<112.5) {
    return "Este E"
  }else if (degree>112.5||degree<157.5) {
    return "Sureste SE"
  }else if (degree>157.5||degree<202.5) {
    return "Sur S"
  }else if (degree>202.5||degree<247.5) {
    return "Sureste SW"
  }else if (degree>247.5||degree<292.5) {
    return "Oeste W"
  }else if (degree>292.5||degree<337.5) {
    return "Suroeste NW"
  }
}


function App() {

  const [api,setApi]=useState({})
  
  
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(pos => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=940b79fac28123b4ec7ced9a8871515a`)
    .then( res => res.json())
    .then(res => {
      setApi(res)
      setTimeout(() => {
        document.querySelector(".screen").remove()
      }, 1000);
    })
    })
  },[])
const [units,setUnits]=useState("imperial")
const [degrees,setDegrees]=useState("C°")
const [moveunit,setMoveunit]=useState("Metros/s")
function convertCF() {
  if (units=="metric") {
    setUnits("imperial")
  }else{
    setUnits("metric")
  }

  if (degrees=="F°") {
    setDegrees("C°")
  }else{
    setDegrees("F°")
  }

  if (moveunit=="Millas/h") {
    setMoveunit("Metros/s")
  }else{
    setMoveunit("Millas/h")
  }
  navigator.geolocation.getCurrentPosition(pos => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lang=es&units=${units}&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=940b79fac28123b4ec7ced9a8871515a`)
  .then( res => res.json())
  .then(res => {
    setApi(res)
    //chargescreen
  })
  })
}
  return (
    <>
      <h1>Weather App</h1>
      <div className="btn" onClick={convertCF}>Convert</div>
      <div className='header'>
        <h2>{api.name+", "+api.sys?.country}</h2>
        <p>{api.weather?.[0].description}</p>
        <img src={`http://openweathermap.org/img/wn/${api.weather?.[0].icon}@2x.png`} alt="" />
      </div>
      <div className='data'>
      <div className='sect secttemp'>
        <h2>temperatura</h2>
        <h3>{api.main?.temp+degrees}</h3>
        <p>Sensacion termica: {api.main?.feels_like+degrees}</p>
        <p>Temperatura maxima: {api.main?.temp_max+degrees}</p>
        <p>Temperatura minima: {api.main?.temp_min+degrees}</p>
        <p>Humedad: {api.main?.humidity}%</p>
      </div>
      <div className='sect sectmetrics'>
        <h2>Metricas</h2>
        <p>Presion atmosferica: {api.main?.pressure}hPa</p>
        <p>Nubosidad: {api.clouds?.all}%</p>
        <p>Visibilidad: {api.visibility/1000}Km</p>
      </div>
      <div className='sect sectwind'>
        <h2>Viento</h2>
        <p>Velocidad: {api.wind?.speed+moveunit}</p>
        <p>Direccion: {api.wind?.deg+"° "+catchdirection(api.wind?.deg)}</p>
      </div>
      </div>
      
    </>
  )
}


export default App
