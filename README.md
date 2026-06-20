# 🧜‍♀️ Invitación Interactiva - Cumpleaños Dianita

Una aplicación web interactiva y móvil para la invitación del cumpleaños de Dianita con temática de La Sirenita de Disney.

## ✨ Características

- **Diseño 100% Mobile**: Optimizado para dispositivos móviles
- **Tema La Sirenita**: Colores vibrantes (púrpura, rosa, azul y verde)
- **Animaciones**: Burbujas flotantes que se mueven constantemente
- **Videos Interactivos**: Integración de videos personalizados
- **Formularios Dinámicos**: 
  - Confirmación de asistencia
  - Selección de cantidad de niños (0-3)
  - Opción de acompañante
  - Pregunta sobre puntualidad
- **Almacenamiento de Datos**: Base de datos PostgreSQL (NeonDB)
- **Despliegue en Vercel**: Listo para producción

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, CSS3
- **Backend**: Next.js API Routes
- **Base de Datos**: PostgreSQL (NeonDB)
- **Hosting**: Vercel
- **Lenguaje**: TypeScript

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta en Vercel
- Cuenta en NeonDB

## 🚀 Configuración Local

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd invitacion_dianita
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# NeonDB Connection String
DATABASE_URL=postgresql://user:password@ep-xxxxx.neon.tech/dbname
```

Para obtener la conexión de NeonDB:
1. Ve a https://console.neon.tech
2. Crea una nueva base de datos
3. Copia la connection string
4. Reemplázala en `.env.local`

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Despliegue en Vercel

### 1. Subir a GitHub
```bash
git remote add origin <tu-repositorio>
git push -u origin main
```

### 2. Conectar en Vercel
1. Ve a https://vercel.com
2. Haz clic en "New Project"
3. Selecciona tu repositorio
4. Vercel detectará que es un proyecto Next.js

### 3. Configurar Variables de Entorno
En Vercel:
1. Ve a Project Settings → Environment Variables
2. Agrega `DATABASE_URL` con tu connection string de NeonDB
3. Deploy

## 📱 Flujo de la Aplicación

1. **Portada**: Pantalla de bienvenida con estilo de invitación
2. **Video 1**: Dianita invita a los asistentes
3. **Formulario 1**: 
   - Nombres y apellidos
   - Nombre de acompañante (opcional)
   - Cantidad de niños (0-3)
4. **Video 2**: Video de agradecimiento
5. **Formulario 2**: Pregunta sobre puntualidad

## 📊 Base de Datos

### Tabla: confirmaciones

```sql
CREATE TABLE confirmaciones (
  id SERIAL PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  acompanante VARCHAR(100),
  ninos_asisten INT NOT NULL,
  puntualidad VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## 🎨 Personalización de Estilos

Los colores principales están definidos en `app/globals.css`:

```css
--purple-main: #c9a3d9;
--purple-dark: #9370a8;
--pink-light: #f5d5e8;
--pink-main: #f5a8d8;
--blue-light: #87ceeb;
--blue-main: #4db8e8;
--green-accent: #7fd8be;
```

## 🔄 Flujo de Datos

1. Usuario llena formulario 1
2. Datos se guardan en NeonDB
3. Se retorna el `id` de la confirmación
4. Se muestra video 2
5. Usuario responde pregunta de puntualidad
6. Datos se actualizan en BD

## 🐛 Troubleshooting

### Error de conexión a BD
- Verifica que `DATABASE_URL` sea correcto
- Asegúrate que NeonDB está activo
- Revisa que la red permita conexiones a NeonDB

### Videos no cargan
- Verifica que los archivos están en `public/videos/`
- Los nombres deben ser exactos:
  - `Dianita_Invitación_cumple5.mp4`
  - `Dianita_Gracias_cumple5.mp4`

### Formulario no valida
- Los campos "Nombres" y "Apellidos" son obligatorios
- "Cantidad de niños" es obligatorio (default: 0)
- "Acompañante" es opcional

## 📝 Notas Futuras

El proyecto está preparado para agregar:
- Formulario 3: Pedir saludos por audio de Dianita
- Panel de administrador para ver confirmaciones
- Envío de confirmación por correo
- Galería de fotos de la fiesta

## 📧 Soporte

Para preguntas o problemas, contacta al desarrollador.

---

Hecho con ❤️ para el cumpleaños de Dianita
