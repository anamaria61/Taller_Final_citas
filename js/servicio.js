export async function obtenerCitas() { 
    try { 
        const respuesta = await fetch('./data/citas.json'); 
        if (!respuesta.ok) { 
            throw new Error('Error al consultar la información'); 
        } 
        const respuestaApi = await respuesta.json(); 
        // Validamos la respuesta simulada de la API 
        if (respuestaApi.status !== 'success') { 
            throw new Error( 
        respuestaApi.mensaje || 'Error en la respuesta de la API' ); 
        } 
        // El servicio entrega únicamente el contenido de data
        return respuestaApi.data; 
        } catch (error) { 
        console.error('Error al obtener las citas:', error); 
        throw error; 
    } 
}