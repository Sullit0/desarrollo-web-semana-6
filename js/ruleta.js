// ============================================================
// Modulo: RULETA
// Owner: Anyelo Sulluchuco
// Funcionalidades:
//   F1 — Ruleta dinámica con triángulo rojo indicador
//   F2 — 5 colores básicos (se repiten si hay más de 5 elementos)
//   F3 — Click sobre ruleta / tecla SPACE / botón Iniciar -> giro aleatorio
// ============================================================

const COLORES_RULETA = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f", "#9b59b6"];

const canvasRuleta = document.getElementById("canvasRuleta");
const contextoRuleta = canvasRuleta.getContext("2d");
const textareaElementos = document.getElementById("textareaElementos");
const respuestaRuleta = document.getElementById("respuestaRuleta");
const botonIniciar = document.getElementById("botonIniciar");

let anguloActualRuleta = 0;
let ruletaGirando = false;
let elementosOcultosRuleta = new Set();

window.ultimoElementoGanadorRuleta = null;

function obtenerElementosVisiblesRuleta() {
    return textareaElementos.value
        .split("\n")
        .map(linea => linea.trim())
        .filter(linea => linea.length > 0 && !elementosOcultosRuleta.has(linea));
}

function dibujarRuleta() {
    const ancho = canvasRuleta.width;
    const alto = canvasRuleta.height;
    const radio = Math.min(ancho, alto) / 2 - 10;
    const centroX = ancho / 2;
    const centroY = alto / 2;

    contextoRuleta.clearRect(0, 0, ancho, alto);

    const elementos = obtenerElementosVisiblesRuleta();

    if (elementos.length === 0) {
        contextoRuleta.fillStyle = "#e0e0e0";
        contextoRuleta.beginPath();
        contextoRuleta.arc(centroX, centroY, radio, 0, Math.PI * 2);
        contextoRuleta.fill();
        contextoRuleta.fillStyle = "#666";
        contextoRuleta.font = "18px sans-serif";
        contextoRuleta.textAlign = "center";
        contextoRuleta.textBaseline = "middle";
        contextoRuleta.fillText("Agrega elementos en el TextArea", centroX, centroY);
        dibujarTrianguloIndicador();
        return;
    }

    const anguloPorSector = (Math.PI * 2) / elementos.length;

    for (let indice = 0; indice < elementos.length; indice++) {
        const anguloInicio = anguloActualRuleta + indice * anguloPorSector;
        const anguloFin = anguloInicio + anguloPorSector;

        contextoRuleta.beginPath();
        contextoRuleta.moveTo(centroX, centroY);
        contextoRuleta.arc(centroX, centroY, radio, anguloInicio, anguloFin);
        contextoRuleta.closePath();
        contextoRuleta.fillStyle = COLORES_RULETA[indice % COLORES_RULETA.length];
        contextoRuleta.fill();
        contextoRuleta.strokeStyle = "#ffffff";
        contextoRuleta.lineWidth = 2;
        contextoRuleta.stroke();

        contextoRuleta.save();
        contextoRuleta.translate(centroX, centroY);
        contextoRuleta.rotate(anguloInicio + anguloPorSector / 2);
        contextoRuleta.textAlign = "right";
        contextoRuleta.textBaseline = "middle";
        contextoRuleta.fillStyle = "#ffffff";
        contextoRuleta.font = "bold 18px sans-serif";
        contextoRuleta.fillText(elementos[indice], radio - 15, 0);
        contextoRuleta.restore();
    }

    contextoRuleta.beginPath();
    contextoRuleta.arc(centroX, centroY, 18, 0, Math.PI * 2);
    contextoRuleta.fillStyle = "#222";
    contextoRuleta.fill();

    dibujarTrianguloIndicador();
}

function dibujarTrianguloIndicador() {
    const ancho = canvasRuleta.width;
    const alto = canvasRuleta.height;
    const centroY = alto / 2;
    const puntaX = ancho - 4;
    const baseX = ancho - 44;

    contextoRuleta.save();
    contextoRuleta.shadowColor = "rgba(0,0,0,0.45)";
    contextoRuleta.shadowBlur = 8;
    contextoRuleta.shadowOffsetX = -3;
    contextoRuleta.shadowOffsetY = 3;

    contextoRuleta.beginPath();
    contextoRuleta.moveTo(puntaX, centroY);
    contextoRuleta.lineTo(baseX, centroY - 22);
    contextoRuleta.lineTo(baseX + 10, centroY - 8);
    contextoRuleta.lineTo(baseX + 10, centroY + 8);
    contextoRuleta.lineTo(baseX, centroY + 22);
    contextoRuleta.closePath();

    const degradado = contextoRuleta.createLinearGradient(baseX, centroY - 22, puntaX, centroY);
    degradado.addColorStop(0, "#c0392b");
    degradado.addColorStop(1, "#e74c3c");
    contextoRuleta.fillStyle = degradado;
    contextoRuleta.fill();

    contextoRuleta.strokeStyle = "#ffffff";
    contextoRuleta.lineWidth = 1.5;
    contextoRuleta.stroke();
    contextoRuleta.restore();

    contextoRuleta.beginPath();
    contextoRuleta.arc(baseX + 5, centroY, 8, 0, Math.PI * 2);
    contextoRuleta.fillStyle = "#922b21";
    contextoRuleta.fill();
    contextoRuleta.strokeStyle = "#fff";
    contextoRuleta.lineWidth = 2;
    contextoRuleta.stroke();
}

function calcularIndiceGanador() {
    const elementos = obtenerElementosVisiblesRuleta();
    if (elementos.length === 0) return -1;
    const anguloPorSector = (Math.PI * 2) / elementos.length;
    const dosPi = Math.PI * 2;
    const anguloNormalizado = ((anguloActualRuleta % dosPi) + dosPi) % dosPi;
    const anguloDesdeTriangulo = (dosPi - anguloNormalizado) % dosPi;
    return Math.floor(anguloDesdeTriangulo / anguloPorSector) % elementos.length;
}

function calcularElementoGanador() {
    const elementos = obtenerElementosVisiblesRuleta();
    if (elementos.length === 0) return null;
    return elementos[calcularIndiceGanador()];
}

function animarDestelloGanador(indice, alTerminar) {
    const elementos = obtenerElementosVisiblesRuleta();
    const anguloPorSector = (Math.PI * 2) / elementos.length;
    const anguloInicio = anguloActualRuleta + indice * anguloPorSector;
    const anguloFin = anguloInicio + anguloPorSector;
    const radio = Math.min(canvasRuleta.width, canvasRuleta.height) / 2 - 10;
    const centroX = canvasRuleta.width / 2;
    const centroY = canvasRuleta.height / 2;

    let fotograma = 0;
    const totalFotogramas = 50;

    function pulsar() {
        dibujarRuleta();
        const intensidad = Math.sin((fotograma / totalFotogramas) * Math.PI * 3) * 0.55;
        contextoRuleta.save();
        contextoRuleta.globalAlpha = Math.max(0, intensidad);
        contextoRuleta.beginPath();
        contextoRuleta.moveTo(centroX, centroY);
        contextoRuleta.arc(centroX, centroY, radio, anguloInicio, anguloFin);
        contextoRuleta.closePath();
        contextoRuleta.fillStyle = "#ffffff";
        contextoRuleta.fill();
        contextoRuleta.restore();
        fotograma++;
        if (fotograma <= totalFotogramas) {
            requestAnimationFrame(pulsar);
        } else {
            dibujarRuleta();
            alTerminar();
        }
    }
    pulsar();
}

function girarRuleta() {
    if (ruletaGirando) return;
    const elementos = obtenerElementosVisiblesRuleta();
    if (elementos.length === 0) return;

    ruletaGirando = true;
    respuestaRuleta.textContent = "girando…";

    const anguloInicial = anguloActualRuleta;
    const vueltasCompletas = 6 + Math.random() * 6;
    const rotacionTotal = vueltasCompletas * Math.PI * 2 + Math.random() * Math.PI * 2;
    const duracionMs = 5000;
    const tiempoInicio = performance.now();

    function animarGiro(tiempoActual) {
        const transcurrido = tiempoActual - tiempoInicio;
        const progreso = Math.min(transcurrido / duracionMs, 1);
        const progresoSuavizado = 1 - Math.pow(1 - progreso, 5);

        anguloActualRuleta = anguloInicial + rotacionTotal * progresoSuavizado;
        dibujarRuleta();

        if (progreso < 1) {
            requestAnimationFrame(animarGiro);
        } else {
            ruletaGirando = false;
            const indice = calcularIndiceGanador();
            const ganador = calcularElementoGanador();
            window.ultimoElementoGanadorRuleta = ganador;
            respuestaRuleta.textContent = ganador || "RESPUESTA";
            animarDestelloGanador(indice, function () {
                if (typeof window.alAnunciarGanador === "function") {
                    window.alAnunciarGanador(ganador);
                }
            });
        }
    }

    requestAnimationFrame(animarGiro);
}

function ocultarElementoRuleta(textoElemento) {
    if (!textoElemento) return;
    elementosOcultosRuleta.add(textoElemento);
    dibujarRuleta();
}

function reiniciarRuleta() {
    elementosOcultosRuleta.clear();
    respuestaRuleta.textContent = "RESPUESTA";
    window.ultimoElementoGanadorRuleta = null;
    dibujarRuleta();
}

botonIniciar.addEventListener("click", girarRuleta);
canvasRuleta.addEventListener("click", girarRuleta);

document.addEventListener("keydown", (evento) => {
    if (evento.target === textareaElementos) return;
    if (evento.code === "Space") {
        evento.preventDefault();
        girarRuleta();
    }
});

const botonReiniciar = document.getElementById("botonReiniciar");
if (botonReiniciar) {
    botonReiniciar.addEventListener("click", reiniciarRuleta);
}

window.redibujarRuleta = dibujarRuleta;
window.girarRuleta = girarRuleta;
window.ocultarElementoRuleta = ocultarElementoRuleta;
window.reiniciarRuleta = reiniciarRuleta;

dibujarRuleta();
