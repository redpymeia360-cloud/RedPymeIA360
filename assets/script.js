
const DEFAULT_CONFIG = {
  whatsappNumero: "56921733645",
  whatsappTexto: "Hola RedPyme IA 360, quiero información de sus planes, servicios y agendar una visita.",
  correoDestino: "redpymeia360@gmail.com",
  emergentChatbotUrl: "https://PEGA-AQUI-TU-ENLACE-DE-CHATBOT-EMERGENT",
  makeWebhookUrl: ""
};
const CONFIG = Object.assign({}, DEFAULT_CONFIG, window.REDPYME_CONFIG || {});

const answers = {
  servicios: `Entregamos soluciones de IA para emprendedores, pymes, coworks e inmobiliarias:\n\n1. Chatbots para Instagram, Facebook, WhatsApp y sitio web.\n2. CRM inmobiliario con IA.\n3. Diseño de logos, flyers y piezas gráficas.\n4. Videos comerciales con IA.\n5. Estrategia comercial y Meta Ads IA.\n6. Automatizaciones con Make, Gmail y Google Sheets.\n7. Software de ventas, software contable y CRM.\n8. Realidad virtual / tour 360.\n9. Plotter, diseño gráfico y soporte TI.\n10. Ciberseguridad básica.`,
  planes: `Planes accesibles:\n\nPlan Básico Inicio: $39.000/mes.\nPlan Emprendedor IA: $49.000/mes.\nPlan Chatbot Comercial: $79.000/mes.\nPlan Pyme 360: $99.000/mes.\nPlan Inmobiliario IA: desde $149.000/mes.\n\nServicios rápidos: flyer desde $25.000, video desde $60.000, logo desde $80.000, campaña Meta Ads desde $100.000.`,
  basico: `El Plan Básico Inicio es ideal para persona natural o emprendedor que está comenzando. Incluye asesoría inicial, mini flyer, link a WhatsApp, revisión de perfil digital y recomendaciones para captar clientes.`,
  chatbot: `El chatbot permite responder preguntas frecuentes, pedir datos del cliente, mostrar planes, agendar visita online/presencial y derivar al WhatsApp. Para redes sociales reales se configura con herramientas externas como Make, UChat o WhatsApp Business.`,
  crm: `El CRM Inmobiliario IA permite registrar clientes, propiedades, visitas, estados comerciales, seguimiento, dashboard y automatizaciones. Es ideal para agentes Remax, corredores, inmobiliarias y administradores.`,
  cowork: `Para cowork ofrecemos servicios adicionales para empresas residentes: diseño, flyers, videos, landing page, chatbots, CRM, automatizaciones, plotter, marketing digital y ciberseguridad básica.`,
  agenda: `Puedes agendar una visita online por Google Meet o presencial. Completa el formulario con nombre, apellido, WhatsApp, tipo de cliente, plan, fecha y hora tentativa.`,
};

function $(id){ return document.getElementById(id); }

document.addEventListener('DOMContentLoaded', () => {
  const nav = $('navlinks');
  $('menu')?.addEventListener('click', () => nav.classList.toggle('open'));
  $('year').textContent = new Date().getFullYear();

  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(CONFIG.whatsappTexto)}`;
  });

  const assistantFloat = document.getElementById('assistantFloat');
  assistantFloat?.addEventListener('click', (e) => {
    const url = CONFIG.emergentChatbotUrl || "";
    if(!url || url.includes("PEGA-AQUI")) {
      e.preventDefault();
      alert("Aquí debes pegar el enlace real del chatbot que crearás en Emergent. Edita assets/config.js y cambia emergentChatbotUrl.");
      window.open(`https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent("Hola RedPyme IA 360, quiero chatear con el asistente virtual.")}`, "_blank");
      return;
    }
    assistantFloat.href = url;
  });


  document.querySelectorAll('[data-question]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.question;
      $('assistantAnswer').innerText = answers[key] || answers.servicios;
      if(key === 'agenda') document.querySelector('#contacto').scrollIntoView({behavior:'smooth'});
    });
  });

  const form = $('leadForm');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const correoInput = document.getElementById('emailCliente');
    const correoAlias = document.getElementById('correoAlias');
    if (correoInput && correoAlias) correoAlias.value = correoInput.value;

    const data = Object.fromEntries(new FormData(form).entries());
    data.correo = data.correo || data.email || '';
    data.fechaRegistro = new Date().toISOString();
    data.origen = "Web RedPyme IA 360 - Netlify";

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    $('formMsg').innerText = "Enviando solicitud...";

    try {
      await sendToNetlifyForms(data);
      await sendToMakeIfConfigured(data);

      const msg = buildWhatsappMsg(data);
      $('formMsg').innerText = "Solicitud enviada correctamente. Te contactaremos a la brevedad. Ahora puedes abrir WhatsApp con tu mensaje preparado.";
      setTimeout(() => {
        window.open(`https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(msg)}`, "_blank");
      }, 700);
      form.reset();
    } catch (error) {
      console.error(error);
      $('formMsg').innerText = "No se pudo enviar el formulario. Revisa que Netlify Forms esté activado o escríbenos por WhatsApp.";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
});

function buildWhatsappMsg(data){
  return `Hola RedPyme IA 360, envié una solicitud desde la web.\n\nNombre: ${data.nombre || ''} ${data.apellido || ''}\nWhatsApp: ${data.whatsapp || ''}\nCorreo: ${data.correo || data.email || ''}\nTipo cliente: ${data.tipoCliente || ''}\nPlan/servicio: ${data.plan || ''}\nModalidad: ${data.modalidad || ''}\nDía: ${data.dia || ''}\nFecha: ${data.fecha || ''}\nHora: ${data.hora || ''}\nMensaje: ${data.mensaje || ''}`;
}

async function sendToNetlifyForms(data){
  const body = new URLSearchParams({'form-name':'contacto-redpymeia360', ...data});
  const response = await fetch('/', {
    method:'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: body.toString()
  });
  if (!response.ok) {
    throw new Error(`Netlify Forms respondió con estado ${response.status}`);
  }
  return true;
}

async function sendToMakeIfConfigured(data){
  if(!CONFIG.makeWebhookUrl) return;
  try {
    await fetch(CONFIG.makeWebhookUrl, {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
  } catch(e) {
    console.warn("Error enviando a Make.", e);
  }
}
