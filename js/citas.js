export function useProcesarCitas(citas = []) { 
    const totalPorEstado = {}; 
    const totalPorServicio = {}; 
    const estadosSet = new Set(); 
    const serviciosSet = new Set(); 
    const mesesSet = new Set(); 
    let totalIngresos = 0;

    citas.forEach((cita) => { 
        const valor = Number(cita.valor) || 0; 
        totalIngresos += valor; 
        // Acumulado por estado ()completada, confirmada, cancelada
        totalPorEstado[cita.estado] = 
            (totalPorEstado[cita.estado] || 0) + valor; 
        // Acumulado por servicio 
        if (!totalPorServicio[cita.servicio]) { 
            totalPorServicio[cita.servicio] = { 
                total: 0, 
                color: cita.color 
            }; 
        } 
        totalPorServicio[cita.servicio].total += valor; 
        // Listas únicas  usando Set
        estadosSet.add(cita.estado); 
        serviciosSet.add(cita.servicio); 
        mesesSet.add(cita.mes); 
    }); 
    const totalPorServicioSimple = {}; 
    Object.entries(totalPorServicio).forEach( 
        ([servicio, item]) => { 
            totalPorServicioSimple[servicio] = 
                item.total; 
    } 
    ); 
    // Objeto transformado para gráficas/tablas con porcentajes
    const tablaServiciosGrafica = 
        Object.entries(totalPorServicio).map( 
            ([servicio, item]) => { 
                
                const porcentaje = 
                    totalIngresos > 0 
                        ? (item.total / totalIngresos) * 100 
                        : 0; 
                return { 
                    servicio, 
                    color: item.color, 
                    total: item.total, 
                    porcentaje: 
                    Number(porcentaje.toFixed(2)) 
                }; 
            } 
        ); 
    return { 
        nombreCompleto: citas[0]?.especialista || '', 
        totalIngresos, 
        cantidadCitas: citas.length, 
        totalPorEstado, 
        totalPorCategoria: totalPorCategoriaSimple, 
        listaEstados: 
        Array.from(estadosSet), 
        listaServicios: 
        Array.from(serviciosSet), 
        listaMeses: 
        Array.from(mesesSet) 
        .sort((a, b) => a - b), //orden
        tablaServiciosGrafica
    }; 
} 