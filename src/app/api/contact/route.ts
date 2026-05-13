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
      serviceType,
      placement,
      size,
      description,
      artist,
      budget,
      contactPreference,
    } = body;

    if (!name || !email || !serviceType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const budgetLabel: Record<string, string> = {
      low: '$100 - $300',
      medium: '$300 - $800',
      high: '$800+',
      flexible: 'Flexible',
    };

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
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${email}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Contact Via</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; text-transform: uppercase;">${contactPreference || 'email'}</td></tr>
          </table>

          <h2 style="color: #dc2626; font-size: 18px; margin-bottom: 20px;">Tattoo Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 140px; color: #666;">Service</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; text-transform: capitalize;">${serviceType}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Placement</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${placement || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Size</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${size || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Artist</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${artistLabel}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Budget</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${budgetLabel[budget] || budget || 'N/A'}</td></tr>
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

    const { data, error } = await resend.emails.send({
      from: `Black Ink Studio <${FROM_EMAIL}>`,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `New Booking Request from ${name} - ${serviceType}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
