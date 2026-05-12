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
- [ ] TextArea para ingresar participantes (uno por línea)
- [ ] Validación: tamaño máximo de **50 caracteres por línea**
- [ ] Máximo **100 participantes**
- [ ] **Guardar automáticamente** en `localStorage` al editar
- [ ] **Recuperar desde `localStorage`** al cargar la página
- [ ] Mostrar contador de participantes (ej: "0" en la esquina del TextArea)

## Tu funcionalidad (Parte 2b — 3 puntos)

### F2 — Configuración del sorteo
- [ ] Dos opciones (radio buttons o similar) para **predefinir el sorteo**:
  - "Cantidad de equipos a generar" (ej: 2, 3, 4… equipos)
  - "Participantes por equipo" (ej: 2, 3, 4… por equipo)
- [ ] **Lista desplegable** (`<select>`) para elegir el número según la opción seleccionada
- [ ] Input de texto para el **título del sorteo** (ej: "Copa del Mundo Qatar 2022")
- [ ] Botón **Limpiar** que vacíe el TextArea y resetee los controles

## Lo que debes EXPONER para Cristhian Egoavil

Él necesita leer:
- La lista de participantes (array de strings)
- El modo: `"cantidadEquipos"` o `"participantesPorEquipo"`
- El número elegido en el select
- El título del sorteo

**Sugerencia:** guarda estos valores en variables/funciones globales con nombres claros en español, por ejemplo:

```js
function obtenerParticipantes() { ... }
function obtenerModoSorteo() { ... }
function obtenerNumeroSorteo() { ... }
function obtenerTituloSorteo() { ... }
```

Coordina con Cristhian los nombres exactos.

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
- Comunícate con Anyelo si necesitas exponer alguna función o variable global desde la ruleta.
- Push frecuente: `git push origin angel-huaynate`.
