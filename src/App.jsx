import { useEffect, useMemo, useState } from "react";
import { MotionConfig, motion } from "motion/react";
import {
  MapPin,
  Code2,
  Hash,
  Link2,
  Users,
  Terminal,
  Heart,
} from "lucide-react";
import { profile, categories, links } from "@/data/links";
import { useTheme } from "@/hooks/use-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle, ShareButton } from "@/components/actions";
import {
  FeaturedTiles,
  LinkList,
  CategoryTabs,
  item,
} from "@/components/links";
import { cn } from "@/lib/utils";

const YEAR = new Date().getFullYear()
const categoryIcons = {
  all: Link2,
  social: Users,
  dev: Terminal,
  support: Heart,
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

function useClock(timeZone = "Asia/Kolkata") {
  const fmt = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
      }),
    [timeZone],
  );
  const [now, setNow] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(fmt.format(new Date())), 15_000);
    return () => clearInterval(id);
  }, [fmt]);
  return now;
}

function useIsDesktop(query = "(min-width: 768px)") {
  const [match, setMatch] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const mq = matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

function StatusDot() {
  return (
    <span className="relative flex size-2">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
    </span>
  );
}

function Page({ filter, setFilter, counts, visible, featured }) {
  return (
    <motion.article
      variants={stagger}
      initial="hidden"
      animate="show"
      className="pb-10"
    >
      {/* Notion-style cover */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.8 } },
        }}
        className="cover relative h-36 overflow-hidden sm:h-44 md:rounded-none"
      />

      <div className="mx-auto max-w-xl px-5 sm:px-8">
        {/* Page icon = avatar, overlapping the cover */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9, y: 8 },
            show: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", stiffness: 260, damping: 22 },
            },
          }}
          className="relative z-10 -mt-12 mb-4"
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            width="96"
            height="96"
            className="size-24 rounded-2xl border-4 border-background object-cover shadow-md"
          />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-serif text-[44px] leading-[1.05] tracking-tight sm:text-5xl"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5 font-mono">
            <Hash className="size-3.5" />
            {profile.handle.replace("@", "")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Code2 className="size-3.5" />
            {profile.role}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {profile.location}
          </span>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-5 text-[15.5px] leading-relaxed text-foreground/85"
        >
          {profile.bio}
        </motion.p>

        {/* Notion callout */}
        <motion.div
          variants={item}
          className="mt-5 flex items-center gap-3 rounded-lg bg-muted px-3.5 py-2.5 text-sm"
        >
          <StatusDot />
          <span>{profile.status}</span>
        </motion.div>

        <motion.h2
          variants={item}
          className="mb-3 mt-9 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
        >
          Quick contact
        </motion.h2>
        <FeaturedTiles links={featured} />

        <motion.div
          variants={item}
          className="mb-3 mt-9 flex items-center justify-between"
        >
          <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Links
          </h2>
          <span className="font-mono text-[11px] text-muted-foreground">
            {visible.length} items
          </span>
        </motion.div>

        <motion.div variants={item}>
          <CategoryTabs
            categories={categories}
            value={filter}
            onChange={setFilter}
            counts={counts}
            className="mb-3 lg:hidden"
          />
          <LinkList links={visible} />
        </motion.div>

        <motion.footer
          variants={item}
          className="mt-12 border-t pt-5 text-center font-mono text-[11px] text-muted-foreground"
        >
          © {YEAR} {profile.name}
        </motion.footer>
      </div>
    </motion.article>
  );
}

function Sidebar({ filter, setFilter, counts }) {
  const time = useClock();
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r bg-sidebar lg:flex">
      <div className="flex items-center gap-2.5 px-4 pb-3 pt-4">
        <img
          src={profile.avatar}
          alt=""
          className="size-6 rounded-md object-cover"
        />
        <span className="truncate text-sm font-medium">{profile.name}</span>
      </div>

      <p className="px-4 pb-1.5 pt-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Collections
      </p>
      <nav className="flex flex-col gap-0.5 px-2" aria-label="Filter links">
        {categories.map((c) => {
          const Icon = categoryIcons[c.id] ?? Link2;
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              aria-pressed={active}
              className={cn(
                "relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-md bg-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              <Icon className="relative size-4" />
              <span className="relative flex-1">{c.label}</span>
              <span className="relative font-mono text-[11px] text-muted-foreground">
                {counts[c.id]}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1 border-t px-4 py-3.5 font-mono text-[11px] text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Local time</span>
          <span className="tabular-nums text-foreground">{time} IST</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Based in</span>
          <span className="text-foreground">{profile.location}</span>
        </div>
      </div>
    </aside>
  );
}

export default function App() {
  const { dark, toggle } = useTheme();
  const desktop = useIsDesktop();
  const [filter, setFilter] = useState("all");

  const featured = links.filter((l) => l.featured);
  const visible =
    filter === "all" ? links : links.filter((l) => l.category === filter);
  const counts = Object.fromEntries(
    categories.map((c) => [
      c.id,
      c.id === "all"
        ? links.length
        : links.filter((l) => l.category === c.id).length,
    ]),
  );
  const pageProps = { filter, setFilter, counts, visible, featured };
  const actions = (
    <div className="flex items-center gap-0.5">
      <ShareButton title={`${profile.name} · Links`} />
      <ThemeToggle dark={dark} toggle={toggle} />
    </div>
  );

  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        {/* Phone: a full-screen app */}
        {!desktop && (
          <div className="min-h-dvh bg-background">
            <header className="sticky top-0 z-20 flex items-center justify-between border-b border-transparent bg-background/80 px-3 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
              <span className="pl-2 text-sm font-medium">Links</span>
              {actions}
            </header>
            <Page {...pageProps} />
          </div>
        )}

        {/* Tablet / desktop: an app window on a canvas */}
        {desktop && (
          <div className="canvas-dots flex min-h-dvh items-center justify-center p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex h-[min(860px,calc(100dvh-5rem))] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04),0_24px_60px_-12px_rgb(0_0_0/0.18)] dark:shadow-[0_24px_60px_-12px_rgb(0_0_0/0.7)]"
            >
              {/* Title bar */}
              <div className="flex h-11 shrink-0 items-center gap-3 border-b px-3">
                <div className="flex gap-1.5 pl-1" aria-hidden>
                  <span className="size-3 rounded-full bg-[#ff5f57]" />
                  <span className="size-3 rounded-full bg-[#febc2e]" />
                  <span className="size-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex min-w-0 flex-1 items-center gap-1.5 pl-2 text-[13px] text-muted-foreground">
                  <span className="truncate">{profile.name}</span>
                  <span>/</span>
                  <span className="truncate text-foreground">Links</span>
                </div>
                {actions}
              </div>

              <div className="flex min-h-0 flex-1">
                <Sidebar
                  filter={filter}
                  setFilter={setFilter}
                  counts={counts}
                />
                <main className="min-w-0 flex-1 overflow-y-auto">
                  <Page {...pageProps} />
                </main>
              </div>
            </motion.div>
          </div>
        )}

        <Toaster dark={dark} />
      </TooltipProvider>
    </MotionConfig>
  );
}
