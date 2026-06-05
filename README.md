# RedPyme IA 360 - Web para GitHub y Netlify

Sitio web estático listo para publicar gratis en Netlify.

## Contacto configurado

- WhatsApp: +56 9 2173 3645
- Correo: redpymeia360@gmail.com

## Qué incluye

- Home llamativa y responsive
- SEO básico para Google
- Open Graph para redes sociales
- Servicios, planes y catálogo de precios
- QR de WhatsApp
- Brochure PDF descargable
- Formulario compatible con Netlify Forms
- Preguntas rápidas para mostrar servicios y valores
- Agenda tentativa online por Google Meet o presencial

## Subir a GitHub

Nombre recomendado del repositorio:

`redpyme-ia-360`

Sube todos los archivos del proyecto.

## Publicar en Netlify

- Build command: dejar vacío
- Publish directory: `.`
- Deploy site

## Activar correo de Netlify Forms

En Netlify:

1. Site overview
2. Forms
3. Form notifications
4. Add notification
5. Email notification
6. Correo: redpymeia360@gmail.com

## Conectar con Google Sheets opcional usando Make

Crea un escenario:

Webhook -> Google Sheets -> Gmail -> Webhook Response

Luego en `assets/script.js` pega el webhook en:

`makeWebhookUrl: ""`

## Archivos principales

- index.html
- assets/styles.css
- assets/script.js
- assets/brochure-redpyme-ia-360.pdf
- assets/qr-whatsapp-redpymeia360.png


## Icono flotante de asistente

La web trae un botón flotante:

`¿Necesitas chatear con nuestro asistente?`

Para conectarlo con Emergent, edita:

`assets/config.js`

Y cambia:

`emergentChatbotUrl`

por el enlace real del chatbot que crearás en Emergent.

## Campos de agenda

El formulario pide:

- Nombre
- Apellido
- WhatsApp
- Correo
- Tipo de cliente
- Plan o servicio
- Modalidad
- Día
- Fecha
- Hora
- Mensaje

Netlify Forms guardará esos datos.


## Brochure enlazado

El brochure PDF subido por el usuario fue reemplazado en:

`assets/brochure-redpyme-ia-360.pdf`

La web lo muestra en la sección:

`#brochure`

y tiene botones para:

- Descargar brochure PDF
- Ver brochure online

Texto agregado:

`RedPyme IA 360 - Conecta - Automatiza - Vende`


## Corrección de formulario Netlify Forms

Formulario principal:
`contacto-redpymeia360`

Pasos obligatorios en Netlify:

1. Publicar el sitio.
2. Ir a Forms.
3. Activar Form detection si Netlify no detecta el formulario.
4. Hacer Redeploy.
5. En Forms > contacto-redpymeia360 > Form notifications, agregar Email notification.
6. Correo destino: redpymeia360@gmail.com

Cambios aplicados:

- Se eliminó el formulario oculto duplicado.
- El formulario visible tiene `data-netlify="true"`, `netlify`, `method="POST"` y `action="/gracias.html"`.
- Se agregó campo `email` para que Netlify pueda usar Reply-to en notificaciones.
- Se mantiene campo `correo` oculto para compatibilidad con Make/Google Sheets.
- El JavaScript ahora verifica si Netlify respondió correctamente antes de mostrar éxito.
