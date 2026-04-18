import { Component } from '@angular/core';

interface ContactItem {
  icon: string;
  label: string;
  value: string;
}

interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  protected readonly whatsappRecipientPhone = '84996131203';

  protected readonly contactItems: ContactItem[] = [
    {
      icon: 'ri-map-pin-line',
      label: 'Endereço',
      value: 'Av. Prudente de Morais, 1925 - Barro Vermelho, Natal - RN, 59022-550',
    },
    {
      icon: 'ri-phone-line',
      label: 'Telefone',
      value: '(84) 99701-1192',
    },
    {
      icon: 'ri-mail-line',
      label: 'E-mail',
      value: 'contato@graciebarretirol.com.br',
    },
    {
      icon: 'ri-time-line',
      label: 'Horário',
      value: 'Seg-Sex: 06h30 às 22h | Sáb: 09h às 13h',
    },
  ];

  protected readonly socialLinks: SocialLink[] = [
    {
      icon: 'ri-facebook-fill',
      label: 'Facebook',
      href: '#',
    },
    {
      icon: 'ri-instagram-line',
      label: 'Instagram',
      href: '#',
    },
    {
      icon: 'ri-whatsapp-line',
      label: 'WhatsApp',
      href: '#',
    },
  ];

  protected sendToWhatsApp(form: HTMLFormElement): void {
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const classInterest = String(formData.get('class') ?? '').trim();
    const timePreference = String(formData.get('time') ?? '').trim();
    const experience = String(formData.get('experience') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    const whatsappMessage = [
      'Olá! Gostaria de agendar minha aula grátis.',
      '',
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `E-mail: ${email}`,
      `Turma de interesse: ${classInterest}`,
      `Horário preferido: ${timePreference}`,
      `Experiência anterior: ${experience}`,
      message ? `Mensagem: ${message}` : null,
    ]
      .filter((line): line is string => line !== null && line.length > 0)
      .join('\n');

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/55${this.whatsappRecipientPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  protected formatPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;

    if (!input) {
      return;
    }

    const digits = input.value.replace(/\D/g, '').slice(0, 11);

    if (digits.length === 0) {
      input.value = '';
      return;
    }

    if (digits.length <= 2) {
      input.value = `(${digits}`;
      return;
    }

    const areaCode = digits.slice(0, 2);
    const localPart = digits.slice(2);
    const prefix = localPart.length > 4 ? localPart.slice(0, localPart.length - 4) : localPart.slice(0, 4);
    const suffix = localPart.slice(-4);

    input.value =
      localPart.length > 4
        ? `(${areaCode}) ${prefix}-${suffix}`
        : `(${areaCode}) ${localPart}`;
  }
}
