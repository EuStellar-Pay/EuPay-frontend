import { useState, useEffect, useRef, useCallback } from 'react'

interface Props { onConnect: (a: string) => void }

/* ─── Design tokens ─────────────────────────────────────────────── */
const gt  = 'bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent'
const gtW = 'bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent'
const card  = 'rounded-2xl bg-[#0d0f1a] border border-white/[0.1] hover:border-indigo-500/40 hover:bg-[#111328] transition-all duration-300'
const card2 = 'rounded-2xl bg-[#0d0f1a] border border-white/[0.1]'
const btnP  = 'inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl min-h-[48px] transition-all duration-200 hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(99,102,241,0.5),0_4px_24px_rgba(99,102,241,0.35)] hover:shadow-[0_0_0_1px_rgba(99,102,241,0.7),0_8px_32px_rgba(99,102,241,0.45)]'
const btnO  = 'inline-flex items-center justify-center gap-2.5 bg-white/[0.06] text-slate-300 hover:text-white font-semibold rounded-xl border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.1] min-h-[48px] transition-all duration-200 hover:-translate-y-0.5'

/* ─── Hero Stream Card ─────────────────────────────────────────────  */
function StreamCard() {
  const [xlm, setXlm] = useState(2849.3912)
  const [logs, setLogs] = useState([
    { id: 1, w: 'GAXYZ...3A4B', a: '+0.0035 XLM', t: '8ms' },
    { id: 2, w: 'GBCD...7E2F',  a: '+0.0035 XLM', t: '21ms' },
    { id: 3, w: 'GCDE...1F9C',  a: '+0.0035 XLM', t: '34ms' },
  ])
  const counter = useRef(4)
  const start = useRef(Date.now())

  useEffect(() => {
    const t1 = setInterval(() => {
      setXlm(parseFloat((2849.3912 + (Date.now() - start.current) / 1000 * 0.0347).toFixed(4)))
    }, 80)
    const t2 = setInterval(() => {
      const ws = ['GHIJ...9B2D','GKLM...4C3E','GNOP...8D1F','GQRS...2E5G','GTUV...6F7H']
      setLogs(p => [{ id: counter.current++, w: ws[Math.floor(Math.random()*ws.length)], a: '+0.0035 XLM', t: `${Math.floor(Math.random()*60+4)}ms` }, ...p.slice(0,2)])
    }, 1800)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [])

  return (
    <div className="relative w-full max-w-[380px] mx-auto animate-float">
      {/* Glow halo */}
      <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-3xl scale-110 pointer-events-none animate-glow-pulse" />

      {/* Card */}
      <div className="relative rounded-2xl overflow-hidden border border-indigo-500/30 bg-[#080a14] shadow-[0_0_0_1px_rgba(99,102,241,0.15),0_32px_64px_rgba(0,0,0,0.6)]">
        {/* Rainbow top bar */}
        <div className="h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pdot" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-60" />
              </div>
              <span className="text-[11px] font-bold text-emerald-400 tracking-[0.15em] uppercase">Live Stream</span>
            </div>
            <span className="text-[10px] font-mono text-slate-600 bg-white/[0.05] border border-white/[0.08] px-2 py-1 rounded-lg">TESTNET</span>
          </div>

          {/* Big number */}
          <div className="mb-5">
            <p className="text-[10px] text-slate-600 tracking-widest uppercase mb-2">Total streamed today</p>
            <div className="flex items-baseline gap-2.5 leading-none">
              <span className={`text-[2.75rem] font-black font-mono tabular-nums ${gt}`}>{xlm.toFixed(4)}</span>
              <span className="text-lg font-bold text-slate-500 mb-0.5">XLM</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1.5">≈ ${(xlm * 0.40).toFixed(2)} USD &nbsp;·&nbsp; 0.0347 XLM/sec</p>
          </div>

          {/* Stream bar */}
          <div className="mb-5">
            <div className="h-[3px] rounded-full bg-white/[0.07] overflow-hidden">
              <div className="stream-fill" style={{ width: '73%' }} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-slate-600">Stream progress</span>
              <span className="text-[10px] font-semibold text-indigo-400">73.2%</span>
            </div>
          </div>

          {/* Terminal */}
          <div className="rounded-xl bg-[#030408] border border-white/[0.07] overflow-hidden font-mono text-[11px]">
            <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white/[0.03] border-b border-white/[0.05]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[10px] text-slate-700">eupay · payments</span>
            </div>
            <div className="p-3.5 space-y-2">
              {logs.map((l, i) => (
                <div key={l.id} className={`flex items-center gap-2 transition-all duration-500 ${i===0?'opacity-100':i===1?'opacity-45':'opacity-20'}`}>
                  <span className="text-emerald-500 shrink-0">✓</span>
                  <span className="text-slate-500 flex-1 truncate">{l.w}</span>
                  <span className="text-white font-semibold">{l.a}</span>
                  <span className="text-slate-700 shrink-0">{l.t}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-indigo-400">$</span>
                <span className="text-slate-600">processing stream</span>
                <span className="inline-block w-[2px] h-[11px] bg-indigo-400 ml-0.5 animate-blink align-middle" />
              </div>
            </div>
          </div>

          {/* Claim button */}
          <button className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600/80 to-violet-600/80 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold transition-all border border-indigo-500/30 hover:border-indigo-400/60">
            Claim Earnings →
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Ticker ───────────────────────────────────────────────────────── */
const TICKS = [
  { w:'GAXYZ...3A4B', a:'+12.48 XLM', t:'Claimed' },{ w:'GBCD...7E2F', a:'+8.91 XLM', t:'Claimed' },
  { w:'CORP...1A9Z',  a:'500 XLM',    t:'Treasury funded' },{ w:'GDEF...5F1C', a:'+22.30 XLM', t:'Claimed' },
  { w:'GHIJ...9B3D',  a:'New stream', t:'0.025 XLM/min' },{ w:'GKLM...4C8E', a:'+6.17 XLM', t:'Claimed' },
  { w:'GNOP...2D7F',  a:'1000 XLM',  t:'Treasury funded' },{ w:'GQRS...6E1G', a:'+15.82 XLM', t:'Claimed' },
]
function Ticker() {
  const items = [...TICKS,...TICKS]
  return (
    <div className="relative overflow-hidden py-3 border-y border-white/[0.06] bg-gradient-to-r from-indigo-950/20 via-violet-950/10 to-cyan-950/20">
      <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#030308] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#030308] to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee" style={{width:'max-content'}}>
        {items.map((item,i) => (
          <div key={i} className="flex items-center gap-2.5 px-6 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pdot" />
            <span className="text-xs text-slate-600 font-mono">{item.w}</span>
            <span className="text-xs font-bold text-white">{item.a}</span>
            <span className="text-xs text-slate-600">{item.t}</span>
            <span className="w-1 h-1 rounded-full bg-slate-800 mx-2 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Navbar ────────────────────────────────────────────────────────── */
function Navbar({ onConnect }: { onConnect: () => void }) {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  const close = () => setOpen(false)

  return (
    <>
      <nav className={`sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-16 transition-all duration-300 ${scrolled ? 'bg-[#030308]/90 backdrop-blur-2xl border-b border-white/[0.07] shadow-[0_4px_32px_rgba(0,0,0,0.6)]' : 'bg-transparent'}`}>
        {/* Brand */}
        <a href="/" onClick={close} className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-indigo-500/50 blur-md group-hover:blur-lg transition-all" />
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
              <span className="text-base font-black text-white">⚡</span>
            </div>
          </div>
          <div>
            <div className="text-[15px] font-black text-white leading-none tracking-tight">EuPay</div>
            <div className="text-[9px] text-slate-600 font-medium tracking-widest uppercase leading-none mt-0.5">Payroll Protocol</div>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {[['Features','#features'],['How It Works','#how-it-works'],['Docs','#']].map(([l,h]) => (
            <li key={l}><a href={h} className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/[0.07] transition-all font-medium">{l}</a></li>
          ))}
        </ul>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://github.com/EuStellar-Pay" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            GitHub
          </a>
          <button onClick={onConnect} className={`${btnP} text-sm px-5 py-2`}>
            Launch App
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(v=>!v)} className="flex md:hidden w-10 h-10 items-center justify-center flex-col gap-[5px] rounded-xl hover:bg-white/[0.07] transition-colors" aria-label="Menu">
          <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${open?'rotate-45 translate-y-[7px]':''}`} />
          <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${open?'opacity-0 scale-x-0':''}`} />
          <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${open?'-rotate-45 -translate-y-[7px]':''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div onClick={close} className={`fixed inset-0 z-40 bg-black/75 backdrop-blur-sm md:hidden transition-opacity duration-300 ${open?'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'}`} />
      <div className={`fixed top-16 left-0 right-0 z-50 md:hidden bg-[#080a14] border-b border-white/[0.08] shadow-2xl transition-all duration-300 ${open?'opacity-100 translate-y-0 pointer-events-auto':'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="px-4 py-4 flex flex-col gap-1">
          {[['Features','#features'],['How It Works','#how-it-works'],['Docs','#']].map(([l,h]) => (
            <a key={l} href={h} onClick={close} className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:bg-white/[0.07] hover:text-white transition-all min-h-[48px]">{l}</a>
          ))}
          <div className="mt-3 pt-3 border-t border-white/[0.07] flex flex-col gap-2">
            <button onClick={()=>{close();onConnect()}} className={`${btnP} w-full text-base px-6 py-3.5`}>Launch App →</button>
            <a href="https://github.com/EuStellar-Pay" target="_blank" rel="noopener noreferrer" onClick={close} className={`${btnO} w-full text-base px-6 py-3.5`}>View on GitHub</a>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Bento Feature Card ─────────────────────────────────────────── */
function FCard({ icon, title, desc, accent='indigo', wide=false, children }: { icon: string; title: string; desc?: string; accent?: string; wide?: boolean; children?: React.ReactNode }) {
  const acc: Record<string,string> = {
    indigo: 'from-indigo-500/20 to-violet-500/10 border-indigo-500/30',
    cyan:   'from-cyan-500/20 to-teal-500/10 border-cyan-500/30',
    amber:  'from-amber-500/20 to-yellow-500/10 border-amber-500/30',
    emerald:'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    pink:   'from-pink-500/20 to-rose-500/10 border-pink-500/30',
    violet: 'from-violet-500/20 to-purple-500/10 border-violet-500/30',
  }
  return (
    <div className={`${card} p-5 sm:p-6 relative overflow-hidden ${wide?'sm:col-span-2':''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-transparent pointer-events-none" />
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br border flex items-center justify-center text-xl mb-4 ${acc[accent]}`}>{icon}</div>
      <h4 className="font-bold text-white mb-2 text-sm sm:text-base">{title}</h4>
      {desc && <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>}
      {children}
    </div>
  )
}

/* ─── Main ────────────────────────────────────────────────────────── */
export function LandingPage({ onConnect }: Props) {
  const go = useCallback(() => onConnect('MOCK_ADDRESS'), [onConnect])
  const [vol, setVol] = useState(2847391)
  useEffect(() => { const id = setInterval(() => setVol(v => v + Math.floor(Math.random()*350+50)), 1200); return () => clearInterval(id) }, [])

  const STEPS = [
    { n:'01', icon:'🔗', title:'Connect Wallet',    desc:'Install Freighter, connect your Stellar wallet in 30 seconds.' },
    { n:'02', icon:'🏦', title:'Fund Treasury',     desc:'Deposit XLM or USDC into the on-chain smart contract vault.' },
    { n:'03', icon:'⚡', title:'Create a Stream',   desc:"Set a per-second rate and assign it to a worker's wallet." },
    { n:'04', icon:'💸', title:'Earn Every Second', desc:'Workers see earnings tick up live. Claim anytime, one click.' },
  ]

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#030308' }}>
      <Navbar onConnect={go} />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-20 sm:pt-28 lg:pt-36 pb-20 sm:pb-24 grain">
        {/* Aurora – more opaque, more vibrant */}
        <div className="absolute -top-40 -left-20 w-[700px] h-[700px] rounded-full pointer-events-none animate-blob1" style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.55) 0%, transparent 65%)', filter: 'blur(80px)' }} />
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full pointer-events-none animate-blob2" style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.5) 0%, transparent 65%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 left-[40%] w-[500px] h-[500px] rounded-full pointer-events-none animate-blob3" style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.3) 0%, transparent 65%)', filter: 'blur(80px)' }} />
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-100" style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.035)' stroke-width='1'/%3E%3C/svg%3E\")" }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">

            {/* Left */}
            <div className="flex-1 text-center lg:text-left max-w-[640px] mx-auto lg:mx-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-sm mb-7 sm:mb-8">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pdot" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-indigo-400 animate-ping opacity-60" />
                </div>
                <span className="text-[11px] font-bold text-indigo-300 tracking-[0.15em] uppercase">Live on Stellar Soroban</span>
              </div>

              {/* Headline */}
              <h1 className="font-black leading-[1.05] tracking-tight mb-5 sm:mb-6" style={{ fontSize: 'clamp(3rem, 7.5vw, 6rem)' }}>
                <span className={`block ${gtW}`}>Payroll that</span>
                <span className={`block ${gt}`}>never stops.</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-lg mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed">
                Stream salaries in real-time on Stellar. Workers earn <span className="text-white font-semibold">every second</span>. Employers manage on-chain — <span className="text-white font-semibold">zero fees, forever</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button onClick={go} className={`${btnP} text-sm sm:text-base px-7 sm:px-8 py-3.5`}>Launch App →</button>
                <a href="https://github.com/EuStellar-Pay/EuPay-frontend" target="_blank" rel="noopener noreferrer"
                  className={`${btnO} text-sm sm:text-base px-7 sm:px-8 py-3.5`}>View on GitHub</a>
              </div>

              {/* Tech chips */}
              <div className="flex flex-wrap items-center gap-2 mt-8 justify-center lg:justify-start">
                {[{i:'⚡',t:'Stellar'},{i:'🔷',t:'Soroban'},{i:'🔐',t:'Freighter'},{i:'🪙',t:'XLM · USDC'}].map(({i,t}) => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1.5 hover:border-indigo-500/40 hover:text-slate-300 transition-all cursor-default">
                    <span>{i}</span>{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="flex-shrink-0 w-full max-w-[380px] mx-auto">
              <StreamCard />
            </div>
          </div>

          {/* ── Stats row ── */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { n:'2.4M+', l:'XLM Streamed',    accent:'from-indigo-500/20 border-indigo-500/20' },
              { n:'1,200+',l:'Active Streams',   accent:'from-violet-500/20 border-violet-500/20' },
              { n:'40+',   l:'Countries',        accent:'from-cyan-500/20 border-cyan-500/20' },
              { n:'$0',    l:'Protocol Fees',    accent:'from-emerald-500/20 border-emerald-500/20' },
            ].map(s => (
              <div key={s.l} className={`rounded-2xl bg-gradient-to-br ${s.accent} to-transparent border px-4 sm:px-6 py-5 sm:py-6 text-center backdrop-blur-sm`}>
                <div className={`text-2xl sm:text-3xl font-black font-mono mb-1 ${gt}`}>{s.n}</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ─────────────────────────────────────────────────── */}
      <Ticker />

      {/* ── FEATURES ───────────────────────────────────────────────── */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="mb-10 sm:mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-indigo-500 inline-block" />Why EuPay
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-white">Everything payroll needs.</span>
            <br />
            <span className={gt}>Nothing it doesn't.</span>
          </h2>
          <p className="mt-4 text-base text-slate-500 max-w-lg leading-relaxed">
            Full control for employers. Full transparency for workers. All on Stellar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Live volume — wide */}
          <div className={`${card} sm:col-span-2 p-6 sm:p-8 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
            <p className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase mb-3">Live protocol volume</p>
            <div className={`text-4xl sm:text-5xl font-black font-mono ${gt} tabular-nums mb-2`}>{vol.toLocaleString()}</div>
            <p className="text-sm text-slate-600 mb-6">XLM streamed across all active smart contracts</p>
            <div className="h-[3px] bg-white/[0.07] rounded-full overflow-hidden">
              <div className="stream-fill" style={{ width: '100%' }} />
            </div>
          </div>

          <FCard icon="$" title="Zero Platform Fees" accent="emerald"
            desc="100% of every stream reaches the worker. No cut, no markup. Ever.">
            <div className={`mt-4 text-3xl font-black ${gt}`}>$0.00</div>
            <p className="text-xs text-slate-600 mt-1">per transaction · forever</p>
          </FCard>

          <FCard icon="⚡" title="Per-Second Precision" accent="cyan"
            desc="Workers earn every second, not every two weeks. Soroban contracts down to 1-second resolution." />

          {/* Borderless — wide */}
          <div className={`${card} sm:col-span-2 p-6 sm:p-8 relative overflow-hidden`}>
            <div className="absolute bottom-0 left-0 w-72 h-48 rounded-full bg-violet-600/[0.08] blur-3xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className="flex-1">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-500/30 flex items-center justify-center text-xl mb-4">🌍</div>
                <h3 className="font-bold text-white text-lg mb-2">Borderless by design</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-md">Pay anyone, anywhere in XLM, USDC or any Stellar asset. Stellar's 5-second finality makes global payroll instant — no SWIFT delays, no FX markup.</p>
              </div>
              <div className="flex sm:flex-col flex-wrap gap-2 shrink-0">
                {['🇳🇬 Nigeria','🇵🇭 Philippines','🇮🇳 India','🇧🇷 Brazil','🇩🇪 Germany'].map(c => (
                  <span key={c} className="text-xs text-slate-500 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1.5 whitespace-nowrap hover:border-violet-500/40 transition-colors">{c}</span>
                ))}
              </div>
            </div>
          </div>

          <FCard icon="🔐" title="Non-Custodial" accent="emerald"
            desc="Funds live in Soroban smart contracts. No EuPay server ever holds your money.">
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <div className="relative"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pdot" /><div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-60" /></div>
              Fully on-chain
            </div>
          </FCard>

          <FCard icon="📊" title="Real-Time Analytics" accent="indigo"
            desc="Monitor payroll burn, headcount, and treasury health — updated every Stellar ledger." />

          <FCard icon="🏧" title="Claim On Demand" accent="pink"
            desc="Workers withdraw earned salary whenever they choose. One click, instant settlement." />
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section id="how-it-works" className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="py-16 sm:py-20 md:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #030308 0%, #06060f 50%, #030308 100%)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-indigo-500 inline-block" />How it works
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-12 sm:mb-16">
              Live in four steps.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
              <div className="hidden lg:block absolute top-[26px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px bg-gradient-to-r from-indigo-500/70 via-violet-500/50 to-cyan-500/30" />
              {STEPS.map((s) => (
                <div key={s.n} className="flex flex-row lg:flex-col items-start gap-4 lg:gap-0">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 rounded-2xl bg-indigo-500/30 blur-xl pointer-events-none" />
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center lg:mb-5 shadow-[0_0_24px_rgba(99,102,241,0.5)]">
                      <span className="text-2xl">{s.icon}</span>
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#030308] border border-white/[0.12] flex items-center justify-center">
                      <span className="text-[9px] font-black text-indigo-400">{s.n}</span>
                    </span>
                  </div>
                  <div className="lg:mt-0">
                    <h3 className="font-bold text-white mb-1.5 text-base">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-24 sm:py-28 md:py-36 text-center grain">
        <div className="absolute -top-40 -left-20 w-[700px] h-[700px] rounded-full pointer-events-none animate-blob1" style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.45) 0%, transparent 65%)', filter: 'blur(100px)' }} />
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full pointer-events-none animate-blob2" style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.40) 0%, transparent 65%)', filter: 'blur(100px)' }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm mb-7 sm:mb-8">
            <div className="relative"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pdot" /><div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-60" /></div>
            <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">Free · Open source · Non-custodial</span>
          </div>

          <h2 className="font-black tracking-tight leading-[1.06] mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.75rem)' }}>
            <span className={`block ${gtW}`}>Start streaming.</span>
            <span className={`block ${gt}`}>Stop waiting.</span>
          </h2>

          <p className="text-base sm:text-xl text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed px-2">
            Connect your Freighter wallet and run your first payroll stream in 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0">
            <button onClick={go} className={`${btnP} text-base px-10 py-4 rounded-xl animate-glow-pulse`}
              style={{ boxShadow: '0 0 0 1px rgba(99,102,241,0.6), 0 8px 40px rgba(99,102,241,0.45), 0 0 100px rgba(99,102,241,0.2)' }}>
              Launch App →
            </button>
            <a href="https://github.com/EuStellar-Pay" target="_blank" rel="noopener noreferrer"
              className={`${btnO} text-base px-10 py-4 rounded-xl`}>
              View Organisation
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] px-4 sm:px-6 pt-12 pb-8" style={{ background: '#06060f' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.5)]"><span className="text-sm">⚡</span></div>
              <div><div className="font-black text-white text-sm leading-none">EuPay</div><div className="text-[9px] text-slate-700 uppercase tracking-wider mt-0.5">Payroll Protocol</div></div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">Real-time payroll on Stellar &amp; Soroban.</p>
          </div>
          {[
            { t:'Product',    ls:[['Dashboard','#'],['Stream Manager','#'],['Treasury Vault','#']] },
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
