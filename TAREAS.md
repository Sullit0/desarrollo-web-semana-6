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

# Tareas — Alessandro Poves

**Rama:** `alessandro-poves`
**Parte asignada:** 1b + 1c — TextArea y atajos de teclado
**Puntos:** 6 (3 + 3)

## ⚠️ Antes de empezar

Espera a que **Anyelo** termine y pushee el esqueleto base a `main`. Luego en tu rama:

```bash
git checkout alessandro-poves
git pull origin main   # traer el esqueleto base
```

Trabajas sobre el TextArea y la ruleta que Anyelo ya creó.

## Tu funcionalidad (Parte 1b — 3 puntos)

### F4 — TextArea editable
- [ ] TextArea que permita **copiar y pegar datos multifila** (un elemento por línea)
- [ ] **Guardar automáticamente** en `localStorage` al editar
- [ ] **Recuperar desde `localStorage`** al cargar la página

### F5 — Sincronización automática
- [ ] Los cambios en el TextArea **actualizan automáticamente la ruleta** (re-dibuja sectores)

### F6 — Tecla `S` (ocultar)
- [ ] Al presionar `S` se debe:
  - Resaltar en **color gris** (en el TextArea) el último elemento sorteado
  - Ocultarlo de los elementos de la ruleta
  - Excluirlo del siguiente sorteo

### F7 — Tecla `E` (editar)
- [ ] Tecla `E` **o** click sobre el TextArea → habilita la edición
- [ ] Permitir ingresar números o cualquier texto

## Tu funcionalidad (Parte 1c — 3 puntos)

### F8 — Tecla `R` (reiniciar)
- [ ] Tecla `R` o botón **Reiniciar** → reinicia el estado:
  - Si hay elementos ocultos, los hace visibles para el siguiente sorteo
  - Quita el resaltado gris del TextArea

### F9 — Tecla `F` (pantalla completa)
- [ ] Tecla `F` → activa **pantalla completa** (Fullscreen API del navegador)

## Reglas

- Solo HTML + CSS + JavaScript puro (sin librerías).
- Funciones y variables con **nombres descriptivos en español**.
- Push frecuente a tu rama correspondiente.
- Coordina con tus compañeros si necesitas exponer funciones o variables globales.
