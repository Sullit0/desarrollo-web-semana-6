# Tareas — Cristhian Egoavil

**Rama:** `cristhian-egoavil`
**Parte asignada:** 2c + 2d — Generación de equipos y exportación
**Puntos:** 5 (3 + 2)

## ⚠️ Antes de empezar

Espera a que **Anyelo** pushee el esqueleto base a `main` y, idealmente, a que **Angel** tenga lista la sección de entrada. Luego en tu rama:

```bash
git checkout cristhian-egoavil
git pull origin main                    # traer el esqueleto base
# (opcional) git merge origin/angel-huaynate   # traer la sección de entrada de Angel
```

Coordina con Angel los nombres de las funciones para leer participantes/configuración.

## Tu funcionalidad (Parte 2c — 3 puntos)

### F3 — Botón Generar + pantalla de resultados
- [x] Botón **Generar equipos** que dispara el sorteo aleatorio
- [x] Mostrar una **segunda pantalla** (puede ser otra vista, modal o sección que se muestra/oculta)
- [x] En esa pantalla, mostrar los **integrantes uno a uno por cada equipo** hasta completar los participantes por equipo
- [x] Cada equipo va dentro de un **rectángulo** (div con border)
- [x] Cada rectángulo tiene un **subtítulo con el número de equipo** (ej: "Equipo 1", "Equipo 2"…)
- [x] Algoritmo de sorteo: aleatorizar la lista (ej: Fisher-Yates) y repartir según el modo elegido

## Tu funcionalidad (Parte 2d — 2 puntos)

### F4 — Tres botones de exportación (parte inferior de la segunda pantalla)

- [x] **Botón 1: Descargar JPG**
  - Capturar la pantalla de equipos como imagen y descargar como `.jpg`
  - Pista: usar `<canvas>` + `canvas.toDataURL("image/jpeg")` y un link de descarga
  - (No se permiten librerías; tendrás que dibujar manualmente los equipos en canvas, o usar `<foreignObject>` en SVG)

- [x] **Botón 2: Copiar al portapapeles**
  - Copiar el texto de los equipos al portapapeles usando `navigator.clipboard.writeText(...)`
  - Formato sugerido:
    ```
    Equipo 1:
    - Juan
    - María
    Equipo 2:
    - Pedro
    ...
    ```

- [x] **Botón 3: Copiar por columnas**
  - Copiar los equipos en formato de **columnas** (cada equipo en una columna, separadas por tabulador `\t`) para pegarlo limpio en Excel/Sheets

## Reglas

- Solo HTML + CSS + JavaScript puro (sin librerías).
- Funciones y variables con **nombres descriptivos en español**.
- Push frecuente: `git push origin cristhian-egoavil`.
