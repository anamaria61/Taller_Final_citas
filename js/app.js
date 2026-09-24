import { obtenerCitas } from './servicio.js'; 
import { useProcesarCitas } from './citas.js'; 
import { 
  crearTarjeta, 
  crearListaServicios,
  crearTablaCitas,
  crearTablaEstados,
  crearTablaMeses,
  crearTablaGrafica
} from './componentes.js'; 

async function iniciarAplicacion() { 
  try { 
    // 1. Obtener datos 
    const citas = await obtenerCitas(); 

    // 2. Procesar datos 
    const metricas = useProcesarCitas(citas); 

    // 3. Crear tarjetas de resumen
    const contenedorResumen = document.querySelector('#resumen'); 
    contenedorResumen.appendChild(
      crearTarjeta('Ingresos Totales', `$${metricas.totalIngresos.toLocaleString('es-CO')}`)
    ); 
    contenedorResumen.appendChild(
      crearTarjeta('Cantidad de Citas', metricas.cantidadCitas)
    ); 

    // 4. Renderizar Lista y Gráfica de Servicios 
    const contenedorServicios = document.querySelector('#servicios');
    contenedorServicios.appendChild(crearListaServicios(metricas.listaServicios)); 
    contenedorServicios.appendChild(crearTablaGrafica(metricas.tablaServiciosGrafica));

    // 5. Renderizar Tablas
    document.querySelector('#tabla-estados').appendChild(crearTablaEstados(metricas.totalPorEstado));
    document.querySelector('#tabla-meses').appendChild(crearTablaMeses(metricas.listaMeses));
    document.querySelector('#tabla-citas').appendChild(crearTablaCitas(citas));

  } catch (error) { 
    console.error('No fue posible iniciar la aplicación:', error); 
  } 
} 

iniciarAplicacion();