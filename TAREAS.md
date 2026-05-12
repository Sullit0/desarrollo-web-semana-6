# Tareas — Sullit0 (responsable del equipo)

**Rama:** `Sullit0`
**Parte asignada:** 1a — Ruleta dinámica
**Puntos:** 4

## Orden de trabajo

⚠️ **Tú empiezas PRIMERO.** Antes de tu funcionalidad debes crear el esqueleto base HTML/CSS/JS que todos compartirán, para que los demás no creen archivos duplicados.

### Paso 0 — Esqueleto base (subir a `main`)

Crear `index.html`, `styles.css`, `script.js` con la estructura general:

- Sección izquierda: contenedor de la **ruleta** + texto RESPUESTA
- Sección derecha arriba: **TextArea de elementos** + botones (Título, Editar, Esconder)
- Sección derecha abajo: leyenda de atajos (SPACE, S, R, E, F)
- Sección de **sorteo de equipos** (puede ser otra pantalla o sección separada)

Una vez que tengas la estructura mínima, hacer `git push origin main` para que los demás partan desde ahí.

## Tu funcionalidad (Parte 1a — 4 puntos)

### F1 — Ruleta dinámica
- [ ] Dibujar una ruleta circular subdividida en sectores (uno por cada elemento del TextArea)
- [ ] Triángulo rojo fijo como indicador del elemento seleccionado
- [ ] Implementar con `<canvas>` o SVG (sin librerías externas)

### F2 — Colores de sectores
- [ ] Usar **5 colores básicos** para los sectores
- [ ] Si hay más de 5 elementos, repetir los colores cíclicamente
- [ ] Los elementos de la ruleta se obtienen del **TextArea** (uno por línea)

### F3 — Girar la ruleta
- [ ] Click sobre la ruleta → gira aleatoriamente
- [ ] Tecla `SPACE` → gira
- [ ] Botón **Iniciar** → gira
- [ ] Animación de giro respetando los colores
- [ ] Mostrar el elemento ganador en el área **RESPUESTA**

## Reglas

- Solo HTML + CSS + JavaScript puro (sin librerías).
- Funciones y variables con **nombres descriptivos en español**.
- Hacer commits frecuentes y push a tu rama: `git push origin Sullit0`.

## Al final (tu responsabilidad como líder)

- Mergear las 4 ramas a `main`: `Sullit0` → `SwodLore` → `GrilloCantorr` → `CristhianRudolf7`.
- Resolver conflictos.
- Verificar que todo funcione en `main` antes de las **12:45**.
