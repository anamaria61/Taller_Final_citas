import { obtenerCitas } from './servicio.js'; 
import { useProcesarCitas, obtenerTotalPorMes } from './citas.js'; 
import { 
  crearTarjeta, 
  crearListaServicios,
  crearTablaCitas,
  crearTablaEstados,
  crearTablaMeses,
  crearTablaGrafica,
  crearTablaTotalPorMes,
  crearFiltros,
  crearFormularioCita
} from './componentes.js'; 

// "citas" está en memoria, el formulario de registro
// modifica dirctamente con push() sin tocar datos.json
let citas = [];
//estado actual de los filtros
let filtroEstado = 'todas';
let filtroServicio = 'todas';

//vacía un contenedor antes de volver a llenarlo, para
// no duplicar tarjetas cada que se vuelve a renderizar
function limpiar(selector) {
  const elemento = document.querySelector(selector);
  elemento.innerHTML = '';
  return elemento;
}

function capitalizar(texto) { //transformar cadena de texto
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

//aplicar ambos filtros (estado + servicio)
// sobre el arreglo completo
function aplicarFiltros(listaCitas) {
  return listaCitas.filter((c) => {
    const pasaEstado = filtroEstado === 'todas' || c.estado === filtroEstado;
    const pasaServicio = filtroServicio === 'todas' || c.servicio === filtroServicio;
    return pasaEstado && pasaServicio;
  });
}

// --- Renderizado por bloques ---
// Cada función limpia su propio contenedor y lo vuelve a llenar.
// Así, cuando el estado cambia (filtro o formulario), solo
// hace falta llamar a la función correspondiente.
 
function renderizarResumenYServicios(metricas) {
  const contenedorResumen = limpiar('#resumen');
  contenedorResumen.appendChild(
    crearTarjeta('Ingresos Totales', `$${metricas.totalIngresos.toLocaleString('es-CO')}`)
  );
  contenedorResumen.appendChild(
    crearTarjeta('Cantidad de Citas', metricas.cantidadCitas)
  );
 
  const contenedorServicios = limpiar('#servicios');
  contenedorServicios.appendChild(crearListaServicios(metricas.listaServicios));
  contenedorServicios.appendChild(crearTablaGrafica(metricas.tablaServiciosGrafica));
 
  limpiar('#tabla-estados').appendChild(crearTablaEstados(metricas.totalPorEstado));
  limpiar('#tabla-meses').appendChild(crearTablaMeses(metricas.listaMeses));
}

// Reto 1: muestra el resultado de obtenerTotalPorMes()
function renderizarTotalPorMes() {
  const totalPorMes = obtenerTotalPorMes(citas);
  limpiar('#tabla-total-mes').appendChild(crearTablaTotalPorMes(totalPorMes));
}
 
// Reto 3 y 4: dibuja los botones de filtro, marcando el activo.
// Las opciones (estados y servicios) se calculan sobre TODAS las
// citas, no sobre las filtradas, para que los botones no desaparezcan.
function renderizarFiltros(metricasGlobales) {
  const opcionesEstado = [
    { valor: 'todas', texto: 'Todos' },
    ...metricasGlobales.listaEstados.map((e) => ({ valor: e, texto: capitalizar(e) }))
  ];
  limpiar('#filtros-estado').appendChild(
    crearFiltros(opcionesEstado, filtroEstado, 'estado')
  );
 
  const opcionesServicio = [
    { valor: 'todas', texto: 'Todos' },
    ...metricasGlobales.listaServicios.map((s) => ({ valor: s, texto: s }))
  ];
  limpiar('#filtros-servicio').appendChild(
    crearFiltros(opcionesServicio, filtroServicio, 'servicio')
  );
}

// Reto 2: tabla dinámica de citas, ya con la columna Fecha
// y respetando los filtros activos.
function renderizarTablaCitas() {
  const citasFiltradas = aplicarFiltros(citas);
  limpiar('#tabla-citas').appendChild(crearTablaCitas(citasFiltradas));
}
 
// Vuelve a calcular las métricas y repinta TODO el dashboard.
// Se usa al iniciar y cada vez que se agrega una cita nueva
// (porque el total de citas cambia y hay que recalcular todo).
function renderizarTodo() {
  const metricasGlobales = useProcesarCitas(citas);
  renderizarResumenYServicios(metricasGlobales);
  renderizarTotalPorMes();
  renderizarFiltros(metricasGlobales);
  renderizarTablaCitas();
}
 
// Se dispara al hacer clic en cualquier botón de filtro.
// Usa delegación de eventos: un solo listener en el contenedor
// en vez de uno por botón.
function manejarClicFiltro(evento, tipo) {
  const boton = evento.target.closest('button');
  if (!boton) return;
 
  if (tipo === 'estado' && boton.dataset.estado) {
    filtroEstado = boton.dataset.estado;
  }
  if (tipo === 'servicio' && boton.dataset.servicio) {
    filtroServicio = boton.dataset.servicio;
  }
 
  // Cambiar el filtro no agrega ni quita citas, así que basta
  // con refrescar los botones (para marcar el activo) y la tabla.
  const metricasGlobales = useProcesarCitas(citas);
  renderizarFiltros(metricasGlobales);
  renderizarTablaCitas();
}

// Reto 5: toma los datos del formulario, arma un objeto "cita"
// nuevo, lo agrega en memoria y vuelve a procesar/pintar todo.
function manejarEnvioFormulario(evento) {
  evento.preventDefault();
  const formulario = evento.target;
  const datos = new FormData(formulario);
 
  const nuevoId = citas.length > 0
    ? Math.max(...citas.map((c) => c.id_cita)) + 1
    : 1;
 
  const nuevaCita = {
    id_cita: nuevoId,
    cliente: datos.get('cliente').trim(),
    especialista: datos.get('especialista').trim(),
    servicio: datos.get('servicio').trim(),
    color: '#9333ea',
    valor: Number(datos.get('valor')) || 0,
    mes: Number(datos.get('mes')),
    fecha_cita: datos.get('fecha'),
    estado: datos.get('estado')
  };
 
  citas.push(nuevaCita);
  formulario.reset();
  renderizarTodo();
}


async function iniciarAplicacion() { 
  try { 
    // 1. Obtener datos 
    const citas = await obtenerCitas(); 

    // 2. Formulario: se crea una sola vez y queda escuchando "submit"
    const contenedorFormulario = document.querySelector('#formulario-cita');
    const formulario = crearFormularioCita();
    formulario.addEventListener('submit', manejarEnvioFormulario);
    contenedorFormulario.appendChild(formulario);

    // 3. Filtros: un listener por contenedor (delegación de eventos),
    // se agregan una sola vez; los botones se repintan dentro de
    // renderizarFiltros() cada vez que hace falta.
    document.querySelector('#filtros-estado')
      .addEventListener('click', (evento) => manejarClicFiltro(evento, 'estado'));
    document.querySelector('#filtros-servicio')
      .addEventListener('click', (evento) => manejarClicFiltro(evento, 'servicio'));
 
    // 4. Primer renderizado
    renderizarTodo();

  } catch (error) { 
    console.error('No fue posible iniciar la aplicación:', error); 
  } 
} 

iniciarAplicacion();