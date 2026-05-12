// ============================================================
// Modulo: GENERAR equipos + exportar
// Owner: Cristhian Egoavil
// Funcionalidades: F3 generar + pantalla resultado, F4 botones JPG/portapapeles/columnas
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const botonGenerarSorteo = document.getElementById('botonGenerarSorteo');
    const pantallaConfigSorteo = document.getElementById('pantallaConfigSorteo');
    const pantallaResultadoSorteo = document.getElementById('pantallaResultadoSorteo');
    const tituloResultadoSorteo = document.getElementById('tituloResultadoSorteo');
    const contenedorEquipos = document.getElementById('contenedorEquipos');

    const botonDescargarJpg = document.getElementById('botonDescargarJpg');
    const botonCopiarPortapapeles = document.getElementById('botonCopiarPortapapeles');
    const botonCopiarColumnas = document.getElementById('botonCopiarColumnas');
    const botonVolverSorteo = document.getElementById('botonVolverSorteo');

    // Estado local para exportación
    let equiposActuales = [];

    // --- FUNCIONES DE LÓGICA ---

    /**
     * Algoritmo Fisher-Yates para aleatorizar un array
     */
    const barajarArray = (array) => {
        const nuevoArray = [...array];
        for (let i = nuevoArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
        }
        return nuevoArray;
    };

    /**
     * Divide los participantes en equipos según la configuración
     * Maneja líderes (marcados con *) distribuyéndolos equitativamente.
     */
    const generarEquipos = () => {
        const todosLosParticipantes = window.obtenerParticipantes();
        if (todosLosParticipantes.length === 0) {
            alert('Por favor, ingresa al menos un participante.');
            return;
        }

        const modo = window.obtenerModoSorteo();
        const numero = window.obtenerNumeroSorteo();
        
        // Separar líderes de miembros normales
        const lideres = todosLosParticipantes.filter(p => p.startsWith('*')).map(p => p.replace(/^\*\s*/, '✦ '));
        const miembros = todosLosParticipantes.filter(p => !p.startsWith('*'));

        const lideresBarajados = barajarArray(lideres);
        const miembrosBarajados = barajarArray(miembros);
        
        let resultado = [];

        if (modo === 'cantidadEquipos') {
            // Inicializar equipos vacíos
            for (let i = 0; i < numero; i++) {
                resultado.push([]);
            }
            // Distribuir líderes primero
            lideresBarajados.forEach((l, index) => {
                resultado[index % numero].push(l);
            });
            // Distribuir miembros
            miembrosBarajados.forEach((m, index) => {
                // Empezar a repartir miembros después de los líderes (si hay) para balancear
                const equipoIndex = (index + lideresBarajados.length) % numero;
                resultado[equipoIndex].push(m);
            });
        } else {
            // Participantes por equipo
            // Unimos todo pero manteniendo líderes al inicio de cada bloque si es posible
            // (Para este modo es más complejo, así que simplemente barajamos todo junto 
            // pero manteniendo el marcador ✦ para los que eran líderes)
            const todos = barajarArray([...lideresBarajados, ...miembrosBarajados]);
            for (let i = 0; i < todos.length; i += numero) {
                resultado.push(todos.slice(i, i + numero));
            }
        }

        equiposActuales = resultado.filter(eq => eq.length > 0);
        mostrarResultados();
    };

    /**
     * Renderiza los equipos en la pantalla de resultados con una pequeña animación
     */
    const mostrarResultados = () => {
        tituloResultadoSorteo.textContent = window.obtenerTituloSorteo();
        contenedorEquipos.innerHTML = '';

        equiposActuales.forEach((equipo, index) => {
            const card = document.createElement('div');
            card.className = 'equipoCard';
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            card.style.transition = 'all 0.3s ease';
            
            const titulo = document.createElement('h3');
            titulo.className = 'equipoTitulo';
            titulo.textContent = `Equipo ${index + 1}`;
            card.appendChild(titulo);

            equipo.forEach((integrante, i) => {
                const p = document.createElement('div');
                p.className = 'equipoIntegrante';
                p.textContent = integrante;
                p.style.opacity = '0';
                p.style.transition = `opacity 0.2s ease ${0.1 + (i * 0.05)}s`;
                card.appendChild(p);

                // Disparar animación de integrante después
                setTimeout(() => p.style.opacity = '1', 50);
            });

            contenedorEquipos.appendChild(card);

            // Animación de la card
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Cambio de pantalla
        pantallaConfigSorteo.classList.add('oculto');
        pantallaResultadoSorteo.classList.remove('oculto');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- FUNCIONES DE EXPORTACIÓN ---

    /**
     * F4: Descargar JPG usando Canvas
     */
    const descargarJpg = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Configuraciones de diseño para el canvas
        const padding = 40;
        const cardWidth = 250;
        const cardMargin = 20;
        const headerHeight = 80;
        const lineSpacing = 25;
        const columns = Math.min(equiposActuales.length, 3);
        const rows = Math.ceil(equiposActuales.length / columns);

        // Calcular altura dinámica
        let maxIntegrantes = 0;
        equiposActuales.forEach(eq => maxIntegrantes = Math.max(maxIntegrantes, eq.length));
        
        const cardHeight = 40 + 30 + (maxIntegrantes * lineSpacing);
        canvas.width = (columns * cardWidth) + ((columns - 1) * cardMargin) + (padding * 2);
        canvas.height = headerHeight + (rows * cardHeight) + ((rows - 1) * cardMargin) + padding;

        // Fondo
        ctx.fillStyle = '#f4f5f7';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Título
        ctx.fillStyle = '#2c7be5';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(window.obtenerTituloSorteo(), canvas.width / 2, 45);

        // Dibujar equipos
        ctx.textAlign = 'left';
        equiposActuales.forEach((equipo, index) => {
            const col = index % columns;
            const row = Math.floor(index / columns);
            
            const x = padding + (col * (cardWidth + cardMargin));
            const y = headerHeight + (row * (cardHeight + cardMargin));

            // Card background & border
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#2c7be5';
            ctx.lineWidth = 2;
            roundRect(ctx, x, y, cardWidth, cardHeight, 8, true, true);

            // Título equipo
            ctx.fillStyle = '#2c7be5';
            ctx.font = 'bold 16px sans-serif';
            ctx.fillText(`Equipo ${index + 1}`, x + 15, y + 25);

            // Línea separadora
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x + 15, y + 35);
            ctx.lineTo(x + cardWidth - 15, y + 35);
            ctx.stroke();

            // Integrantes
            ctx.fillStyle = '#333333';
            ctx.font = '14px sans-serif';
            equipo.forEach((integrante, i) => {
                ctx.fillText(integrante, x + 15, y + 60 + (i * lineSpacing));
            });
        });

        // Descarga
        const link = document.createElement('a');
        link.download = `equipos-${Date.now()}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
    };

    /**
     * Helper para dibujar rectángulos redondeados en canvas
     */
    function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    }

    /**
     * F4: Copiar al portapapeles (Formato lista)
     */
    const copiarPortapapeles = () => {
        let texto = `${window.obtenerTituloSorteo()}\n\n`;
        equiposActuales.forEach((equipo, index) => {
            texto += `Equipo ${index + 1}:\n`;
            equipo.forEach(p => texto += `- ${p}\n`);
            texto += '\n';
        });

        navigator.clipboard.writeText(texto.trim())
            .then(() => alert('Copiado al portapapeles con éxito.'))
            .catch(err => console.error('Error al copiar: ', err));
    };

    /**
     * F4: Copiar por columnas (Excel compatible)
     */
    const copiarColumnas = () => {
        let maxFilas = 0;
        equiposActuales.forEach(eq => maxFilas = Math.max(maxFilas, eq.length));

        // Cabecera: Equipo 1, Equipo 2...
        let lineas = [];
        let cabecera = equiposActuales.map((_, i) => `Equipo ${i + 1}`).join('\t');
        lineas.push(cabecera);

        // Filas de integrantes
        for (let f = 0; f < maxFilas; f++) {
            let fila = equiposActuales.map(eq => eq[f] || '').join('\t');
            lineas.push(fila);
        }

        const textoFinal = lineas.join('\n');
        navigator.clipboard.writeText(textoFinal)
            .then(() => alert('Copiado en formato de columnas para Excel.'))
            .catch(err => console.error('Error al copiar columnas: ', err));
    };

    // --- MANEJO DE EVENTOS ---

    botonGenerarSorteo.addEventListener('click', generarEquipos);

    botonVolverSorteo.addEventListener('click', () => {
        pantallaResultadoSorteo.classList.add('oculto');
        pantallaConfigSorteo.classList.remove('oculto');
    });

    botonDescargarJpg.addEventListener('click', descargarJpg);
    botonCopiarPortapapeles.addEventListener('click', copiarPortapapeles);
    botonCopiarColumnas.addEventListener('click', copiarColumnas);
});
