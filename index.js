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
            case 1: // Buscar ciudad
                // Mostrar mensaje
                const termino = await leerInput('Ciudad:');
                
                // Buscar los lugares
                const lugares = await busquedas.ciudad(termino)
                
                // Seleccionar el lugar
                const id = await listarLugares(lugares)
                if( id === '0' ) continue;
                
                const lugarSel = lugares.find( l => l.id === id )
                
                // Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre)

                // Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)

                // Mostrar resultados

                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad:', lugarSel.nombre.green );
                console.log('Lat:', lugarSel.lat );
                console.log('Lng:', lugarSel.lng );
                console.log('Temperatura:', clima.temp );
                console.log('Mínima:', clima.min );
                console.log('Máxima:', clima.max );
                console.log('Clima actual:', clima.desc.green );
                
            break;

            case 2: // Historial

            busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i + 1}.`.green;
                    console.log( `${ idx } ${ lugar } ` );
                } )

            break;

        
            default:
                break;
        }


        if (opt !== 0) await pausa()

    } while (opt !== 0);


}

main()