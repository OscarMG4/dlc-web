# dlc-web

Landing page de **Grupo DLC**, inmobiliaria de Chiclayo especializada en lotes de
casa de campo. El proyecto destacado es **Finca Algarrobo**.

## Stack

- [Next.js 16](https://nextjs.org) con App Router y Turbopack
- TypeScript en modo estricto
- [Tailwind CSS v4](https://tailwindcss.com) con tokens de marca en `app/globals.css`
- [Motion](https://motion.dev) para animaciones al hacer scroll
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) en el formulario
- [Web3Forms](https://web3forms.com) para el envío del formulario de contacto (gratis, sin verificar dominio)

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # completa las variables
npm run dev
```

| Script          | Descripción                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Servidor de desarrollo               |
| `npm run build` | Build de producción                  |
| `npm start`     | Sirve el build                       |
| `npm run lint`  | ESLint                               |

## Variables de entorno

| Variable                               | Obligatoria | Para qué sirve                                                                 |
| -------------------------------------- | ----------- | ------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                 | Sí          | Canónicas, sitemap y Open Graph. Sin ella `robots.txt` bloquea la indexación.  |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`     | Sí          | Envío del formulario. Key gratis en [web3forms.com](https://web3forms.com).    |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No          | Verificación de Google Search Console.                                         |

### Activar el correo (2 minutos)

1. Entra a [web3forms.com](https://web3forms.com) y crea una **Access Key**.
2. Pon como correo de recepción `Gerenciacomercial.dlc@gmail.com`.
3. Copia la key en `.env.local` → `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=tu_key_aqui`
4. Reinicia `npm run dev` y prueba el formulario.

No necesitas verificar dominio ni configurar DNS. Plan gratis: **250 envíos/mes**.

Mientras falte `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, el formulario muestra un mensaje que
invita a escribir por WhatsApp.

## Estructura

```
app/
  globals.css            Tokens de marca, keyframes y utilidades personalizadas
  layout.tsx             Metadata, fuentes, header, footer y widgets flotantes
  page.tsx               Composición de las secciones de la landing
  icon.png               Favicon (isotipo DLC)
  opengraph-image.png    Imagen de previsualización al compartir
  robots.ts, sitemap.ts  SEO técnico
components/
  forms/                 Formulario de contacto reutilizable
  layout/                Header y footer
  sections/              Hero, Sobre nosotros, Proyecto, Galería, Ubicación, Contacto
  ui/                    Primitivas: Container, Button, SectionHeading, Reveal
  widgets/               WhatsApp flotante y formulario minimizable
  icons.tsx              Iconos SVG inline
lib/
  content.ts             Todo el contenido editable: datos, proyecto, galería
  site.ts                Configuración del sitio y URL base
  schema.ts              JSON-LD (RealEstateAgent, WebSite, Residence)
  validation.ts          Esquema Zod del formulario
  utils.ts               Helper `cn`
public/
  brand/                 Logos de Grupo DLC y Finca Algarrobo
  projects/algarrobo/    Renders del proyecto
```

## Dónde editar el contenido

Casi todo el texto vive en `lib/content.ts`: datos de contacto, redes, estadísticas,
descripción del proyecto, áreas comunes y galería. Al agregar una imagen basta con
copiarla a `public/projects/algarrobo/` y sumarla al arreglo `gallery` con su `alt`
y su `caption`.

## Calidad de imágenes

Los renders actuales en `public/projects/algarrobo/` miden **1024×576 px**. En pantallas
grandes o Retina se ven suaves porque el navegador las estira.

| Uso | Tamaño mínimo recomendado | Archivos |
| --- | ------------------------- | -------- |
| Hero, portada del proyecto, CTA | **1920×1080** (ideal 2560×1440) | `hito-ingreso.jpg`, `vista-aerea.jpg`, `parque-aereo.jpg` |
| Galería y áreas comunes | **1600×900** | resto de `.jpg` en la carpeta |
| Miniaturas del carrusel | **600×400** | mismos archivos (Next genera el tamaño pequeño) |

**Qué hacer:** exporta de nuevo desde el render o el archivo fuente a mayor resolución,
mantén el mismo nombre de archivo y reemplaza en `public/projects/algarrobo/`. No hace
falta tocar código si conservas los nombres.

Formato: JPEG calidad 85–90 o WebP/AVIF de alta calidad. El sitio ya sirve AVIF/WebP
automáticamente y comprime con calidad 88–92 según el tamaño en pantalla.

## Pendientes

- Video del proyecto: hay un bloque reservado en la sección de galería.
- Confirmar la dirección exacta para el mapa (hoy se geocodifica el texto de
  `company.addressFull`).
