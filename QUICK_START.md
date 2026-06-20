# ⚡ Quick Start - Invitación Dianita

## 30 Segundos para Empezar

### 1️⃣ Instalar dependencias
```bash
npm install
```

### 2️⃣ Configurar Base de Datos
1. Ve a https://console.neon.tech
2. Crea un proyecto nuevo
3. Copia tu `DATABASE_URL` 
4. Abre `.env.local` y pega:
```env
DATABASE_URL=postgresql://... (tu connection string)
```

### 3️⃣ Ejecutar localmente
```bash
npm run dev
```
Abre http://localhost:3000

---

## 📱 Estructura de la App

```
Portada (Bienvenida)
    ↓
Video 1 (Invitación)
    ↓
Formulario 1 (Datos de confirmación)
    ↓
Video 2 (Agradecimiento)
    ↓
Formulario 2 (¿Llegarás puntual?)
```

---

## 📁 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `app/page.tsx` | Componente principal (toda la lógica) |
| `app/page.module.css` | Estilos específicos |
| `app/globals.css` | Estilos globales + animaciones |
| `lib/db.ts` | Conexión a base de datos |
| `app/api/rsvp/*` | Rutas API para guardar datos |
| `public/videos/*` | Videos de Dianita |

---

## 🎨 Colores Temática Sirenita

```css
--purple-main: #c9a3d9    /* Púrpura */
--pink-main: #f5a8d8      /* Rosa */
--blue-main: #4db8e8      /* Azul */
--green-accent: #7fd8be   /* Verde */
```

---

## 🚀 Deploy a Vercel en 3 Pasos

### 1. Subir a GitHub
```bash
git remote add origin https://github.com/TU_USUARIO/invitacion_dianita.git
git push -u origin main
```

### 2. Conectar en Vercel
- Ve a https://vercel.com/new
- Selecciona tu repositorio
- Vercel detectará que es Next.js

### 3. Agregar Variable de Entorno
- En Vercel: Project Settings → Environment Variables
- Agrega: `DATABASE_URL` = tu connection string
- Deploy

---

## 🔧 Personalizaciones Rápidas

### Cambiar el título
En `app/page.tsx`, línea ~150:
```tsx
<h1>¡Cumpleaños Dianita!</h1>  // ← Cambia aquí
```

### Cambiar color principal
En `app/globals.css`, línea ~8:
```css
--purple-main: #c9a3d9;  // ← Cambia este valor
```

### Cambiar textos de botones
En `app/page.tsx`, busca "Enviar" o "Confirmar Asistencia"

### Agregar más opciones de niños
En `app/page.tsx`, busca `['0', '1', '2', '3']` y agrega más números

---

## 🐛 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| Base de datos no conecta | Verifica `DATABASE_URL` en `.env.local` |
| Videos no cargan | Asegúrate que estén en `public/videos/` |
| Formulario no valida | Nombres y apellidos son obligatorios |
| Estilo roto | Haz `npm run dev` nuevamente |

---

## 📊 Ver Confirmaciones

En NeonDB SQL Editor:
```sql
SELECT * FROM confirmaciones;
```

---

## 📚 Documentación Completa

- `SETUP_ES.md` - Guía detallada paso a paso
- `TESTING.md` - Casos de prueba
- `README.md` - Información técnica completa

---

¡Listo! 🎉 La app está lista para usar. Modifica, personaliza y ¡disfruta!
