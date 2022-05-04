const { default: axios } = require("axios");

class Busquedas {
    historial = ['Girón', 'Bucaramanga', 'Floridablanca']

    constructor() {
        //TODO: leer DB si existe
    }

    get paramsMapbox() {
        return{
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es',
            'proximity': 'ip'
        }
    }

    get paramsOpenWeather() {
        return{
            'lat': this.lat,
            'lon': this.lon,
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'

        }
    }

    async ciudad( lugar = '' ) {
        
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            })
    
            const resp = await instance.get()
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name_es,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
            
        } catch (error) {
            return []; // retornar los lugares

        }
        // peticion HTTP

    }

    async climaLugar(lat, lon){
        try {

            const instance = axios.create({
                baseURL: 'http://api.openweathermap.org/data/2.5/weather',
                params: this.paramsOpenWeather(lat, lon)
            })

            const resp = await instance.get()
            return resp.data.main.map( clima => ({
                min: clima.temp_min,
                max: clima.temp_max,
                temp: clima.temp
            }))

            // return {
            //     desc: '',
            //     min: '',
            //     max: '',
            //     temp: ''
            // }
            
        } catch (error) {
            // console.log(error)
            
        }
    }

}

module.exports = Busquedas;