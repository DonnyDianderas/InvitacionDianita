# 🎉 Guía de Configuración - Invitación Dianita

¡Bienvenido! Esta guía te ayudará a configurar la aplicación web para el cumpleaños de Dianita paso a paso.

## ✅ Paso 1: Preparar el Entorno Local

### 1.1 Instalar Node.js
1. Descarga Node.js desde https://nodejs.org/ (versión 18 o superior)
2. Instálalo siguiendo las instrucciones
3. Verifica en la terminal/PowerShell:
   ```bash
   node --version
   npm --version
   ```

### 1.2 Instalar dependencias del proyecto
En la carpeta `C:\Users\LENOVO\Desktop\DonnyDev\invitacion_dianita`, abre PowerShell y ejecuta:

```bash
npm install
```

Esto descargará todos los paquetes necesarios (Next.js, React, etc).

---

## 🗄️ Paso 2: Configurar NeonDB

### 2.1 Crear cuenta en NeonDB
1. Ve a https://console.neon.tech
2. Haz clic en "Sign up" y registrate (puedes usar tu email de Google)
3. Confirma tu email

### 2.2 Crear un proyecto
1. Una vez dentro, haz clic en "New Project"
2. Dale un nombre: `invitacion_dianita`
3. Selecciona la región más cercana a ti
4. Haz clic en "Create project"

### 2.3 Obtener la Connection String
1. En tu proyecto NeonDB, verás una pantalla con la conexión
2. Haz clic en "Connection string"
3. Copia la cadena que comienza con `postgresql://`
4. Debe verse algo como: `postgresql://user:password@ep-xxxxx.neon.tech/dbname`

### 2.4 Guardar en .env.local
1. Abre el archivo `.env.local` en la carpeta del proyecto
2. Reemplaza la línea `DATABASE_URL` con tu connection string
3. Guarda el archivo

**Ejemplo:**
```env
DATABASE_URL=postgresql://neondb_owner:xxxxxxxxxxxx@ep-abc123.neon.tech/neondb
```

---

## 🚀 Paso 3: Ejecutar Localmente

1. En PowerShell, asegúrate de estar en `C:\Users\LENOVO\Desktop\DonnyDev\invitacion_dianita`
2. Ejecuta:
   ```bash
   npm run dev
   ```
3. Deberías ver algo como:
   ```
   ▲ Next.js 14.0.0
   - ready started server on 0.0.0.0:3000, url: http://localhost:3000
   ```
4. Abre tu navegador en http://localhost:3000
5. ¡Verás la aplicación en funcionamiento!

---

## 📱 Paso 4: Probar la Aplicación

Prueba cada sección:

1. **Portada**: Haz clic en "¡Entrar!"
2. **Video 1**: Mira el video y haz clic en "Confirmar Asistencia"
3. **Formulario 1**: 
   - Llena tu nombre y apellido
   - Opcionalmente, agrega un acompañante
   - Selecciona cuántos niños asisten (0-3)
   - Haz clic en "Enviar"
4. **Video 2**: Mira el segundo video
5. **Formulario 2**: Selecciona si llegarás puntual

---

## 🌐 Paso 5: Desplegar en Vercel

### 5.1 Crear cuenta en Vercel
1. Ve a https://vercel.com
2. Haz clic en "Sign up"
3. Elige "Continue with GitHub" (o crea una cuenta)
4. Autoriza Vercel

### 5.2 Conectar tu repositorio
1. Si aún no tienes Git configurado en tu PC:
   ```bash
   git config --global user.name "Tu Nombre"
   git config --global user.email "tu@email.com"
   ```

2. En la carpeta del proyecto, inicializa Git:
   ```bash
   git init
   git add .
   git commit -m "Inicial: Invitación Dianita"
   ```

3. Ve a GitHub.com, crea un nuevo repositorio llamado `invitacion_dianita`

4. Sube tu código:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/invitacion_dianita.git
   git push -u origin main
   ```

### 5.3 Desplegar en Vercel
1. Ve a https://vercel.com/new
2. Haz clic en "Import Project"
3. Selecciona "GitHub" y autoriza
4. Busca tu repositorio `invitacion_dianita` y selecciónalo
5. En la sección "Environment Variables", agrega:
   - **Name**: `DATABASE_URL`
   - **Value**: Tu connection string de NeonDB (ej: `postgresql://...`)
6. Haz clic en "Deploy"
7. ¡Espera a que termine! (unos 5-10 minutos)
8. Verdrás un enlace como: `https://invitacion-dianita.vercel.app`

---

## 🎨 Personalización

### Cambiar colores
Edita `app/globals.css` y modifica las variables CSS:
```css
:root {
  --purple-main: #c9a3d9;     /* Color púrpura principal */
  --pink-main: #f5a8d8;       /* Color rosa principal */
  --blue-main: #4db8e8;       /* Color azul principal */
  --green-accent: #7fd8be;    /* Color verde */
}
```

### Cambiar textos
Edita `app/page.tsx` y busca textos como:
- `"¡Cumpleaños Dianita!"` - Título
- `"Confirma tu Asistencia"` - Encabezado del formulario
- `"¿Quieres Ganar tu Premio?"` - Pregunta de puntualidad

### Cambiar videos
Reemplaza los archivos en `public/videos/`:
- `Dianita_Invitación_cumple5.mp4`
- `Dianita_Gracias_cumple5.mp4`

---

## 📊 Ver Confirmaciones

Las confirmaciones se guardan en NeonDB. Para verlas:

1. Ve a tu proyecto en https://console.neon.tech
2. Haz clic en "SQL Editor"
3. Ejecuta esta consulta:
   ```sql
   SELECT * FROM confirmaciones;
   ```

---

## 🆘 Problemas Comunes

### "Error: ECONNREFUSED" en local
- **Solución**: Asegúrate que DATABASE_URL en `.env.local` es correcto
- Reinicia el servidor (`npm run dev`)

### Vercel muestra error después de deploy
- **Solución**: Ve a Vercel → Project Settings → Environment Variables
- Verifica que `DATABASE_URL` está bien escrito

### Videos no aparecen
- **Solución**: Verifica que los nombres de los archivos en `public/videos/` sean exactos
- Los nombres tienen mayúsculas, asegúrate de escribirlos correctamente

### Formulario no envía datos
- **Solución**: Abre la consola del navegador (F12) y mira los errores
- Verifica que la base de datos está conectada

---

## 🎯 Próximos Pasos Opcionales

Cuando quieras expandir la app:

1. **Agregar formulario de audios**: Edita `page.tsx` y agrega una nueva stage `'form3'`
2. **Panel de administrador**: Crea una ruta `/admin` para ver confirmaciones
3. **Envío de emails**: Usa un servicio como SendGrid o Resend
4. **Galería de fotos**: Crea una sección para fotos de la fiesta

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:
1. Revisa el archivo `README.md`
2. Abre la consola de desarrollador (F12 en Chrome)
3. Revisa los logs en Vercel (Project → Deployments → View Build Logs)

¡Esperamos que disfrutes de la aplicación! 🎉🧜‍♀️
