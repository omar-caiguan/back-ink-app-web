import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@blackink.studio';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

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
    } = body;

    if (!name || !phone || !tattooStyle || !colorType || !placement || !size || !artist) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const sizeLabel: Record<string, string> = {
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
    };

    const colorLabel = colorType === 'black' ? 'Black / Shading' : 'Full Color';
    const artistLabel = artist === 'any' ? 'First Available' : artist;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <div style="background: #dc2626; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Booking Request - Black Ink</h1>
        </div>
        <div style="padding: 32px; background: #fafafa; border: 1px solid #e5e5e5;">
          <h2 style="color: #dc2626; font-size: 18px; margin-bottom: 20px;">Client Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 140px; color: #666;">Name</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${phone}</td></tr>
            ${email ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${email}</td></tr>` : ''}
          </table>

          <h2 style="color: #dc2626; font-size: 18px; margin-bottom: 20px;">Tattoo Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 140px; color: #666;">Style</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; text-transform: capitalize;">${tattooStyle}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Color</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${colorLabel}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Placement</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${placement}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Size</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${sizeLabel[size] || size}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Artist</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${artistLabel}</td></tr>
            ${schedulePreference ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Schedule Preference</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${schedulePreference}</td></tr>` : ''}
          </table>

          <h2 style="color: #dc2626; font-size: 18px; margin-bottom: 20px;">Description</h2>
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e5e5; line-height: 1.6;">
            ${description?.replace(/\n/g, '<br/>') || 'No description provided.'}
          </div>
        </div>
        <div style="background: #1a1a1a; padding: 16px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0;">Black Ink Tattoo Studio - Automated Notification</p>
        </div>
      </div>
    `;

    const subjectLine = `New Booking Request from ${name} - ${tattooStyle}`;

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
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <div style="background: #dc2626; padding: 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Booking Received - Black Ink</h1>
            </div>
            <div style="padding: 32px; background: #fafafa; border: 1px solid #e5e5e5;">
              <h2 style="color: #dc2626; font-size: 18px; margin-bottom: 20px;">Hi ${name},</h2>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
                We have received your booking request. Our team will review your details and contact you shortly.
              </p>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 140px; color: #666;">Style</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; text-transform: capitalize;">${tattooStyle}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Artist</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${artistLabel}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Size</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${sizeLabel[size] || size}</td></tr>
              </table>
              <p style="font-size: 14px; color: #666; margin-top: 24px;">
                If you have any questions, feel free to reply to this email or contact us directly.
              </p>
            </div>
            <div style="background: #1a1a1a; padding: 16px; text-align: center; color: #999; font-size: 12px;">
              <p style="margin: 0;">Black Ink Tattoo Studio</p>
            </div>
          </div>
        `;
        await resend.emails.send({
          from: `Black Ink Studio <${FROM_EMAIL}>`,
          to: [email],
          subject: `Booking Confirmation - Black Ink Studio`,
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
