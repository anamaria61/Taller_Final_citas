import { obtenerCitas } from './servicio.js'; 
import { useProcesarCitas } from './citas.js'; 
import {crearTarjeta, 
        crearListaServicios,
        crearTablaCitas,
        crearTablaEstados,
        crearTablaMeses
}from './componentes.js'; 
async function iniciarAplicacion() { 
    try { 
        // 1. Obtener datos 
        const citas = await obtenerCitas(); 
        // 2. Procesar datos 
        const metricas = 
        useProcesarCitas(citas); 
        console.log('Citas:', citas); 
        console.log('Métricas:', metricas); 
        // 3. Crear tarjetas 
        const contenedor = document.querySelector('#resumen'); 
        const tarjetaTotal = crearTarjeta( 
            'Ingresos Totales', 
            `$${metricas.totalIngresos.toLocaleString('es-CO')}` 
        ); 
        const tarjetaCantidad = crearTarjeta( 
            'Cantidad de citas', 
            metricas.cantidadCitas 
        ); 
        contenedor.appendChild(tarjetaTotal); 
        contenedor.appendChild(tarjetaCantidad); 
        // 4. Lista de servicios 
        const listaServicios = crearListaServicios( 
        metricas.listaServicios); 
        document .querySelector('#servicios') .appendChild(listaServicios);
        // 5. tablas adicinales 
        document.querySelector('#tabla-citas').appendChild(crearTablaCitas(citas));
        document.querySelector('#tabla-estados').appendChild(crearTablaEstados(metricas.totalPorEstado));
        document.querySelector('#tabla-meses').appendChild(crearTablaMeses(mestricas.listaMeses));

    } catch (error) { 
        console.error( 'No fue posible iniciar la aplicación', error); 
    } 
} 

iniciarAplicacion();