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
  role: 'Coder',
  location: 'India',
  bio: "Hi, I'm Milan Sony, a passionate and dedicated coder from India.",
  status: 'Stay connected with me',
}

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'social', label: 'Social' },
  { id: 'dev', label: 'Developer' },
  { id: 'support', label: 'Support' },
]

export const links = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    handle: 'Send a message',
    url: 'https://wa.me/918075143465',
    icon: 'whatsapp',
    category: 'social',
    featured: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'milan-sony',
    url: 'https://github.com/milan-sony',
    icon: 'github',
    category: 'dev',
    featured: true,
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
