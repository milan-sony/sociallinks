import {
  FaWhatsapp,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaDiscord,
  FaGoogle,
  FaFacebookF,
  FaSnapchat,
  FaEnvelope,
  FaPhone,
  FaGlobe,
} from 'react-icons/fa6'
import { SiBuymeacoffee } from 'react-icons/si'
import { Link2 } from 'lucide-react'

// key -> { Icon, color } ; color is the brand colour shown on hover.
export const icons = {
  whatsapp: { Icon: FaWhatsapp, color: '#25D366' },
  github: { Icon: FaGithub, color: 'currentColor' },
  linkedin: { Icon: FaLinkedinIn, color: '#0A66C2' },
  instagram: { Icon: FaInstagram, color: '#E1306C' },
  x: { Icon: FaXTwitter, color: 'currentColor' },
  discord: { Icon: FaDiscord, color: '#5865F2' },
  google: { Icon: FaGoogle, color: '#4285F4' },
  facebook: { Icon: FaFacebookF, color: '#1877F2' },
  snapchat: { Icon: FaSnapchat, color: '#F7C600' },
  coffee: { Icon: SiBuymeacoffee, color: '#FF813F' },
  email: { Icon: FaEnvelope, color: '#EA4335' },
  phone: { Icon: FaPhone, color: '#22C55E' },
  portfolio: { Icon: FaGlobe, color: '#0EA5E9' },
}

export const getIcon = (key) => icons[key] ?? { Icon: Link2, color: 'currentColor' }
