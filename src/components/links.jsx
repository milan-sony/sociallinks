import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { getIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

const ease = [0.2, 0.8, 0.2, 1]

// Web links open in a new tab; mailto:/tel: hand off to the device's app.
const linkProps = (url) =>
  /^https?:/.test(url) ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : { href: url }

export const item = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease } },
}

function BrandIcon({ icon, className }) {
  const { Icon, color } = getIcon(icon)
  return (
    <span
      style={{ '--brand': color }}
      className={cn(
        'grid place-items-center rounded-lg border bg-background text-foreground shadow-xs transition-colors duration-200',
        'group-hover:text-(--brand)',
        className,
      )}
    >
      <Icon aria-hidden />
    </span>
  )
}

export function FeaturedTiles({ links }) {
  if (!links.length) return null
  return (
    <motion.div variants={item} className="grid grid-cols-3 gap-2 sm:gap-3">
      {links.map((l) => (
        <motion.a
          key={l.id}
          {...linkProps(l.url)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          title={l.handle}
          className="group relative flex flex-col gap-4 rounded-xl border bg-card p-3 sm:gap-6 sm:p-4 shadow-xs outline-none transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex items-start justify-between">
            <BrandIcon icon={l.icon} className="size-9 text-base sm:size-10 sm:text-lg" />
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-medium">{l.label}</p>
            <p className="hidden truncate font-mono text-xs text-muted-foreground sm:block">{l.handle}</p>
          </div>
        </motion.a>
      ))}
    </motion.div>
  )
}

export function LinkList({ links }) {
  return (
    <motion.ul layout className="flex flex-col gap-1.5">
      <AnimatePresence mode="popLayout" initial={false}>
        {links.map((l) => (
          <motion.li
            key={l.id}
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease }}
          >
            <motion.a
              {...linkProps(l.url)}
              whileTap={{ scale: 0.985 }}
              className="group flex items-center gap-3.5 rounded-xl px-2.5 py-2.5 outline-none transition-colors duration-150 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
            >
              <BrandIcon icon={l.icon} className="size-9 text-base" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-medium leading-tight">{l.label}</span>
                <span className="block truncate font-mono text-xs text-muted-foreground">{l.handle}</span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-60 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground group-hover:opacity-100" />
            </motion.a>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}

export function CategoryTabs({ categories, value, onChange, counts, className }) {
  return (
    <div
      role="tablist"
      aria-label="Filter links"
      className={cn('flex gap-1 overflow-x-auto rounded-lg bg-muted p-1 [scrollbar-width:none]', className)}
    >
      {categories.map((c) => {
        const active = c.id === value
        return (
          <button
            key={c.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(c.id)}
            className={cn(
              'relative flex-1 shrink-0 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
              active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {active && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-md bg-background shadow-sm"
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative">
              {c.label}
              <span className="ml-1 font-mono text-[11px] text-muted-foreground">{counts[c.id]}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
