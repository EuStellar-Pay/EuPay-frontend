import { useState, useEffect, useRef, useCallback } from 'react'

interface Props { onConnect: (address: string) => void }

/* ─── Live stream mock card ──────────────────────────────────── */
function StreamCard() {
  const [xlm, setXlm] = useState(847.2341)
  const startRef = useRef(Date.now())
  const RATE = 0.00347222

  useEffect(() => {
    const id = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000
      setXlm(parseFloat((847.2341 + elapsed * RATE).toFixed(4)))
    }, 80)
    return () => clearInterval(id)
  }, [])

  const pct = Math.min(73 + ((Date.now() - startRef.current) / 1000) * 0.002, 100)

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 w-full max-w-sm mx-auto animate-float relative overflow-hidden">
      {/* Inner glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold shadow-brand-sm">AM</div>
          <div>
            <div className="text-xs font-semibold text-white leading-none">Alice Martinez</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">GAXYZ...3A4B</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
          <div className="live-dot scale-75" />
          <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">Live</span>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-1">
        <div className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mb-1">Earned this stream</div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums tracking-tight leading-none">
            {xlm.toFixed(4)}
          </span>
          <span className="text-sm font-bold text-indigo-400">XLM</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">≈ ${(xlm * 0.4).toFixed(2)} USD</div>
      </div>

      {/* Progress */}
      <div className="my-4">
        <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
          <span>Stream progress</span>
          <span className="text-indigo-400 font-semibold">{pct.toFixed(1)}%</span>
        </div>
        <div className="stream-bar">
          <div className="stream-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Rate */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-[10px] text-slate-500">Rate</div>
        <div className="flex items-center gap-1.5">
          <div className="live-dot scale-75" />
          <span className="text-[11px] font-mono font-semibold text-emerald-400">0.00347 XLM/sec</span>
        </div>
      </div>

      {/* CTA */}
      <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold shadow-brand-sm hover:shadow-brand-md transition-all hover:-translate-y-px active:translate-y-0">
        Claim Earnings →
      </button>
    </div>
  )
}

/* ─── Payment ticker ─────────────────────────────────────────── */
const TICKER_ITEMS = [
  { wallet: 'GAXYZ...3A4B', amount: '+12.48 XLM', role: 'Worker claimed' },
  { wallet: 'GBCD...7E2F', amount: '+8.91 XLM',  role: 'Worker claimed' },
  { wallet: 'GCORP...1A9Z', amount: '500 XLM deposited', role: 'Treasury funded' },
  { wallet: 'GDEF...5F1C', amount: '+22.30 XLM', role: 'Worker claimed' },
  { wallet: 'GHIJ...9B3D', amount: 'Stream created', role: '0.025 XLM/min' },
  { wallet: 'GKLM...4C8E', amount: '+6.17 XLM',  role: 'Worker claimed' },
  { wallet: 'GNOP...2D7F', amount: '1000 XLM deposited', role: 'Treasury funded' },
  { wallet: 'GQRS...6E1G', amount: '+15.82 XLM', role: 'Worker claimed' },
]

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-white/[0.02] py-3">
      <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-[#05070f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-[#05070f] to-transparent z-10 pointer-events-none" />
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 px-5 shrink-0">
            <div className="live-dot scale-75 shrink-0" />
            <span className="text-xs text-slate-500 font-mono">{item.wallet}</span>
            <span className="text-xs font-semibold text-white">{item.amount}</span>
            <span className="text-xs text-slate-600">{item.role}</span>
            <span className="text-slate-700 mx-2 text-xs">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Feature card ───────────────────────────────────────────── */
interface FeatCardProps { icon: string; title: string; desc: string; accent?: string }
function FeatCard({ icon, title, desc, accent = 'indigo' }: FeatCardProps) {
  const colors: Record<string, string> = {
    indigo: 'from-indigo-500/20 to-violet-500/10 border-indigo-500/20 text-indigo-400',
    violet: 'from-violet-500/20 to-purple-500/10 border-violet-500/20 text-violet-400',
    teal:   'from-teal-500/20 to-emerald-500/10 border-teal-500/20 text-teal-400',
    amber:  'from-amber-500/20 to-yellow-500/10 border-amber-500/20 text-amber-400',
  }
  const cls = colors[accent] ?? colors.indigo
  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 group">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cls} border flex items-center justify-center text-xl mb-4`}>
        {icon}
      </div>
      <h4 className="font-bold text-white mb-1.5 text-sm sm:text-base">{title}</h4>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  )
}

/* ─── Stat card ──────────────────────────────────────────────── */
function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 text-center">
      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text-brand font-mono mb-1 tracking-tight">{value}</div>
      <div className="text-sm font-semibold text-white">{label}</div>
      {sub && <div className="text-xs text-slate-600 mt-0.5">{sub}</div>}
    </div>
  )
}

/* ─── Navbar ─────────────────────────────────────────────────── */
function Navbar({ onConnect }: { onConnect: () => void }) {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={`sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-16 transition-all duration-300 ${scrolled ? 'bg-[#05070f]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.4)]' : 'bg-transparent'}`}>
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-brand-sm group-hover:shadow-brand-md transition-all">
            <span className="text-sm">⚡</span>
          </div>
          <span className="text-base font-extrabold text-white tracking-tight">EuPay</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
          {[['Features','#features'],['How It Works','#how-it-works'],['Docs','#']].map(([label, href]) => (
            <li key={label}>
              <a href={href} className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all font-medium">{label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://github.com/EuStellar-Pay/EuPay-frontend" target="_blank" rel="noopener noreferrer"
            className="text-sm text-slate-500 hover:text-white transition-colors px-2 py-1.5">
            GitHub
          </a>
          <button onClick={onConnect} className="btn-primary text-sm px-5 py-2">
            Launch App
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(v => !v)}
          className="flex md:hidden w-10 h-10 items-center justify-center flex-col gap-[5px] rounded-xl hover:bg-white/[0.06] transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile backdrop */}
      <div onClick={close} className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />

      {/* Mobile drawer */}
      <div className={`fixed top-16 left-0 right-0 z-50 md:hidden bg-[#080c18] border-b border-white/[0.06] shadow-2xl transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="px-4 py-4 flex flex-col gap-1">
          {[['Features','#features'],['How It Works','#how-it-works'],['Docs','#']].map(([label, href]) => (
            <a key={label} href={href} onClick={close}
              className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:bg-white/[0.06] hover:text-white transition-all min-h-[48px]">
              {label}
            </a>
          ))}
          <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-col gap-2">
            <button onClick={() => { close(); onConnect() }} className="btn-primary w-full">
              Launch App →
            </button>
            <a href="https://github.com/EuStellar-Pay/EuPay-frontend" target="_blank" rel="noopener noreferrer" onClick={close}
              className="btn-ghost w-full">
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Main LandingPage ───────────────────────────────────────── */
const EMPLOYER_FEATS = [
  { icon: '⚡', title: 'Instant Stream Setup',    desc: 'Deploy a payroll stream in under 60 seconds. Set rate, token, and recipient.', accent: 'indigo' },
  { icon: '🏦', title: 'Treasury Management',     desc: 'Fund your vault with XLM, USDC or any Stellar asset. Full on-chain transparency.', accent: 'violet' },
  { icon: '📊', title: 'Real-Time Analytics',     desc: 'Monitor payroll burn rate, active headcount, and total disbursed live.', accent: 'teal' },
  { icon: '🛑', title: 'Prorated Cancellation',   desc: 'Cancel any stream instantly. Workers receive a fair final payment automatically.', accent: 'amber' },
]
const WORKER_FEATS = [
  { icon: '👁️', title: 'Per-Second Earnings',   desc: 'Watch your balance tick up every second — not every two weeks.', accent: 'indigo' },
  { icon: '🏧', title: 'Claim On Demand',        desc: 'Withdraw earned salary anytime with a single transaction.', accent: 'violet' },
  { icon: '📜', title: 'Verifiable History',     desc: 'Every payment on-chain. Your income history is yours forever.', accent: 'teal' },
  { icon: '🌍', title: 'Receive Anywhere',       desc: 'Get paid in XLM or USDC, anywhere in the world, instantly.', accent: 'amber' },
]

const STEPS = [
  { n: '01', icon: '🔗', title: 'Connect Wallet',      desc: 'Install Freighter, connect your Stellar wallet. Employer or worker — takes 30 seconds.' },
  { n: '02', icon: '🏦', title: 'Fund Treasury',       desc: 'Employers deposit XLM or USDC into the on-chain vault. Funds stay non-custodial.' },
  { n: '03', icon: '⚡', title: 'Create a Stream',     desc: 'Set a per-second rate, assign to a worker\'s wallet. Stream starts immediately.' },
  { n: '04', icon: '💸', title: 'Earn Every Second',   desc: 'Workers watch earnings accrue in real-time. Claim whenever they want.' },
]

export function LandingPage({ onConnect }: Props) {
  const handleConnect = useCallback(() => onConnect('MOCK_ADDRESS'), [onConnect])

  return (
    <div className="min-h-screen bg-[#05070f] text-white overflow-x-hidden">
      <Navbar onConnect={handleConnect} />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-28">

        {/* Background layers */}
        <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-brand pointer-events-none" />
        <div className="absolute inset-0 bg-radial-violet pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left */}
            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6 sm:mb-8">
                <div className="live-dot scale-75" style={{ background: '#6366f1', boxShadow: '0 0 0 0 rgba(99,102,241,0.5)' }} />
                <span className="text-[11px] font-bold text-indigo-400 tracking-widest uppercase">Live on Stellar Soroban</span>
              </div>

              {/* Headline */}
              <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[1.08] mb-5 sm:mb-6">
                <span className="text-white">Every Second,</span>
                <br />
                <span className="gradient-text">You're Getting Paid.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed">
                EuPay streams salaries directly on Stellar. Workers watch earnings grow per-second. Employers manage payroll on-chain — no banks, no delays, zero fees.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button onClick={handleConnect} className="btn-primary text-sm sm:text-base px-7 py-3.5">
                  Launch App →
                </button>
                <a href="https://github.com/EuStellar-Pay/EuPay-frontend" target="_blank" rel="noopener noreferrer"
                  className="btn-ghost text-sm sm:text-base px-7 py-3.5">
                  View on GitHub
                </a>
              </div>

              {/* Trust row */}
              <div className="flex items-center gap-4 sm:gap-5 mt-8 sm:mt-10 justify-center lg:justify-start flex-wrap">
                {[
                  { icon: '⚡', label: 'Stellar' },
                  { icon: '🔷', label: 'Soroban' },
                  { icon: '🔐', label: 'Freighter' },
                  { icon: '🪙', label: 'XLM & USDC' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — animated card */}
            <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md mx-auto">
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute inset-0 bg-indigo-500/20 rounded-3xl blur-3xl scale-110 pointer-events-none animate-glow-pulse" />
                <StreamCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────────────────────── */}
      <Ticker />

      {/* ── STATS ───────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <StatCard value="2.4M+"  label="XLM Streamed"   sub="and counting" />
          <StatCard value="1,200+" label="Active Streams"  sub="right now" />
          <StatCard value="40+"    label="Countries"       sub="worldwide" />
          <StatCard value="$0"     label="Protocol Fees"   sub="always free" />
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────── */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
        <div className="mb-10 sm:mb-14">
          <span className="section-label mb-3 block">Features</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Built for both sides of payroll
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl leading-relaxed">
            Full control for employers. Full transparency for workers. All on-chain.
          </p>
        </div>

        {/* Employers */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 border border-indigo-500/20 text-sm">🏢</div>
            <h3 className="font-bold text-white text-base sm:text-lg">For Employers</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EMPLOYER_FEATS.map(f => <FeatCard key={f.title} {...f as any} />)}
          </div>
        </div>

        {/* Workers */}
        <div>
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-500/20 text-sm">👤</div>
            <h3 className="font-bold text-white text-base sm:text-lg">For Workers</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WORKER_FEATS.map(f => <FeatCard key={f.title} {...f as any} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────── */}
      <section id="how-it-works" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.015] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <span className="section-label mb-3 block">How It Works</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            Up and streaming in minutes
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl leading-relaxed mb-12 sm:mb-16">
            Four steps from wallet to real-time payroll. Every transaction on the Stellar blockchain.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {/* Connecting line — lg only */}
            <div className="hidden lg:block absolute top-8 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-px">
              <div className="h-full bg-gradient-to-r from-indigo-500/50 via-violet-500/30 to-teal-500/20 relative">
                <div className="absolute inset-0 animate-stream-flow bg-gradient-stream bg-[length:200%_100%] opacity-60" />
              </div>
            </div>

            {STEPS.map((s, i) => (
              <div key={s.n} className="flex flex-row sm:flex-col items-start sm:items-center sm:text-center gap-4 sm:gap-0 relative" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-brand-sm sm:mb-5 relative z-10 group-hover:shadow-brand-md transition-all">
                    <span className="text-2xl">{s.icon}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#05070f] border border-white/10 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-indigo-400">{s.n}</span>
                  </div>
                </div>
                <div className="sm:px-1">
                  <h3 className="font-bold text-white mb-1.5 text-sm sm:text-base">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-20 sm:py-24 md:py-32">
        {/* Background */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[400px] sm:h-[600px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none animate-glow-pulse" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/8 mb-6">
            <div className="live-dot scale-75" style={{ background: '#6366f1' }} />
            <span className="text-[11px] font-bold text-indigo-400 tracking-widest uppercase">Live on Testnet</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-5">
            <span className="gradient-text">Start streaming.</span>
            <br />
            <span className="text-white">Stop waiting.</span>
          </h2>

          <p className="text-sm sm:text-lg text-slate-400 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Connect your Freighter wallet and set up your first payroll stream in 60 seconds. No banks. No delays. No fees.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0">
            <button onClick={handleConnect} className="btn-primary text-sm sm:text-base px-8 py-4 rounded-xl animate-glow-pulse">
              Launch App →
            </button>
            <a href="https://github.com/EuStellar-Pay" target="_blank" rel="noopener noreferrer"
              className="btn-ghost text-sm sm:text-base px-8 py-4 rounded-xl">
              View Organisation
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] bg-[#080c18] px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-brand-sm">
                <span className="text-sm">⚡</span>
              </div>
              <span className="text-base font-extrabold text-white">EuPay</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-[220px]">
              Real-time payroll streaming on Stellar &amp; Soroban. Pay per second, not per month.
            </p>
          </div>

          {[
            { title: 'Product',    links: [{ l: 'Dashboard', h: '#' }, { l: 'Stream Manager', h: '#' }, { l: 'Treasury Vault', h: '#' }] },
            { title: 'Developers', links: [{ l: 'GitHub', h: 'https://github.com/EuStellar-Pay', e: true }, { l: 'Frontend', h: 'https://github.com/EuStellar-Pay/EuPay-frontend', e: true }, { l: 'Smart Contracts', h: 'https://github.com/EuStellar-Pay/EuPay-smartcontract', e: true }] },
            { title: 'Community',  links: [{ l: 'Contributors', h: '#' }, { l: 'Issues', h: 'https://github.com/EuStellar-Pay/EuPay-frontend/issues', e: true }, { l: 'Stellar Forum', h: 'https://stellar.org/community', e: true }] },
          ].map(col => (
            <div key={col.title}>
              <div className="text-xs font-bold tracking-widest uppercase text-slate-600 mb-3 sm:mb-4">{col.title}</div>
              <ul className="space-y-2 sm:space-y-2.5">
                {col.links.map(({ l, h, e }) => (
                  <li key={l}>
                    <a href={h} {...(e ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-xs sm:text-sm text-slate-500 hover:text-indigo-400 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto pt-5 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-2 text-center">
          <span className="text-xs text-slate-700">© 2026 EuStellar-Pay. Apache 2.0 License.</span>
          <span className="text-xs text-slate-700">⚡ Powered by Stellar &amp; Soroban</span>
        </div>
      </footer>
    </div>
  )
}
