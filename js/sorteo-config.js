// ============================================================
// Modulo: ENTRADA del sorteo de equipos
// Owner: Angel Huaynate
// Funcionalidades: F1 lista participantes + localStorage, F2 selector modo/numero + título
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const textareaParticipantes = document.getElementById('textareaParticipantes');
    const contadorParticipantes = document.getElementById('contadorParticipantes');
    const radiosModo = document.getElementsByName('modoSorteo');
    const selectNumeroSorteo = document.getElementById('selectNumeroSorteo');
    const inputTituloSorteo = document.getElementById('inputTituloSorteo');
    const botonLimpiarSorteo = document.getElementById('botonLimpiarSorteo');

    // --- FUNCIONES DE UTILIDAD ---

    /**
     * Obtiene la lista de participantes limpia (sin líneas vacías)
     */
    const limpiarYObtenerLineas = () => {
        return textareaParticipantes.value
            .split('\n')
            .map(linea => linea.trim())
            .filter(linea => linea !== '');
    };

    /**
     * Actualiza el contador visual de participantes
     */
    const actualizarContador = () => {
        const lineas = limpiarYObtenerLineas();
        contadorParticipantes.textContent = lineas.length;
    };

    /**
     * Actualiza las opciones del selector basado en el modo seleccionado
     */
    const actualizarOpcionesSelect = () => {
        const modo = Array.from(radiosModo).find(r => r.checked).value;
        const valorActual = selectNumeroSorteo.value;
        
        selectNumeroSorteo.innerHTML = '';
        
        const maxOpciones = 50; // Límite razonable
        const sufijo = modo === 'cantidadEquipos' ? 'equipos' : 'por equipo';
        
        for (let i = 2; i <= maxOpciones; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i} ${sufijo}`;
            selectNumeroSorteo.appendChild(option);
        }

        // Intentar mantener el valor si existía
        if (valorActual && Array.from(selectNumeroSorteo.options).some(opt => opt.value === valorActual)) {
            selectNumeroSorteo.value = valorActual;
        } else {
            selectNumeroSorteo.value = 2; // Default
        }
    };

    /**
     * Guarda el estado actual en LocalStorage
     */
    const guardarEnLocalStorage = () => {
        const modo = Array.from(radiosModo).find(r => r.checked).value;
        const config = {
            participantes: textareaParticipantes.value,
            modo: modo,
            numero: selectNumeroSorteo.value,
            titulo: inputTituloSorteo.value
        };
        localStorage.setItem('sorteo_config_angel', JSON.stringify(config));
    };

    /**
     * Carga el estado desde LocalStorage
     */
    const cargarDesdeLocalStorage = () => {
        const configRaw = localStorage.getItem('sorteo_config_angel');
        if (configRaw) {
            try {
                const config = JSON.parse(configRaw);
                textareaParticipantes.value = config.participantes || '';
                
                if (config.modo) {
                    const radio = Array.from(radiosModo).find(r => r.value === config.modo);
                    if (radio) radio.checked = true;
                }
                
                actualizarOpcionesSelect(); // Llenar opciones primero
                
                if (config.numero) {
                    selectNumeroSorteo.value = config.numero;
                }
                
                inputTituloSorteo.value = config.titulo || '';
                
                actualizarContador();
            } catch (e) {
                console.error("Error cargando desde LocalStorage", e);
            }
        } else {
            actualizarOpcionesSelect();
        }
    };

    // --- MANEJO DE EVENTOS ---

    textareaParticipantes.addEventListener('input', (e) => {
        let texto = e.target.value;
        let lineas = texto.split('\n');

        // F1: Validación máximo 100 participantes
        if (lineas.length > 100) {
            lineas = lineas.slice(0, 100);
        }

        // F1: Validación máximo 50 caracteres por línea
        lineas = lineas.map(linea => linea.substring(0, 50));

        const textoProcesado = lineas.join('\n');
        if (texto !== textoProcesado) {
            e.target.value = textoProcesado;
        }

        actualizarContador();
        guardarEnLocalStorage();
    });

    radiosModo.forEach(radio => {
        radio.addEventListener('change', () => {
            actualizarOpcionesSelect();
            guardarEnLocalStorage();
        });
    });

    selectNumeroSorteo.addEventListener('change', guardarEnLocalStorage);
    inputTituloSorteo.addEventListener('input', guardarEnLocalStorage);

    botonLimpiarSorteo.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas limpiar toda la configuración?')) {
            textareaParticipantes.value = '';
            radiosModo[0].checked = true; // Cantidad de equipos por defecto
            actualizarOpcionesSelect();
            selectNumeroSorteo.value = 2;
            inputTituloSorteo.value = '';
            actualizarContador();
            guardarEnLocalStorage();
        }
    });

    // --- INICIALIZACIÓN ---
    cargarDesdeLocalStorage();

    // --- EXPOSICIÓN GLOBAL (Para Cristhian Egoavil) ---

    window.obtenerParticipantes = () => {
        return limpiarYObtenerLineas();
    };

    window.obtenerModoSorteo = () => {
        const radio = Array.from(radiosModo).find(r => r.checked);
        return radio ? radio.value : 'cantidadEquipos';
    };

    window.obtenerNumeroSorteo = () => {
        return parseInt(selectNumeroSorteo.value) || 2;
    };

    window.obtenerTituloSorteo = () => {
        return inputTituloSorteo.value.trim() || 'Sorteo de Equipos';
    };
});
