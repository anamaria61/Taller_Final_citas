export function crearTarjeta(titulo, valor) { 
    const tarjeta = document.createElement('div'); 
    tarjeta.classList.add('tarjeta'); 
    tarjeta.innerHTML = ` 
        <h3>${titulo}</h3> 
        <p>${valor}</p> 
    `; 
    return tarjeta; 
}

export function crearListaServicios(servicios) { 
    const contenedor = document.createElement('div'); 
    contenedor.classList.add('servicios-lista'); 
    servicios.forEach((servicio) => { 
        const elemento = document.createElement('div'); 
        elemento.classList.add('servicio-item'); 
        elemento.innerHTML = ` 
        <span>${servicio}</span> 
        `; 
        contenedor.appendChild(elemento); 
    }); 

    return contenedor; 
}

//TABLAS ADICIONALES
// crearTablaCitas()
export function crearTablaCitas(citas) {
    const tabla = document.createElement('table');
    tabla.classList.add('tabla-datos');

    let html = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Cliente</th>
        <th>Especialista</th>
        <th>Servicio</th>
        <th>Valor</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody>`;

    citas.forEach(c => {
        html += `
        <tr>
            <td>#${c.id_cita}</td>
            <td>${c.cliente}</td>
            <td>${c.especialista}</td>
            <td>${c.servicio}</td>
            <td>$${c.valor.toLocaleString('es-CO')}</td>
            <td><span class="badge ${c.estado}">${c.estado}</span></td>
        </tr>`;
    });

    html += '</tbody>';
    tabla.innerHTML = html;
    return tabla;
}

// crearTablaEstados()
export function crearTablaEstados(totalPorEstado) {
    const tabla = document.createElement('table');
    tabla.classList.add('tabla-datos');

    let html = `
    <thead>
      <tr>
        <th>Estado</th>
        <th>Total Acumulado</th>
      </tr>
    </thead>
    <tbody>`;

    Object.entries(totalPorEstado).forEach(([estado, total]) => {
        html += `
        <tr>
            <td><span class="badge ${estado}">${estado}</span></td>
            <td>$${total.toLocaleString('es-CO')}</td>
        </tr>`;
    });

    html += '</tbody>';
    tabla.innerHTML = html;
    return tabla;
}

// crearTablaMeses()
export function crearTablaMeses(listaMeses) {
    const nombresMeses = {
        1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril', 5: 'Mayo', 6: 'Junio',
        7: 'Julio', 8: 'Agosto', 9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
    };

    const tabla = document.createElement('table');
    tabla.classList.add('tabla-datos');

    let html = `
    <thead>
      <tr>
        <th>N° Mes</th>
        <th>Nombre del Mes</th>
      </tr>
    </thead>
    <tbody>`;

    listaMeses.forEach(mesNum => {
        html += `
        <tr>
            <td>${mesNum}</td>
            <td>${nombresMeses[mesNum] || 'Desconocido'}</td>
        </tr>`;
    });

    html += '</tbody>';
    tabla.innerHTML = html;
    return tabla;
}
// crearTablaGrafica()
export function crearTablaGrafica(tablaGrafica) {
  const contenedor = document.createElement('div');
  contenedor.classList.add('grafica-contenedor');

  tablaGrafica.forEach(item => {
    const fila = document.createElement('div');
    fila.style.marginBottom = '12px';
    fila.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <strong>${item.servicio}</strong>
        <span>$${item.total.toLocaleString('es-CO')} (${item.porcentaje}%)</span>
      </div>
      <div style="background: #e5e7eb; height: 12px; border-radius: 6px; overflow: hidden;">
        <div style="background: ${item.color}; width: ${item.porcentaje}%; height: 100%;"></div>
      </div>
    `;
    contenedor.appendChild(fila);
  });

  return contenedor;
}

//RETO 1 tabla de totales por mes
export function crearTablaTotalPorMes(totalPorMes) {
    const nombresMeses = {
        1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril', 5: 'Mayo', 6: 'Junio',
        7: 'Julio', 8: 'Agosto', 9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
    };

    const tabla = document.createElement('table');
    tabla.classList.add('tabla-datos');

    let html = `
    <thead>
      <tr>
        <th>Mes</th>
        <th>Total del Mes</th>
      </tr>
    </thead>
    <tbody>`;

    totalPorMes.forEach(item => {
        html += `
        <tr>
            <td>${nombresMeses[item.mes] || item.mes}</td>
            <td>$${item.total.toLocaleString('es-CO')}</td>
        </tr>`;
    });

    html += '</tbody>';
    tabla.innerHTML = html;
    return tabla;
}

// RETO 3 y 4 - Crear filtros()
// Filtro por estado y por servicio
// "atributo" define el data-* que llevará
// cada botón (por ejemplo "estado" o "servicio").
export function crearFiltros(opciones, valorActivo, atributo) {
    const contenedor = document.createElement('div');
    contenedor.classList.add('filtros');

    opciones.forEach((opcion) => {
        const boton = document.createElement('button');
        boton.type = 'button';
        boton.classList.add('filtro-btn');
        if (opcion.valor === valorActivo) {
            boton.classList.add('activo');
        }
        boton.textContent = opcion.texto;
        boton.dataset[atributo] = opcion.valor;
        contenedor.appendChild(boton);
    });

    return contenedor;
}

// RETO 5 - CrearFormularioCita()
export function crearFormularioCita() {
    const formulario = document.createElement('form');
    formulario.classList.add('formulario-cita');

    formulario.innerHTML = `
        <div class="campo">
            <label for="cliente">Cliente</label>
            <input type="text" id="cliente" name="cliente" required>
        </div>

        <div class="campo">
            <label for="especialista">Especialista</label>
            <input type="text" id="especialista" name="especialista" required>
        </div>

        <div class="campo">
            <label for="servicio">Servicio</label>
            <input type="text" id="servicio" name="servicio" required>
        </div>

        <div class="campo">
            <label for="valor">Valor</label>
            <input type="number" id="valor" name="valor" min="0" step="1000" required>
        </div>

        <div class="campo">
            <label for="mes">Mes (1-12)</label>
            <input type="number" id="mes" name="mes" min="1" max="12" required>
        </div>

        <div class="campo">
            <label for="fecha">Fecha</label>
            <input type="date" id="fecha" name="fecha" required>
        </div>

        <div class="campo">
            <label for="estado">Estado</label>
            <select id="estado" name="estado">
                <option value="completada">Completada</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
            </select>
        </div>

        <button type="submit" class="btn-agregar">Agregar cita</button>
    `;

    return formulario;
}
