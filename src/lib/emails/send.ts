// lib/emails/send.ts
import { Resend } from 'resend';
import { welcomeEmail, applicationReceivedEmail } from './templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  return resend.emails.send({
    from: 'UMDAC <onboarding@resend.dev>', // Resend's free sandbox sender — fine for now
    to,
    subject: 'Welcome to UMDAC',
    html: welcomeEmail(name),
  });
}

export async function sendApplicationReceivedEmail(to: string, name: string, eventTitle: string) {
  return resend.emails.send({
    from: 'UMDAC <onboarding@resend.dev>',
    to,
    subject: 'Application received',
    html: applicationReceivedEmail(name, eventTitle),
  });
}