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

## Reglas

- Solo HTML + CSS + JavaScript puro (sin librerías).
- Funciones y variables con **nombres descriptivos en español**.
- Push frecuente: `git push origin angel-huaynate`.
