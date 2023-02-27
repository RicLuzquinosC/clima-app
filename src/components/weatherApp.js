import { useEffect, useState } from "react";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";
import styles from './weatherApp.module.css'


export default function WeatherApp() {

    const [weather, setWeather] = useState(null);
    
    //useEffect usa un callback como primer parametro, y el segundo es un arreglo de dependencias(cuando está vacío, se ejecutará una sola vez al cargar la aplicación)
    useEffect(()=>{
        loadInfo();
    },[]);

    useEffect(()=>{

    },[weather])
        document.title = `Weather | ${weather?.location.name ?? ''}`

    async function loadInfo(city ='lima'){
        try{
            const request = await fetch (`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`);
            const json = await request.json();
            setTimeout(()=>{
                setWeather(json)
            },2000);
            setWeather(json)
            
        }catch(error){

        }

    }
    function handleChangeCity(city){
        setWeather(null);
        loadInfo(city);
    }
    return <div className={styles.weatherContainer}>
        <h1 className={styles.title}>Clima App - React JS - Ric Luzquinos</h1>
        
        <WeatherForm onChangeCity={handleChangeCity}/>
        <WeatherMainInfo weather={weather}/>

    </div>
}