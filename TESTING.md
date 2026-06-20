# 🧪 Guía de Pruebas - Invitación Dianita

Esta guía te ayuda a probar todos los flujos de la aplicación.

## 📋 Checklist de Pruebas

### 1. Pantalla de Portada
- [ ] Se muestra la portada con el título "¡Cumpleaños Dianita!"
- [ ] Se ve el número "5" con "años"
- [ ] Se ve el texto "Te esperamos en una aventura marina llena de magia"
- [ ] Hay un botón "¡Entrar!" que funciona
- [ ] Las burbujas flotantes se ven y se mueven

### 2. Video 1
- [ ] El primer video carga correctamente
- [ ] Se puede reproducir, pausar y ajustar volumen
- [ ] Hay un botón "Confirmar Asistencia" que funciona

### 3. Formulario 1 (Confirmación)
- [ ] Los campos de entrada aparecen correctamente
- [ ] El campo "Tu Nombre" permite escribir
- [ ] El campo "Tus Apellidos" permite escribir
- [ ] El campo "Acompañante" permite escribir (es opcional)
- [ ] Hay 4 botones para seleccionar niños (0, 1, 2, 3)
- [ ] Al seleccionar un número, el botón se resalta en color

#### Validaciones:
- [ ] Si dejas vacío "Tu Nombre" y haces clic en Enviar, muestra error
- [ ] Si dejas vacío "Tus Apellidos" y haces clic en Enviar, muestra error
- [ ] El campo "Acompañante" se puede dejar vacío (opcional)
- [ ] Después de llenar correctamente, aparece el botón "Enviar" en color

### 4. Video 2 y Datos Guardados
- [ ] El segundo video carga después de enviar el formulario
- [ ] Se puede reproducir normalmente
- [ ] El botón "Continuar" aparece y funciona

### 5. Formulario 2 (Puntualidad)
- [ ] Se muestra la pregunta "¿Quieres Ganar tu Premio?"
- [ ] Hay 2 opciones:
  - [ ] "Sí, estaré puntual contigo" (con emoji ✨)
  - [ ] "No, mi mamá es demorona" (con emoji 😄)
- [ ] Al hacer clic en una opción, se guarda en la base de datos

### 6. Responsividad (Móvil)
- [ ] La app se ve bien en un teléfono de 375px de ancho
- [ ] Los textos no se cortan
- [ ] Los botones se pueden presionar fácilmente (tamaño > 44x44px)
- [ ] Los videos se adaptan al ancho de la pantalla
- [ ] Los formularios se ven bien en móvil

### 7. Animaciones
- [ ] Las burbujas suben continuamente
- [ ] Las burbujas se mueven de lado a lado
- [ ] Los botones tienen efecto hover (se agrandan ligeramente)
- [ ] Los botones tienen efecto click (se encogen)
- [ ] Los formularios tienen transiciones suaves

### 8. Base de Datos
- [ ] Los datos se guardan correctamente
- [ ] Al ver la tabla en NeonDB, se ven los registros:
  ```sql
  SELECT * FROM confirmaciones;
  ```
- [ ] Cada registro tiene: nombres, apellidos, acompanante, ninos_asisten, puntualidad, created_at

## 🧪 Casos de Prueba Detallados

### Prueba 1: Flujo Completo Exitoso
1. Abre la app en http://localhost:3000
2. Haz clic en "¡Entrar!"
3. Mira el primer video
4. Haz clic en "Confirmar Asistencia"
5. Llena:
   - Nombre: "Juan"
   - Apellidos: "Pérez"
   - Acompañante: "María" (opcional)
   - Niños: Selecciona "2"
6. Haz clic en "Enviar"
7. Mira el segundo video
8. Haz clic en "Continuar"
9. Selecciona "Sí, estaré puntual contigo"
10. Verifica en NeonDB que se guardó todo

**Resultado esperado**: Datos guardados sin errores

---

### Prueba 2: Validación de Campos Vacíos
1. Ve al formulario
2. Deja "Tu Nombre" vacío
3. Haz clic en "Enviar"

**Resultado esperado**: Muestra mensaje de error "Por favor ingresa tu nombre"

1. Llena "Tu Nombre" con "Ana"
2. Deja "Tus Apellidos" vacío
3. Haz clic en "Enviar"

**Resultado esperado**: Muestra mensaje de error "Por favor ingresa tu apellido"

---

### Prueba 3: Campos Opcionales
1. Ve al formulario
2. Llena:
   - Nombre: "Carlos"
   - Apellidos: "López"
   - Acompañante: **Déjalo vacío**
   - Niños: "1"
3. Haz clic en "Enviar"

**Resultado esperado**: Se guarda correctamente, el campo acompañante puede estar vacío

---

### Prueba 4: Responsividad en Móvil
1. Abre Chrome DevTools (F12)
2. Haz clic en el icono de dispositivo móvil (esquina superior izquierda)
3. Selecciona "iPhone 12" o "Pixel 5"
4. Prueba:
   - Desplazamiento vertical
   - Visibilidad de textos
   - Tamaño de botones (> 44x44px)
   - Posición de videos

**Resultado esperado**: Todo se ve bien sin necesidad de zoom

---

### Prueba 5: Múltiples Confirmaciones
1. Haz el flujo completo (Prueba 1)
2. Abre nuevamente http://localhost:3000
3. Completa nuevamente el flujo con datos diferentes:
   - Nombre: "Patricia"
   - Apellidos: "García"
   - Niños: "3"
4. En NeonDB, ejecuta:
   ```sql
   SELECT COUNT(*) FROM confirmaciones;
   ```

**Resultado esperado**: La cantidad de registros aumenta

---

## 🐛 Errores Comunes que Buscar

### Error 1: "Error al guardar confirmación"
- **Causa**: Base de datos no conectada
- **Solución**: 
  1. Verifica `DATABASE_URL` en `.env.local`
  2. Reinicia el servidor (`npm run dev`)
  3. Verifica que NeonDB esté activo

### Error 2: Videos no cargan
- **Causa**: Rutas incorrectas de videos
- **Solución**:
  1. Verifica que existan en `public/videos/`
  2. Los nombres deben ser exactos (mayúsculas incluidas)

### Error 3: Diseño se ve mal
- **Causa**: Estilos CSS no cargados
- **Solución**:
  1. Limpia caché del navegador (Ctrl+Shift+Delete)
  2. Recarga la página (Ctrl+F5)

### Error 4: Burbujas no se mueven
- **Causa**: JavaScript deshabilitado o error en animaciones
- **Solución**:
  1. Abre la consola (F12 → Console)
  2. Mira si hay errores
  3. Reinicia el servidor

---

## 📊 Verificar Base de Datos

### Conectar a NeonDB
1. Ve a https://console.neon.tech
2. Selecciona tu proyecto
3. Haz clic en "SQL Editor"
4. Ejecuta:

```sql
-- Ver todas las confirmaciones
SELECT * FROM confirmaciones;

-- Ver solo nombres y apellidos
SELECT nombres, apellidos, created_at FROM confirmaciones;

-- Contar confirmaciones totales
SELECT COUNT(*) as total FROM confirmaciones;

-- Ver por puntualidad
SELECT puntualidad, COUNT(*) as cantidad FROM confirmaciones GROUP BY puntualidad;
```

---

## ✅ Checklist Final Antes de Producción

- [ ] Todos los casos de prueba pasan
- [ ] No hay errores en la consola (F12)
- [ ] Los datos se guardan en NeonDB
- [ ] La app se ve bien en móvil
- [ ] Los videos cargan correctamente
- [ ] Las validaciones funcionan
- [ ] Las animaciones son fluidas (sin lag)
- [ ] El código está subido a GitHub
- [ ] Vercel está conectado y desplegado
- [ ] Las variables de entorno en Vercel son correctas

---

## 🚀 Después de Desplegar en Vercel

1. Abre tu enlace de Vercel (ej: `https://invitacion-dianita.vercel.app`)
2. Repite todas las pruebas en producción
3. Verifica que los datos se guardan en NeonDB
4. Comparte el enlace con invitados

¡Felicidades! 🎉
