export const contactConfig = {
  email: 'admin@banele.dev',
  location: 'East London, South Africa',
  phone: '',
  whatsappNumber: '',
  whatsappMessage: "Hi, I'd like to discuss a web development project.",
} as const;

export const getWhatsAppHref = (number = contactConfig.whatsappNumber) => {
  if (!number) return undefined;

  return `https://wa.me/${number}?text=${encodeURIComponent(contactConfig.whatsappMessage)}`;
};
