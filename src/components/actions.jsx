import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun, Share } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function ThemeToggle({ dark, toggle }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme" className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={dark ? 'moon' : 'sun'}
              initial={{ y: -14, rotate: -90, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={{ y: 14, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex"
            >
              {dark ? <Moon /> : <Sun />}
            </motion.span>
          </AnimatePresence>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{dark ? 'Light mode' : 'Dark mode'}</TooltipContent>
    </Tooltip>
  )
}

export function ShareButton({ title }) {
  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        /* user dismissed the share sheet */
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      toast('Link copied to clipboard')
    } catch {
      toast('Could not copy the link')
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={share} aria-label="Share this page">
          <Share />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Share</TooltipContent>
    </Tooltip>
  )
}
