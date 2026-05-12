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
- Push frecuente: `git push origin angel-huaynate`.
