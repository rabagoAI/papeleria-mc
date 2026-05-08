# M.C. Papelería — Web oficial

Web de M.C. Papelería, papelería de barrio en Cobeja (Toledo) y punto oficial de Lotería y Apuestas del Estado.

**Stack:** React + Vite + TypeScript + Tailwind CSS + React Router DOM  
**Deploy:** Vercel  
**Base de datos:** Google Sheets via Google Apps Script

---

## 1. Instalación y arranque local

```bash
# Clona el repositorio
git clone <url-del-repo>
cd papeleria-mc

# Instala dependencias
npm install

# Copia el archivo de entorno
cp .env.example .env

# Edita .env y añade la URL del Apps Script (ver paso 3)
# VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec

# Arranca el servidor de desarrollo
npm run dev
```

---

## 2. Código completo del Apps Script

Ve a [script.google.com](https://script.google.com) o desde la hoja de cálculo: **Extensiones > Apps Script**.

Pega este código completo:

```javascript
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents);

  if (data.tipo === 'reserva') {
    const sheet = ss.getSheetByName('Reservas') || ss.getActiveSheet();
    sheet.appendRow([
      new Date(),
      data.nombre_alumno,
      data.nombre_tutor,
      data.telefono,
      data.centro_educativo,
      data.curso,
      data.materiales,
      data.fecha_recogida,
      data.observaciones || '',
      'Pendiente'
    ]);
  }

  if (data.tipo === 'contacto') {
    let sheet = ss.getSheetByName('Contactos');
    if (!sheet) {
      sheet = ss.insertSheet('Contactos');
      sheet.appendRow(['Fecha', 'Nombre', 'Teléfono', 'Mensaje']);
    }
    sheet.appendRow([
      new Date(),
      data.nombre,
      data.telefono,
      data.mensaje
    ]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 3. Configurar Google Sheets paso a paso

### 3.1 Crear la hoja de cálculo

1. Ve a [sheets.google.com](https://sheets.google.com) e inicia sesión con la cuenta de Gmail que usarás para gestionar las reservas.
2. Crea una nueva hoja: **"+ En blanco"**.
3. Renombra la hoja como **"Reservas M.C. Papelería"** (clic en el título arriba).
4. Renombra la pestaña inferior (Sheet1) como **"Reservas"**.
5. En la fila 1, añade estas cabeceras en las celdas A1 a J1:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Fecha | Alumno | Tutor | Teléfono | Centro | Curso | Materiales | Fecha Recogida | Observaciones | Estado |

### 3.2 Añadir el Apps Script

1. En la hoja de cálculo, ve a **Extensiones > Apps Script**.
2. Borra todo el código que haya por defecto.
3. Pega el código del apartado anterior completo.
4. Guarda con **Ctrl+S** (o el icono de disquete). Ponle un nombre al proyecto, p.ej. *"Reservas MC Papelería"*.

### 3.3 Desplegar como aplicación web

1. Haz clic en **Implementar > Nueva implementación**.
2. Haz clic en el engranaje ⚙️ junto a "Tipo" y selecciona **Aplicación web**.
3. Configura:
   - **Descripción:** Reservas MC Papelería
   - **Ejecutar como:** Yo (tu cuenta de Google)
   - **Quién puede acceder:** Cualquiera
4. Haz clic en **Implementar**.
5. Google pedirá que autorices los permisos — acepta.
6. **Copia la URL** que aparece (empieza por `https://script.google.com/macros/s/.../exec`).

### 3.4 Añadir la URL al proyecto

Edita el archivo `.env` y añade:

```
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_ID_AQUI/exec
```

> **Nota:** Cada vez que modifiques el código del Apps Script, debes crear una **nueva implementación** (no actualizar la existente) para que los cambios surtan efecto.

---

## 4. Deploy en Vercel

### 4.1 Primera vez

```bash
# Instala Vercel CLI (opcional)
npm i -g vercel

# O simplemente sube el repositorio a GitHub y conecta en vercel.com
```

1. Ve a [vercel.com](https://vercel.com) e inicia sesión.
2. Haz clic en **Add New > Project**.
3. Importa tu repositorio de GitHub.
4. Vercel detectará automáticamente que es un proyecto Vite.
5. Antes de hacer deploy, añade la variable de entorno (ver 4.2).
6. Haz clic en **Deploy**.

### 4.2 Variables de entorno en Vercel

1. En tu proyecto de Vercel, ve a **Settings > Environment Variables**.
2. Añade:
   - **Name:** `VITE_APPS_SCRIPT_URL`
   - **Value:** `https://script.google.com/macros/s/TU_ID_AQUI/exec`
   - **Environment:** Production, Preview, Development (marca los tres)
3. Haz clic en **Save**.
4. Redespliega el proyecto: **Deployments > Redeploy**.

### 4.3 Dominio personalizado (opcional)

En **Settings > Domains** puedes añadir tu propio dominio.

---

## 5. Estructura del proyecto

```
src/
  components/
    Header.tsx          # Navegación sticky con menú hamburguesa
    Footer.tsx          # Pie de página con horario y contacto
    WhatsAppButton.tsx  # Botón flotante de WhatsApp
    Card.tsx            # Componente card reutilizable
    Button.tsx          # Botón con variantes
  pages/
    Home.tsx            # Página principal
    Papeleria.tsx       # Productos y servicios
    Reservas.tsx        # Formulario de reserva de material escolar
    Loteria.tsx         # Juegos y countdown Navidad
    Contacto.tsx        # Contacto, horario y mapa
  services/
    reservas.ts         # Fetch al Apps Script
  types/
    index.ts            # Interfaces TypeScript
```

---

## 6. Actualizar el Apps Script tras cambios

Si necesitas añadir más campos o modificar el comportamiento:

1. Edita el código en Apps Script.
2. **Implementar > Nueva implementación** (no actualizar).
3. Copia la nueva URL y actualiza `VITE_APPS_SCRIPT_URL` en Vercel.
4. Redespliega.
