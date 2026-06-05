# Cómo conectar el icono flotante con tu chatbot de Emergent

La web incluye un icono flotante con el texto:

"¿Necesitas chatear con nuestro asistente?"

Para conectarlo a tu chatbot real:

1. Crea el chatbot en Emergent.
2. Publica o copia el enlace público del chatbot.
3. Abre el archivo:

`assets/config.js`

4. Busca esta línea:

```js
emergentChatbotUrl: "https://PEGA-AQUI-TU-ENLACE-DE-CHATBOT-EMERGENT",
```

5. Reemplaza el enlace por el enlace real.

Ejemplo:

```js
emergentChatbotUrl: "https://tu-chatbot-emergent.netlify.app",
```

6. Sube los cambios a GitHub.
7. Netlify hará el redeploy automático.

Datos de contacto configurados:

- WhatsApp: +56 9 2173 3645
- Correo: redpymeia360@gmail.com
