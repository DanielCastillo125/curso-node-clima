require('dotenv').config()

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() =>{

    const busquedas = new Busquedas()    
    let opt = ''

    do {
        // Imprimir el menú
        opt = await inquirerMenu()
        
        // Gestiona las funciones de las opciones
        switch (opt) {
            case 1: //
                // Mostrar mensaje
                const termino = await leerInput('Ciudad:');
                
                // Buscar los lugares
                const lugares = await busquedas.ciudad(termino)
                
                // Seleccionar el lugar
                const id = await listarLugares(lugares)
                const lugarSel = lugares.find( l => l.id === id )
                
                // Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)
                console.log(clima)

                // Mostrar resultados

                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', );
                console.log('Mínima:', );
                console.log('Máxima', );
                console.log('Clima actual', );
                
            break;

            case 2: //

            break;

        
            default:
                break;
        }


        if (opt !== 0) await pausa()

    } while (opt !== 0);


}

main()