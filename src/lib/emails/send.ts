// lib/emails/send.ts
import { Resend } from 'resend';
import { welcomeEmail, applicationReceivedEmail } from './templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  return resend.emails.send({
    from: 'UMDAC <noreply@yourrealdomain.com>',
    to,
    subject: 'Welcome to UMDAC',
    html: welcomeEmail(name),
  });
}

export async function sendApplicationReceivedEmail(to: string, name: string, eventTitle: string) {
  return resend.emails.send({
  from: 'UMDAC <noreply@yourrealdomain.com>',
    to,
    subject: 'Application received',
    html: applicationReceivedEmail(name, eventTitle),
  });
}