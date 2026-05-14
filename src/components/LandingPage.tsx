import { useState, useEffect, useRef, useCallback } from 'react'

interface Props { onConnect: (a: string) => void }

/* ── Shared Tailwind class strings ──────────────────────────────── */
const glass   = 'backdrop-blur-xl bg-white/[0.04] border border-white/[0.08]'
const bentoCard = 'rounded-[20px] bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/30 hover:bg-indigo-500/[0.035] transition-all duration-300 overflow-hidden'
const gtBrand   = 'bg-gradient-to-br from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent'
const gtGlow    = 'bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent'
const btnPrimary = 'inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl min-h-[48px] transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0 relative overflow-hidden'
const btnOutline = 'inline-flex items-center justify-center gap-2 bg-white/[0.05] text-slate-300 font-semibold rounded-xl border border-white/[0.1] min-h-[48px] transition-all duration-200 hover:bg-white/[0.09] hover:border-white/[0.2] hover:text-white hover:-translate-y-[1px]'

/* ── Live Stream Card ────────────────────────────────────────────── */
function HeroCard() {
  const [xlm, setXlm] = useState(2847.3912)
  const [logs, setLogs] = useState([
    { id: 1, wallet: 'GAXYZ...3A4B', amt: '+0.0035 XLM', ms: '12ms' },
    { id: 2, wallet: 'GBCD...7E2F',  amt: '+0.0035 XLM', ms: '24ms' },
    { id: 3, wallet: 'GCDE...1F9C',  amt: '+0.0035 XLM', ms: '36ms' },
  ])
  const counter = useRef(4)
  const startRef = useRef(Date.now())

  useEffect(() => {
    const tick = setInterval(() => {
      const e = (Date.now() - startRef.current) / 1000
      setXlm(parseFloat((2847.3912 + e * 0.0347).toFixed(4)))
    }, 80)
    const addLog = setInterval(() => {
      const ws = ['GHIJ...9B2D','GKLM...4C3E','GNOP...8D1F','GQRS...2E5G','GTUV...6F7H']
      setLogs(prev => [
        { id: counter.current++, wallet: ws[Math.floor(Math.random()*ws.length)], amt: '+0.0035 XLM', ms: `${Math.floor(Math.random()*50+5)}ms` },
        ...prev.slice(0,2)
      ])
    }, 1800)
    return () => { clearInterval(tick); clearInterval(addLog) }
  }, [])

  return (
    <div className={`${glass} rounded-2xl p-5 w-full max-w-sm animate-float relative overflow-hidden shadow-[0_0_60px_rgba(99,102,241,0.15)] border-indigo-500/25`}>
      {/* Inner glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

      {/* Live badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pdot" />
          <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Live Stream</span>
        </div>
        <span className="text-[10px] font-mono text-slate-600 bg-white/[0.05] px-2 py-0.5 rounded-md border border-white/[0.06]">TESTNET</span>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-1.5">Total streamed today</p>
        <div className="flex items-end gap-2 leading-none">
          <span className={`text-[2.5rem] font-black font-mono tabular-nums ${gtBrand}`}>{xlm.toFixed(4)}</span>
          <span className="text-base font-bold text-slate-500 mb-1">XLM</span>
        </div>
        <p className="text-[11px] text-slate-600 mt-1.5">≈ ${(xlm * 0.40).toFixed(2)} USD · 0.0347 XLM/sec</p>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="h-[3px] bg-white/[0.07] rounded-full overflow-hidden">
          <div className="stream-fill" style={{ width: '73%' }} />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-slate-600">Stream progress</span>
          <span className="text-[10px] font-semibold text-indigo-400">73.2%</span>
        </div>
      </div>

      {/* Terminal */}
      <div className="bg-black/60 border border-white/[0.07] rounded-xl font-mono text-xs overflow-hidden">
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white/[0.03] border-b border-white/[0.05]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 text-[10px] text-slate-600">eupay · payments</span>
        </div>
        <div className="p-3 space-y-1.5">
          {logs.map((l, i) => (
            <div key={l.id} className={`flex items-center gap-2 transition-opacity duration-300 ${i === 0 ? 'opacity-100' : i === 1 ? 'opacity-50' : 'opacity-25'}`}>
              <span className="text-emerald-500 shrink-0">✓</span>
              <span className="text-slate-500 flex-1 truncate">{l.wallet}</span>
              <span className="text-white font-semibold">{l.amt}</span>
              <span className="text-slate-700">{l.ms}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-indigo-400">$</span>
            <span className="text-slate-500">processing stream</span>
            <span className="inline-block w-[2px] h-[1em] bg-indigo-500 ml-0.5 animate-blink align-text-bottom" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Ticker ─────────────────────────────────────────────────────── */
const TICKS = [
  { w: 'GAXYZ...3A4B', a: '+12.48 XLM', t: 'Claimed' },
  { w: 'GBCD...7E2F',  a: '+8.91 XLM',  t: 'Claimed' },
  { w: 'CORP...1A9Z',  a: '500 XLM',    t: 'Treasury funded' },
  { w: 'GDEF...5F1C',  a: '+22.30 XLM', t: 'Claimed' },
  { w: 'GHIJ...9B3D',  a: 'New stream', t: '0.025 XLM/min' },
  { w: 'GKLM...4C8E',  a: '+6.17 XLM',  t: 'Claimed' },
  { w: 'GNOP...2D7F',  a: '1000 XLM',   t: 'Treasury funded' },
  { w: 'GQRS...6E1G',  a: '+15.82 XLM', t: 'Claimed' },
]

function Ticker() {
  const items = [...TICKS, ...TICKS]
  return (
    <div className="relative overflow-hidden py-3 border-y border-white/[0.05] bg-white/[0.015]">
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee" style={{ width: 'max-content' }}>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 px-6 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
            <span className="text-xs text-slate-600 font-mono">{item.w}</span>
            <span className="text-xs font-bold text-white">{item.a}</span>
            <span className="text-xs text-slate-600">{item.t}</span>
            <span className="w-1 h-1 rounded-full bg-slate-800 mx-1 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Bento card with icon ────────────────────────────────────────── */
function BCard({ icon, title, desc, accent, children, wide }: { icon: string; title: string; desc?: string; accent: string; children?: React.ReactNode; wide?: boolean }) {
  const accents: Record<string, string> = {
    indigo: 'bg-gradient-to-br from-indigo-500/20 to-violet-500/10 border-indigo-500/25 text-indigo-300',
    violet: 'bg-gradient-to-br from-violet-500/20 to-purple-500/10 border-violet-500/25 text-violet-300',
    cyan:   'bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border-cyan-500/25 text-cyan-300',
    amber:  'bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border-amber-500/25 text-amber-300',
    emerald:'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border-emerald-500/25 text-emerald-300',
    pink:   'bg-gradient-to-br from-pink-500/20 to-rose-500/10 border-pink-500/25 text-pink-300',
  }
  return (
    <div className={`${bentoCard} p-5 sm:p-6 ${wide ? 'sm:col-span-2' : ''}`}>
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-xl mb-4 ${accents[accent]}`}>{icon}</div>
      <h3 className="font-bold text-white mb-2 text-sm sm:text-base">{title}</h3>
      {desc && <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{desc}</p>}
      {children}
    </div>
  )
}

/* ── Navbar ──────────────────────────────────────────────────────── */
function Navbar({ onConnect }: { onConnect: () => void }) {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  const close = () => setOpen(false)

  return (
    <>
      <nav className={`sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-16 transition-all duration-300 ${scrolled ? `${glass} border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]` : 'bg-transparent border-b border-transparent'}`}>
        <a href="/" onClick={close} className="flex items-center gap-2 shrink-0 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_24px_rgba(99,102,241,0.7)] transition-all">
            <span className="text-sm">⚡</span>
          </div>
          <span className="text-[15px] font-extrabold text-white tracking-tight">EuPay</span>
        </a>

        <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
          {[['Features','#features'],['How It Works','#how-it-works']].map(([l,h]) => (
            <li key={l}><a href={h} className="px-3.5 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all font-medium">{l}</a></li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://github.com/EuStellar-Pay" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-300 transition-colors">GitHub</a>
          <button onClick={onConnect} className={`${btnPrimary} text-sm px-5 py-2 shadow-[0_0_0_1px_rgba(99,102,241,0.4),0_4px_20px_rgba(99,102,241,0.3)]`}>Launch App</button>
        </div>

        <button onClick={() => setOpen(v => !v)} className="flex md:hidden w-10 h-10 items-center justify-center flex-col gap-[5px] rounded-xl hover:bg-white/[0.06] transition-colors" aria-label="Menu">
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div onClick={close} className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />
      <div className={`fixed top-16 left-0 right-0 z-50 md:hidden ${glass} border-b border-white/[0.06] shadow-2xl transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="px-4 py-4 flex flex-col gap-1">
          {[['Features','#features'],['How It Works','#how-it-works']].map(([l,h]) => (
            <a key={l} href={h} onClick={close} className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:bg-white/[0.06] hover:text-white transition-all min-h-[48px]">{l}</a>
          ))}
          <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-col gap-2">
            <button onClick={() => { close(); onConnect() }} className={`${btnPrimary} w-full text-base px-6 py-3.5 shadow-[0_0_0_1px_rgba(99,102,241,0.4),0_4px_24px_rgba(99,102,241,0.3)]`}>Launch App →</button>
            <a href="https://github.com/EuStellar-Pay" target="_blank" rel="noopener noreferrer" onClick={close} className={`${btnOutline} w-full text-base px-6 py-3.5`}>GitHub</a>
          </div>
        </div>
      </div>
    </>
  )
}

/* ── Main ────────────────────────────────────────────────────────── */
export function LandingPage({ onConnect }: Props) {
  const go = useCallback(() => onConnect('MOCK_ADDRESS'), [onConnect])
  const [count, setCount] = useState(2847391)
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + Math.floor(Math.random()*350+50)), 1200)
    return () => clearInterval(id)
  }, [])

  const STEPS = [
    { n:'01', icon:'🔗', title:'Connect Wallet',   desc:'Install Freighter and connect your Stellar wallet in 30 seconds.' },
    { n:'02', icon:'🏦', title:'Fund Treasury',    desc:'Deposit XLM or USDC into the on-chain smart contract vault.' },
    { n:'03', icon:'⚡', title:'Create a Stream',  desc:"Set a per-second rate and assign it to a worker's wallet." },
    { n:'04', icon:'💸', title:'Earn Every Second',desc:'Workers see earnings tick up live. Claim anytime with one click.' },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar onConnect={go} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-20 grain">
        {/* Aurora blobs — pure Tailwind + animation class */}
        <div className="absolute -top-48 -left-24 w-[600px] h-[600px] rounded-full bg-indigo-600/50 blur-[80px] pointer-events-none animate-blob1" />
        <div className="absolute -top-32 -right-12 w-[500px] h-[500px] rounded-full bg-violet-600/45 blur-[80px] pointer-events-none animate-blob2" />
        <div className="absolute -bottom-24 left-[35%] w-[400px] h-[400px] rounded-full bg-cyan-500/25 blur-[80px] pointer-events-none animate-blob3" />

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E\")" }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left */}
            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/[0.08] backdrop-blur-sm mb-7">
                <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pdot" />
                <span className="text-[11px] font-bold text-indigo-300 tracking-widest uppercase">Live on Stellar Soroban</span>
              </div>

              {/* Headline */}
              <h1 className="font-black tracking-tight leading-[1.06] mb-5 sm:mb-6" style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}>
                <span className="text-white block">Payroll that</span>
                <span className={`block ${gtBrand}`}>never stops.</span>
              </h1>

              <p className="text-base sm:text-xl text-slate-400 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                Stream salaries in real-time on Stellar. Workers earn every second. Employers manage payroll on-chain — zero fees, forever.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button onClick={go} className={`${btnPrimary} text-sm sm:text-base px-7 sm:px-8 py-3.5 shadow-[0_0_0_1px_rgba(99,102,241,0.4),0_4px_28px_rgba(99,102,241,0.35)]`}>
                  Launch App →
                </button>
                <a href="https://github.com/EuStellar-Pay/EuPay-frontend" target="_blank" rel="noopener noreferrer"
                  className={`${btnOutline} text-sm sm:text-base px-7 sm:px-8 py-3.5`}>
                  View Source
                </a>
              </div>

              {/* Tech chips */}
              <div className="flex flex-wrap items-center gap-2 mt-8 justify-center lg:justify-start">
                {[{i:'⚡',t:'Stellar'},{i:'🔷',t:'Soroban'},{i:'🔐',t:'Freighter'},{i:'🪙',t:'XLM · USDC'}].map(({i,t}) => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-1">
                    <span>{i}</span>{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — stream card */}
            <div className="flex-shrink-0 w-full max-w-[340px] mx-auto relative">
              <div className="absolute inset-[-40px] rounded-full bg-indigo-600/15 blur-3xl pointer-events-none animate-blob1" />
              <HeroCard />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[{n:'2.4M+',l:'XLM Streamed'},{n:'1,200+',l:'Active Streams'},{n:'40+',l:'Countries'},{n:'$0',l:'Protocol Fees'}].map(s => (
              <div key={s.l} className={`${bentoCard} px-4 sm:px-5 py-4 sm:py-5 text-center`}>
                <div className={`text-2xl sm:text-3xl font-black font-mono mb-0.5 ${gtBrand}`}>{s.n}</div>
                <div className="text-xs text-slate-600 font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────────────────────────── */}
      <Ticker />

      {/* ── BENTO FEATURES ──────────────────────────────────────────── */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <p className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-3">— Why EuPay</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-10 sm:mb-14">
          <span className="text-white">Everything payroll needs.</span><br />
          <span className={gtBrand}>Nothing it doesn't.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Wide live counter */}
          <div className={`${bentoCard} sm:col-span-2 p-6 sm:p-8 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
            <p className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase mb-3">Live protocol volume</p>
            <div className={`text-4xl sm:text-5xl font-black font-mono ${gtBrand} tabular-nums mb-2`}>{count.toLocaleString()}</div>
            <p className="text-sm text-slate-600 mb-5">XLM streamed across all active smart contracts</p>
            <div className="h-[3px] bg-white/[0.07] rounded-full overflow-hidden">
              <div className="stream-fill" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Zero fees */}
          <BCard icon="$" title="Zero Platform Fees" accent="indigo"
            desc="100% of every stream reaches the worker. No cut, no markup, no hidden charges.">
            <div className={`mt-4 text-3xl font-black ${gtGlow}`}>$0.00</div>
            <p className="text-xs text-slate-600 mt-1">per transaction · forever</p>
          </BCard>

          {/* Per-second */}
          <BCard icon="⚡" title="Per-Second Precision" accent="cyan"
            desc="Workers earn every second. Stream resolution down to 1-second intervals on Soroban." />

          {/* Borderless */}
          <div className={`${bentoCard} sm:col-span-2 p-6 sm:p-8 relative overflow-hidden`}>
            <div className="absolute bottom-0 left-0 w-64 h-40 rounded-full bg-violet-600/8 blur-3xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className="flex-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-500/25 flex items-center justify-center text-xl mb-4">🌍</div>
                <h3 className="font-bold text-white text-lg mb-2">Borderless by design</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-md">Pay anyone, anywhere in XLM, USDC or any Stellar asset. Stellar's 5-second finality makes global payroll instant.</p>
              </div>
              <div className="flex sm:flex-col flex-wrap gap-2 shrink-0">
                {['🇳🇬 Nigeria','🇵🇭 Philippines','🇮🇳 India','🇧🇷 Brazil','🇩🇪 Germany'].map(c => (
                  <span key={c} className="text-xs text-slate-500 bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-1 whitespace-nowrap">{c}</span>
                ))}
              </div>
            </div>
          </div>

          <BCard icon="🔐" title="Non-Custodial" accent="emerald"
            desc="Funds live in Soroban smart contracts. No EuPay server ever touches your money.">
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pdot" />
              Fully on-chain
            </div>
          </BCard>

          <BCard icon="📊" title="Real-Time Analytics" accent="amber"
            desc="Monitor payroll burn rate, headcount, and treasury health — updated every Stellar ledger." />

          <BCard icon="🏧" title="Claim On Demand" accent="pink"
            desc="Workers withdraw earned salary whenever they choose. One click, instant settlement." />
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
      <section id="how-it-works" className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <p className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-3">— How it works</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-12 sm:mb-16">
            Live in four steps.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* connector */}
            <div className="hidden lg:block absolute top-7 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-gradient-to-r from-indigo-500/60 via-violet-500/40 to-cyan-500/30" />
            {STEPS.map((s) => (
              <div key={s.n} className="flex flex-row lg:flex-col items-start gap-4 lg:gap-0">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center lg:mb-5 relative z-10 shadow-[0_0_24px_rgba(99,102,241,0.4)]">
                    <span className="text-2xl">{s.icon}</span>
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black border border-white/[0.1] flex items-center justify-center">
                    <span className="text-[9px] font-black text-indigo-400">{s.n}</span>
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1.5">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-20 sm:py-24 md:py-32 grain">
        <div className="absolute -top-48 -left-24 w-[600px] h-[600px] rounded-full bg-indigo-600/40 blur-[100px] pointer-events-none animate-blob1" />
        <div className="absolute -top-32 -right-12 w-[500px] h-[500px] rounded-full bg-violet-600/35 blur-[100px] pointer-events-none animate-blob2" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm mb-6 sm:mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)] animate-pdot" />
            <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">Free · Open source · Non-custodial</span>
          </div>
          <h2 className="font-black tracking-tight leading-tight mb-4 sm:mb-5" style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}>
            <span className="text-white">Start streaming.</span><br />
            <span className={gtBrand}>Stop waiting.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Connect your Freighter wallet and run your first payroll stream in 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0">
            <button onClick={go}
              className={`${btnPrimary} text-base px-9 py-4 rounded-xl animate-glow-pulse`}
              style={{ boxShadow: '0 0 0 1px rgba(99,102,241,0.5), 0 8px 40px rgba(99,102,241,0.4), 0 0 80px rgba(99,102,241,0.15)' }}>
              Launch App →
            </button>
            <a href="https://github.com/EuStellar-Pay" target="_blank" rel="noopener noreferrer"
              className={`${btnOutline} text-base px-9 py-4 rounded-xl`}>
              View Organisation
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] bg-white/[0.015] px-4 sm:px-6 pt-12 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.5)]">
                <span className="text-xs">⚡</span>
              </div>
              <span className="font-extrabold text-white text-[15px]">EuPay</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed max-w-[200px]">Real-time payroll on Stellar &amp; Soroban.</p>
          </div>
          {[
            { t:'Product',    ls:[['Dashboard','#'],['Streams','#'],['Treasury','#']] },
            { t:'Developers', ls:[['GitHub','https://github.com/EuStellar-Pay'],['Frontend','https://github.com/EuStellar-Pay/EuPay-frontend'],['Contracts','https://github.com/EuStellar-Pay/EuPay-smartcontract']] },
            { t:'Community',  ls:[['Issues','https://github.com/EuStellar-Pay/EuPay-frontend/issues'],['Stellar Forum','https://stellar.org/community'],['Contributors','#']] },
          ].map(col => (
            <div key={col.t}>
              <div className="text-[10px] font-bold tracking-widest uppercase text-slate-700 mb-3">{col.t}</div>
              <ul className="space-y-2">
                {col.ls.map(([l,h]) => (
                  <li key={l}><a href={h} target={h.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" className="text-xs text-slate-600 hover:text-indigo-400 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto pt-5 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-2 text-center">
          <span className="text-xs text-slate-800">© 2026 EuStellar-Pay · Apache 2.0</span>
          <span className="text-xs text-slate-800">Built on Stellar &amp; Soroban ⚡</span>
        </div>
      </footer>
    </div>
  )
}
