import React, {useState} from 'react';
import Form from './Form';

const WeatherPanel = () => {

    let urlWeather = "https://api.openweathermap.org/data/3.0/onecall?appid=892e393ec40afa4cf92d3bcd81dfdb14";
    let cityUrl = "&q";  

    let urlForescast= "https://api.openweathermap.org/data/3.0/onecall?appid=892e393ec40afa4cf92d3bcd81dfdb14";
    
     const [weather, setWeather] = useState([]);
     const [forecast, setForecast] = useState([]);
     const [loading, setLoading] = useState(false);
     const [show, setShow] = useState(false);
     const [location, setLocation] = useState("");

     const getLocation = async(loc) => {
         setLoading(true);
         setLocation(loc);

         urlWeather = urlWeather + cityUrl + loc;

         await fetch(urlWeather).then((response) => {
            if (!response.ok) throw {response}
            return response.json();
         }).then((weatherData) => {
            console.log(weatherData);
             setWeather(weatherData);
         }).catch(error =>{
            console.log(error);
            setLoading(false);
             setShow(false);
        });

        //Forecast

        urlForescast = urlForescast + cityUrl+loc;
        
        await fetch(urlForescast).then((response) => {
            if (!response.ok) throw {response}
            return response.json();
         }).then((forecastData) => {
            console.log(forecastData);
             setForecast(forecastData);

setLoading(false);
setShow(true);

         }).catch(error =>{
            console.log(error);
            setLoading(false);
         setShow(false);
        });
     }

     return(

        <React.Fragment> 
            <Form 
            
            newLocation = {getLocation}

            />

        </React.Fragment>
     );
    } 

    export default WeatherPanel;