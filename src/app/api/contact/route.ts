import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@blackink.studio';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

const i18n: Record<string, any> = {
  es: {
    studioEmailTitle: 'Nueva Solicitud de Cita',
    clientDetails: 'Datos del Cliente',
    tattooDetails: 'Detalles del Tatuaje',
    description: 'Descripción',
    noDescription: 'No se proporcionó descripción.',
    name: 'Nombre',
    phone: 'Teléfono',
    email: 'Correo',
    style: 'Estilo',
    color: 'Color',
    placement: 'Ubicación',
    size: 'Tamaño',
    artist: 'Artista',
    schedule: 'Preferencia de Agenda',
    footerNotification: 'Black Ink Tattoo Studio — Notificación Automática',
    subjectLine: (name: string, style: string) => `Nueva Solicitud de ${name} — ${style}`,
    clientSubject: 'Confirmación de Solicitud — Black Ink Studio',
    clientTitle: 'Solicitud Recibida',
    clientGreeting: (name: string) => `Hola ${name},`,
    clientBody: 'Hemos recibido tu solicitud. Nuestro equipo revisará los detalles y te contactará a la brevedad.',
    clientQuestions: 'Si tienes alguna pregunta, responde a este correo o contáctanos directamente.',
    footerStudio: 'Black Ink Tattoo Studio',
    sizeLabel: { small: 'Pequeño', medium: 'Mediano', large: 'Grande' },
    colorLabel: { black: 'Negro / Sombras', color: 'A Color' },
    artistLabel: { any: 'Primero Disponible' },
  },
  en: {
    studioEmailTitle: 'New Booking Request',
    clientDetails: 'Client Details',
    tattooDetails: 'Tattoo Details',
    description: 'Description',
    noDescription: 'No description provided.',
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    style: 'Style',
    color: 'Color',
    placement: 'Placement',
    size: 'Size',
    artist: 'Artist',
    schedule: 'Schedule Preference',
    footerNotification: 'Black Ink Tattoo Studio — Automated Notification',
    subjectLine: (name: string, style: string) => `New Booking Request from ${name} — ${style}`,
    clientSubject: 'Booking Confirmation — Black Ink Studio',
    clientTitle: 'Booking Received',
    clientGreeting: (name: string) => `Hi ${name},`,
    clientBody: 'We have received your booking request. Our team will review your details and contact you shortly.',
    clientQuestions: 'If you have any questions, feel free to reply to this email or contact us directly.',
    footerStudio: 'Black Ink Tattoo Studio',
    sizeLabel: { small: 'Small', medium: 'Medium', large: 'Large' },
    colorLabel: { black: 'Black / Shading', color: 'Full Color' },
    artistLabel: { any: 'First Available' },
  },
  pt: {
    studioEmailTitle: 'Nova Solicitação de Agendamento',
    clientDetails: 'Dados do Cliente',
    tattooDetails: 'Detalhes da Tatuagem',
    description: 'Descrição',
    noDescription: 'Nenhuma descrição fornecida.',
    name: 'Nome',
    phone: 'Telefone',
    email: 'E-mail',
    style: 'Estilo',
    color: 'Cor',
    placement: 'Local',
    size: 'Tamanho',
    artist: 'Artista',
    schedule: 'Preferência de Agenda',
    footerNotification: 'Black Ink Tattoo Studio — Notificação Automática',
    subjectLine: (name: string, style: string) => `Nova Solicitação de ${name} — ${style}`,
    clientSubject: 'Confirmação de Solicitação — Black Ink Studio',
    clientTitle: 'Solicitação Recebida',
    clientGreeting: (name: string) => `Olá ${name},`,
    clientBody: 'Recebemos sua solicitação. Nossa equipe revisará os detalhes e entrará em contato em breve.',
    clientQuestions: 'Se tiver alguma dúvida, sinta-se à vontade para responder a este e-mail ou entrar em contato diretamente.',
    footerStudio: 'Black Ink Tattoo Studio',
    sizeLabel: { small: 'Pequeno', medium: 'Médio', large: 'Grande' },
    colorLabel: { black: 'Preto / Sombreado', color: 'Colorido' },
    artistLabel: { any: 'Primeiro Disponível' },
  },
};

function buildHeaderHtml() {
  return `
    <div style="background: #09090b; padding: 28px 24px; text-align: center; border-bottom: 3px solid #dc2626;">
      <table role="presentation" style="margin: 0 auto; border-collapse: collapse;">
        <tr>
          <td style="font-family: Arial, sans-serif; font-size: 22px; font-weight: 900; letter-spacing: 2px; color: #ffffff;">BLACK</td>
          <td style="font-family: Arial, sans-serif; font-size: 22px; font-weight: 900; letter-spacing: 2px; color: #dc2626; background: #ffffff; padding: 2px 6px; border-radius: 3px; margin-left: 2px;">INK</td>
        </tr>
      </table>
      <p style="margin: 8px 0 0; color: #a1a1aa; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-family: Arial, sans-serif;">Tattoo Studio</p>
    </div>
  `;
}

function buildFooterHtml(footerText: string) {
  return `
    <div style="background: #09090b; padding: 20px; text-align: center; border-top: 1px solid #27272a;">
      <p style="margin: 0; color: #a1a1aa; font-size: 11px; font-family: Arial, sans-serif; letter-spacing: 1px;">${footerText}</p>
    </div>
  `;
}

function buildRow(label: string, value: string) {
  return `<tr><td style="padding: 10px 0; border-bottom: 1px solid #27272a; width: 140px; color: #a1a1aa; font-family: Arial, sans-serif; font-size: 13px;">${label}</td><td style="padding: 10px 0; border-bottom: 1px solid #27272a; font-weight: 700; color: #ffffff; font-family: Arial, sans-serif; font-size: 13px;">${value}</td></tr>`;
}

function buildSectionTitle(title: string) {
  return `<h2 style="color: #dc2626; font-size: 14px; margin: 24px 0 12px; text-transform: uppercase; letter-spacing: 2px; font-family: Arial, sans-serif; font-weight: 700;">${title}</h2>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      tattooStyle,
      colorType,
      placement,
      size,
      description,
      artist,
      schedulePreference,
      locale,
    } = body;

    if (!name || !phone || !tattooStyle || !colorType || !placement || !size || !artist) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const lang = (locale === 'es' || locale === 'pt') ? locale : 'en';
    const tr = i18n[lang];

    const sizeLabelValue = tr.sizeLabel[size] || size;
    const colorLabelValue = tr.colorLabel[colorType] || (colorType === 'black' ? 'Black / Shading' : 'Full Color');
    const artistLabelValue = artist === 'any' ? tr.artistLabel.any : artist;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #e4e4e7; background: #18181b; border-radius: 8px; overflow: hidden; border: 1px solid #27272a;">
        ${buildHeaderHtml()}
        <div style="padding: 28px;">
          ${buildSectionTitle(tr.studioEmailTitle)}
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
            ${buildRow(tr.name, name)}
            ${buildRow(tr.phone, phone)}
            ${email ? buildRow(tr.email, email) : ''}
          </table>

          ${buildSectionTitle(tr.tattooDetails)}
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
            ${buildRow(tr.style, tattooStyle)}
            ${buildRow(tr.color, colorLabelValue)}
            ${buildRow(tr.placement, placement)}
            ${buildRow(tr.size, sizeLabelValue)}
            ${buildRow(tr.artist, artistLabelValue)}
            ${schedulePreference ? buildRow(tr.schedule, schedulePreference) : ''}
          </table>

          ${buildSectionTitle(tr.description)}
          <div style="background: #09090b; padding: 16px; border-radius: 6px; border: 1px solid #27272a; line-height: 1.6; color: #d4d4d8; font-family: Arial, sans-serif; font-size: 13px;">
            ${description?.replace(/\n/g, '<br/>') || tr.noDescription}
          </div>
        </div>
        ${buildFooterHtml(tr.footerNotification)}
      </div>
    `;

    const subjectLine = tr.subjectLine(name, tattooStyle);

    let sendResult = await resend.emails.send({
      from: `Black Ink Studio <${FROM_EMAIL}>`,
      to: [CONTACT_EMAIL],
      replyTo: email || undefined,
      subject: subjectLine,
      html: htmlContent,
    });

    // Fallback to Resend's default domain if the custom domain isn't verified
    if (sendResult.error && sendResult.error.message?.includes('domain is not verified')) {
      sendResult = await resend.emails.send({
        from: 'Black Ink Studio <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        replyTo: email || undefined,
        subject: subjectLine,
        html: htmlContent,
      });
    }

    if (sendResult.error) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to the client if email was provided
    if (email) {
      try {
        const clientHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #e4e4e7; background: #18181b; border-radius: 8px; overflow: hidden; border: 1px solid #27272a;">
            ${buildHeaderHtml()}
            <div style="padding: 28px;">
              <h2 style="color: #dc2626; font-size: 16px; margin-bottom: 16px; font-family: Arial, sans-serif; font-weight: 700;">${tr.clientGreeting(name)}</h2>
              <p style="font-size: 14px; line-height: 1.6; margin-bottom: 20px; color: #d4d4d8; font-family: Arial, sans-serif;">
                ${tr.clientBody}
              </p>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                ${buildRow(tr.style, tattooStyle)}
                ${buildRow(tr.artist, artistLabelValue)}
                ${buildRow(tr.size, sizeLabelValue)}
              </table>
              <p style="font-size: 12px; color: #a1a1aa; margin-top: 20px; font-family: Arial, sans-serif;">
                ${tr.clientQuestions}
              </p>
            </div>
            ${buildFooterHtml(tr.footerStudio)}
          </div>
        `;
        await resend.emails.send({
          from: `Black Ink Studio <${FROM_EMAIL}>`,
          to: [email],
          subject: tr.clientSubject,
          html: clientHtml,
        });
      } catch {
        // Ignore client confirmation errors silently
      }
    }

    return NextResponse.json({ success: true, id: sendResult.data?.id });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
