// All page content lives here. Edit this file to change the profile or links;
// no component needs to change.
//
// link.icon      -> a key from src/lib/icons.js
// link.category  -> must match an id in `categories`
// link.featured  -> true shows it as a large quick-action tile at the top

export const profile = {
  name: 'Milan Sony',
  handle: '@milansony',
  avatar: `${import.meta.env.BASE_URL}profile.jpg`,
  role: 'Developer',
  location: 'India',
  bio: "I'm a simple human being, a self-taught, passionate, and dedicated developer from India who is trying to become good at everything I do while maintaining a healthy work-life balance.",
  status: 'Stay connected with me',
}

// Contact details used by the Quick contact tiles below.
export const contact = {
  email: 'milansonyofficial@gmail.com',
  phone: '+91 8075143465',
}

// Digits only (with country code) for tel: and wa.me links.
const phoneDigits = contact.phone.replace(/\D/g, '')

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'contact', label: 'Contact' },
  { id: 'social', label: 'Social' },
  { id: 'dev', label: 'Developer' },
  { id: 'support', label: 'Support' },
]

export const links = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    handle: 'Send a message',
    url: `https://wa.me/${phoneDigits}`,
    icon: 'whatsapp',
    category: 'contact',
    featured: true,
  },
  {
    id: 'email',
    label: 'Email',
    handle: contact.email,
    url: `mailto:${contact.email}`,
    icon: 'email',
    category: 'contact',
    featured: true,
  },
  {
    id: 'call',
    label: 'Call',
    handle: contact.phone,
    url: `tel:+${phoneDigits}`,
    icon: 'phone',
    category: 'contact',
    featured: true,
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    handle: 'milansony.xyz',
    url: 'https://milansony.xyz',
    icon: 'portfolio',
    category: 'dev',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'milan-sony',
    url: 'https://github.com/milan-sony',
    icon: 'github',
    category: 'dev',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/milansony',
    url: 'https://www.linkedin.com/in/milansony',
    icon: 'linkedin',
    category: 'dev',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@milansony_',
    url: 'https://instagram.com/milansony_',
    icon: 'instagram',
    category: 'social',
  },
  {
    id: 'twitter',
    label: 'X (Twitter)',
    handle: '@milansony_',
    url: 'https://twitter.com/milansony_',
    icon: 'x',
    category: 'social',
  },
  {
    id: 'discord',
    label: 'Discord',
    handle: 'Add me on Discord',
    url: 'https://discordapp.com/users/931193799957426186',
    icon: 'discord',
    category: 'social',
  },
  {
    id: 'google-dev',
    label: 'Google Developer',
    handle: 'g.dev/milansony',
    url: 'https://g.dev/milansony',
    icon: 'google',
    category: 'dev',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: 'milansonyms',
    url: 'https://www.facebook.com/milansonyms',
    icon: 'facebook',
    category: 'social',
  },
  {
    id: 'snapchat',
    label: 'Snapchat',
    handle: 'm4mil4n',
    url: 'https://www.snapchat.com/add/m4mil4n',
    icon: 'snapchat',
    category: 'social',
  },
  {
    id: 'coffee',
    label: 'Buy me a coffee',
    handle: 'Support my work',
    url: 'https://www.buymeacoffee.com/milansony',
    icon: 'coffee',
    category: 'support',
  },
]
