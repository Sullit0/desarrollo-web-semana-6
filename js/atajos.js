// ============================================================
// Modulo: TEXTAREA + ATAJOS DE TECLADO (ruleta)
// Owner: Alessandro Poves
// Funcionalidades: F4 TextArea+localStorage, F5 sync ruleta, F6 tecla S, F7 tecla E, F8 tecla R, F9 tecla F
// ============================================================
// API disponible desde ruleta.js (puedes llamarla):
//   - window.redibujarRuleta()              -> redibuja la ruleta tras editar el textarea
//   - window.girarRuleta()                  -> inicia el giro (para SPACE)
//   - window.ultimoElementoGanadorRuleta    -> string con el último ganador (para tecla S)
//   - window.ocultarElementoRuleta(texto)   -> oculta un elemento del sorteo
//   - window.reiniciarRuleta()              -> hace visibles los ocultos

(function () {
    var CLAVE_STORAGE = 'elementos-ruleta';
    var elementosOcultos = new Set();

    var textarea    = document.getElementById('textareaElementos');
    var vistaEl     = document.getElementById('vistaElementos');
    var botonEditar = document.getElementById('botonEditar');
    var botonReiniciar  = document.getElementById('botonReiniciar');
    var botonEsconder   = document.getElementById('botonEsconder');

    // ── F4: localStorage ──────────────────────────────────────

    function guardarEnStorage() {
        localStorage.setItem(CLAVE_STORAGE, textarea.value);
    }

    function cargarDesdeStorage() {
        var guardado = localStorage.getItem(CLAVE_STORAGE);
        if (guardado !== null) {
            textarea.value = guardado;
        }
    }

    // ── F5: Sincronizar con la ruleta ─────────────────────────

    function sincronizarConRuleta() {
        if (typeof window.redibujarRuleta === 'function') {
            window.redibujarRuleta();
        }
    }

    // ── Vista con resaltado de ocultos ────────────────────────

    function actualizarVista() {
        var lineas = textarea.value.split('\n');
        vistaEl.innerHTML = '';
        lineas.forEach(function (linea) {
            var fila = document.createElement('div');
            fila.textContent = linea || ' ';
            if (linea.trim() && elementosOcultos.has(linea.trim())) {
                fila.classList.add('elemento-oculto');
            }
            vistaEl.appendChild(fila);
        });
    }

    // ── F7: Modo edición ──────────────────────────────────────

    function activarEdicion() {
        textarea.readOnly = false;
        textarea.style.display = 'block';
        vistaEl.style.display = 'none';
        botonEditar.textContent = 'Listo';
        textarea.focus();
    }

    function desactivarEdicion() {
        textarea.readOnly = true;
        textarea.style.display = 'none';
        vistaEl.style.display = 'block';
        botonEditar.textContent = 'Editar';
        actualizarVista();
    }

    // ── F6: Tecla S — ocultar último ganador ──────────────────

    function ocultarUltimoGanador() {
        var ultimo = window.ultimoElementoGanadorRuleta;
        if (!ultimo) return;
        elementosOcultos.add(ultimo);
        actualizarVista();
        if (typeof window.ocultarElementoRuleta === 'function') {
            window.ocultarElementoRuleta(ultimo);
        }
    }

    // ── F8: Tecla R / botón Reiniciar ─────────────────────────

    function reiniciar() {
        elementosOcultos.clear();
        actualizarVista();
        if (typeof window.reiniciarRuleta === 'function') {
            window.reiniciarRuleta();
        }
    }

    // ── F9: Tecla F — pantalla completa ───────────────────────

    function alternarPantallaCompleta() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(function () {});
        } else {
            document.exitFullscreen();
        }
    }

    // ── Eventos ───────────────────────────────────────────────

    // F4: guardar al editar + F5: sincronizar ruleta
    textarea.addEventListener('input', function () {
        guardarEnStorage();
        elementosOcultos.clear();
        actualizarVista();
        sincronizarConRuleta();
    });

    // Botón "Editar / Listo"
    botonEditar.addEventListener('click', function () {
        if (textarea.readOnly) activarEdicion();
        else desactivarEdicion();
    });

    // Botón "Reiniciar" (F8)
    botonReiniciar.addEventListener('click', reiniciar);

    // Botón "esconder..." (F6)
    botonEsconder.addEventListener('click', ocultarUltimoGanador);

    // F7: click sobre la vista activa edición
    vistaEl.addEventListener('click', activarEdicion);

    // Atajos de teclado
    document.addEventListener('keydown', function (evento) {
        var enEdicion = !textarea.readOnly && document.activeElement === textarea;
        if (enEdicion) return;

        switch (evento.key.toUpperCase()) {
            case 'S':
                ocultarUltimoGanador();
                break;
            case 'R':
                reiniciar();
                break;
            case 'E':
                activarEdicion();
                break;
            case 'F':
                evento.preventDefault();
                alternarPantallaCompleta();
                break;
        }
    });

    // ── Confeti ───────────────────────────────────────────────

    function lanzarConfeti() {
        var lienzo = document.createElement('canvas');
        lienzo.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;pointer-events:none;';
        lienzo.width = window.innerWidth;
        lienzo.height = window.innerHeight;
        document.body.appendChild(lienzo);
        var ctx = lienzo.getContext('2d');

        var COLORES = ['#e74c3c','#3498db','#2ecc71','#f1c40f','#9b59b6','#e67e22','#1abc9c','#e91e63','#ffffff'];
        var DURACION = 5500;
        var particulas = [];

        for (var i = 0; i < 200; i++) {
            particulas.push({
                x: Math.random() * lienzo.width,
                y: -20 - Math.random() * 250,
                ancho: 7 + Math.random() * 10,
                alto: 4 + Math.random() * 7,
                color: COLORES[i % COLORES.length],
                vx: -4 + Math.random() * 8,
                vy: 2 + Math.random() * 7,
                rotacion: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.18,
                forma: i % 4 === 0 ? 'circulo' : 'rect',
                opacidad: 1
            });
        }

        var inicio = performance.now();

        function dibujarConfeti(ahora) {
            var transcurrido = ahora - inicio;
            ctx.clearRect(0, 0, lienzo.width, lienzo.height);

            var hayVivas = false;
            for (var j = 0; j < particulas.length; j++) {
                var p = particulas[j];
                if (p.y > lienzo.height + 50) continue;
                hayVivas = true;

                p.x  += p.vx;
                p.y  += p.vy;
                p.vy += 0.13;
                p.vx *= 0.99;
                p.rotacion += p.vRot;

                if (transcurrido > DURACION * 0.65) {
                    p.opacidad = Math.max(0, p.opacidad - 0.012);
                }

                ctx.save();
                ctx.globalAlpha = p.opacidad;
                ctx.fillStyle = p.color;
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotacion);

                if (p.forma === 'circulo') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.ancho / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(-p.ancho / 2, -p.alto / 2, p.ancho, p.alto);
                }

                ctx.restore();
            }

            if (hayVivas && transcurrido < DURACION + 2500) {
                requestAnimationFrame(dibujarConfeti);
            } else {
                document.body.removeChild(lienzo);
            }
        }

        requestAnimationFrame(dibujarConfeti);
    }

    window.alAnunciarGanador = function () {
        lanzarConfeti();
    };

    // ── Inicializar ───────────────────────────────────────────

    cargarDesdeStorage();   // F4: recuperar desde localStorage
    desactivarEdicion();    // arrancar en modo vista
    sincronizarConRuleta(); // F5: primer dibujo de la ruleta

})();
