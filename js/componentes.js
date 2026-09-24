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
            <td>${c.barbero}</td>
            <td>${c.servicio}</td>
            <td>$${c.valor.toLocaleString('es-CO')}</td>
            <td><span class="badge ${c.estado}">${c.estado}</span></td>
        </tr>`;
    });

    html += '</tbody';
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
export function crearTablaMese(listaMeses) {
    const nombresMeses = {
        1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril', 5: 'Mayo', 6: 'Junio',
        7: 'Julio', 8: 'Agosto', 9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
    };

    const tabla = Document.createElement('table');
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