import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const spring = { type: 'spring', stiffness: 320, damping: 30 }

// Avatar that opens a full-size view of the photo. Closes on the X button,
// Escape, or a click outside the photo (Radix Dialog handles focus + a11y).
export function AvatarLightbox({ src, alt, className }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <motion.button
          type="button"
          aria-label={`View ${alt}'s photo`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={spring}
          className="block cursor-zoom-in rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <img src={src} alt={alt} width="96" height="96" className={className} />
        </motion.button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              aria-describedby={undefined}
              onPointerDownOutside={() => setOpen(false)}
            >
              <div
                className="fixed inset-0 z-50 grid place-items-center p-5 outline-none"
                onClick={(e) => e.target === e.currentTarget && setOpen(false)}
              >
                <Dialog.Title className="sr-only">{alt}</Dialog.Title>

                <motion.img
                  src={src}
                  alt={alt}
                  initial={{ opacity: 0, scale: 0.88, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 8 }}
                  transition={spring}
                  className="aspect-square w-[min(88vw,72vh,460px)] rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
                />

                <Dialog.Close asChild>
                  <motion.button
                    type="button"
                    aria-label="Close photo"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={spring}
                    className={cn(
                      'fixed right-4 top-[max(1rem,env(safe-area-inset-top))] grid size-10 place-items-center rounded-full',
                      'bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-white/20',
                      'outline-none focus-visible:ring-2 focus-visible:ring-white',
                    )}
                  >
                    <X className="size-5" />
                  </motion.button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
