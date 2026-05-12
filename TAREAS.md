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
- [ ] Botón **Generar equipos** que dispara el sorteo aleatorio
- [ ] Mostrar una **segunda pantalla** (puede ser otra vista, modal o sección que se muestra/oculta)
- [ ] En esa pantalla, mostrar los **integrantes uno a uno por cada equipo** hasta completar los participantes por equipo
- [ ] Cada equipo va dentro de un **rectángulo** (div con border)
- [ ] Cada rectángulo tiene un **subtítulo con el número de equipo** (ej: "Equipo 1", "Equipo 2"…)
- [ ] Algoritmo de sorteo: aleatorizar la lista (ej: Fisher-Yates) y repartir según el modo elegido

## Tu funcionalidad (Parte 2d — 2 puntos)

### F4 — Tres botones de exportación (parte inferior de la segunda pantalla)

- [ ] **Botón 1: Descargar JPG**
  - Capturar la pantalla de equipos como imagen y descargar como `.jpg`
  - Pista: usar `<canvas>` + `canvas.toDataURL("image/jpeg")` y un link de descarga
  - (No se permiten librerías; tendrás que dibujar manualmente los equipos en canvas, o usar `<foreignObject>` en SVG)

- [ ] **Botón 2: Copiar al portapapeles**
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

- [ ] **Botón 3: Copiar por columnas**
  - Copiar los equipos en formato de **columnas** (cada equipo en una columna, separadas por tabulador `\t`) para pegarlo limpio en Excel/Sheets

---

# Tareas — Angel Huaynate

**Rama:** `angel-huaynate`
**Parte asignada:** 2a + 2b — Entrada del sorteo de equipos
**Puntos:** 5 (2 + 3)

## ⚠️ Antes de empezar

Espera a que **Anyelo** pushee el esqueleto base a `main`. Luego en tu rama:

```bash
git checkout angel-huaynate
git pull origin main   # traer el esqueleto
```

Tu zona de trabajo es la **sección de Sorteo de Equipos** (separada de la ruleta).

## Tu funcionalidad (Parte 2a — 2 puntos)

### F1 — Lista de participantes
- [x] TextArea para ingresar participantes (uno por línea)
- [x] Validación: tamaño máximo de **50 caracteres por línea**
- [x] Máximo **100 participantes**
- [x] **Guardar automáticamente** en `localStorage` al editar
- [x] **Recuperar desde `localStorage`** al cargar la página
- [x] Mostrar contador de participantes (ej: "0" en la esquina del TextArea)

## Tu funcionalidad (Parte 2b — 3 puntos)

### F2 — Configuración del sorteo
- [x] Dos opciones (radio buttons o similar) para **predefinir el sorteo**:
  - "Cantidad de equipos a generar" (ej: 2, 3, 4… equipos)
  - "Participantes por equipo" (ej: 2, 3, 4… por equipo)
- [x] **Lista desplegable** (`<select>`) para elegir el número según la opción seleccionada
- [x] Input de texto para el **título del sorteo** (ej: "Copa del Mundo Qatar 2022")
- [x] Botón **Limpiar** que vacíe el TextArea y resetee los controles

## Reglas

- Solo HTML + CSS + JavaScript puro (sin librerías).
- Funciones y variables con **nombres descriptivos en español**.
- Push frecuente a tu rama correspondiente.
- Coordina con tus compañeros si necesitas exponer funciones o variables globales.
