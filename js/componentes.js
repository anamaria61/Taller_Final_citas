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