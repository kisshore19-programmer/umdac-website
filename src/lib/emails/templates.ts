// lib/emails/templates

export function welcomeEmail(name: string) {
  return `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2>Welcome to UMDAC, ${name}!</h2>
      <p>Your account is set up. Head to the site to check out upcoming events.</p>
    </div>
  `;
}

export function applicationReceivedEmail(name: string, eventTitle: string) {
  return `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2>Application received</h2>
      <p>Hi ${name}, we've received your application for <strong>${eventTitle}</strong>. We'll be in touch.</p>
    </div>
  `;
}