import { useState, useEffect, useRef, useCallback } from 'react'

interface Props { onConnect: (a: string) => void }

/* ─── Live Stream Card ─────────────────────────────────────────── */
function StreamCard() {
  const [xlm, setXlm]   = useState(2849.3912)
  const [logs, setLogs] = useState([
    { id: 1, w: 'GAXYZ...3A4B', a: '+0.0035 XLM', t: '8ms'  },
    { id: 2, w: 'GBCD...7E2F',  a: '+0.0035 XLM', t: '21ms' },
    { id: 3, w: 'GCDE...1F9C',  a: '+0.0035 XLM', t: '34ms' },
  ])
  const counter = useRef(4)
  const start   = useRef(Date.now())

  useEffect(() => {
    const t1 = setInterval(() => {
      setXlm(parseFloat((2849.3912 + (Date.now() - start.current) / 1000 * 0.0347).toFixed(4)))
    }, 80)
    const wallets = ['GHIJ...9B2D','GKLM...4C3E','GNOP...8D1F','GQRS...2E5G']
    const t2 = setInterval(() => {
      setLogs(p => [
        { id: counter.current++, w: wallets[Math.floor(Math.random()*wallets.length)], a: '+0.0035 XLM', t: `${Math.floor(Math.random()*60+4)}ms` },
        ...p.slice(0, 2),
      ])
    }, 1800)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [])

  return (
    <div className="w-full max-w-sm mx-auto rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">
      {/* Top accent bar */}
      <div className="h-[2px] bg-indigo-600" />

      <div className="p-5">
        {/* Status */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="pulse-dot" />
            <span className="text-[11px] font-semibold text-green-400 tracking-wider uppercase">Live Stream</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">TESTNET</span>
        </div>

        {/* Amount */}
        <div className="mb-5">
          <p className="text-[10px] text-zinc-500 tracking-wider uppercase mb-1.5">Total streamed today</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black font-mono text-white tabular-nums">{xlm.toFixed(4)}</span>
            <span className="text-base font-semibold text-zinc-500">XLM</span>
          </div>
          <p className="text-xs text-zinc-600 mt-1">≈ ${(xlm * 0.4).toFixed(2)} USD · 0.0347 XLM/sec</p>
        </div>

        {/* Progress */}
        <div className="mb-5">
          <div className="h-[3px] bg-zinc-800 rounded-full overflow-hidden">
            <div className="stream-fill" style={{ width: '73%' }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-zinc-600">Stream progress</span>
            <span className="text-[10px] font-semibold text-indigo-400">73.2%</span>
          </div>
        </div>

        {/* Terminal */}
        <div className="rounded-lg bg-black border border-zinc-800 overflow-hidden font-mono text-[11px]">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 border-b border-zinc-800">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-[10px] text-zinc-600">eupay · payments</span>
          </div>
          <div className="p-3 space-y-1.5">
            {logs.map((l, i) => (
              <div key={l.id} className={`flex items-center gap-2 transition-opacity duration-400 ${i === 0 ? 'opacity-100' : i === 1 ? 'opacity-50' : 'opacity-20'}`}>
                <span className="text-green-500 shrink-0">✓</span>
                <span className="text-zinc-500 flex-1 truncate">{l.w}</span>
                <span className="text-white">{l.a}</span>
                <span className="text-zinc-700 shrink-0">{l.t}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-indigo-400">$</span>
              <span className="text-zinc-600">processing stream</span>
              <span className="caret" />
            </div>
          </div>
        </div>

        <button className="mt-4 w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors">
          Claim Earnings
        </button>
      </div>
    </div>
  )
}

/* ─── Ticker ───────────────────────────────────────────────────── */
const TICKS = [
  { w:'GAXYZ...3A4B', a:'+12.48 XLM', t:'Claimed'         },
  { w:'GBCD...7E2F',  a:'+8.91 XLM',  t:'Claimed'         },
  { w:'CORP...1A9Z',  a:'500 XLM',    t:'Treasury funded' },
  { w:'GDEF...5F1C',  a:'+22.30 XLM', t:'Claimed'         },
  { w:'GHIJ...9B3D',  a:'New stream', t:'0.025 XLM/min'   },
  { w:'GKLM...4C8E',  a:'+6.17 XLM',  t:'Claimed'         },
  { w:'GNOP...2D7F',  a:'1000 XLM',  t:'Treasury funded' },
  { w:'GQRS...6E1G',  a:'+15.82 XLM', t:'Claimed'         },
]

function Ticker() {
  const items = [...TICKS, ...TICKS]
  return (
    <div className="relative overflow-hidden py-3 border-y border-zinc-800 bg-zinc-900/50">
      <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />
      <div className="marquee-track">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 px-6 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
            <span className="text-xs text-zinc-600 font-mono">{item.w}</span>
            <span className="text-xs font-semibold text-zinc-300">{item.a}</span>
            <span className="text-xs text-zinc-600">{item.t}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700 mx-1 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Navbar ───────────────────────────────────────────────────── */
function Navbar({ onConnect }: { onConnect: () => void }) {
  const [open, setOpen]     = useState(false)
  const [solid, setSolid]   = useState(false)

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <div className={`sticky top-0 z-50 transition-all duration-200 ${solid ? 'border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

          {/* Brand */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
              <span className="text-xs font-black text-white">⚡</span>
            </div>
            <span className="text-sm font-bold text-white">EuPay</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {[['Features','#features'],['How It Works','#how-it-works'],['Docs','#']].map(([l,h]) => (
              <a key={l} href={h} className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800/60 transition-all">{l}</a>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://github.com/EuStellar-Pay" target="_blank" rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">GitHub</a>
            <button onClick={onConnect}
              className="px-3.5 py-1.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors">
              Launch App
            </button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(v => !v)}
            className="flex md:hidden w-8 h-8 items-center justify-center flex-col gap-[5px] rounded-md hover:bg-zinc-800 transition-colors"
            aria-label="Menu">
            <span className={`block w-4 h-[1.5px] bg-white rounded transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-4 h-[1.5px] bg-white rounded transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-4 h-[1.5px] bg-white rounded transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-40 bg-black/60 md:hidden transition-opacity duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />
      <div className={`fixed top-14 left-0 right-0 z-50 md:hidden bg-zinc-950 border-b border-zinc-800 transition-all duration-200 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-1">
          {[['Features','#features'],['How It Works','#how-it-works'],['Docs','#']].map(([l,h]) => (
            <a key={l} href={h} onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-sm text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-all min-h-[44px] flex items-center">{l}</a>
          ))}
          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2 mt-1">
            <button onClick={() => { setOpen(false); onConnect() }}
              className="w-full py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors min-h-[44px]">
              Launch App
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Feature Card ─────────────────────────────────────────────── */
function FCard({ icon, title, desc, children, wide = false }: {
  icon: string; title: string; desc?: string; children?: React.ReactNode; wide?: boolean
}) {
  return (
    <div className={`rounded-xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6 hover:border-zinc-700 transition-colors ${wide ? 'sm:col-span-2' : ''}`}>
      <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-lg mb-4">{icon}</div>
      <h4 className="font-semibold text-white mb-1.5 text-sm sm:text-base">{title}</h4>
      {desc && <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>}
      {children}
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────────────────── */
export function LandingPage({ onConnect }: Props) {
  const go  = useCallback(() => onConnect('MOCK_ADDRESS'), [onConnect])
  const [vol, setVol] = useState(2847391)
  useEffect(() => {
    const id = setInterval(() => setVol(v => v + Math.floor(Math.random() * 300 + 50)), 1200)
    return () => clearInterval(id)
  }, [])

  const STEPS = [
    { n:'01', icon:'🔗', title:'Connect Wallet',    desc:'Install Freighter and connect your Stellar wallet in 30 seconds.' },
    { n:'02', icon:'🏦', title:'Fund Treasury',     desc:'Deposit XLM or USDC into the on-chain smart contract vault.' },
    { n:'03', icon:'⚡', title:'Create a Stream',   desc:"Set a per-second rate and assign it to a worker's wallet address." },
    { n:'04', icon:'💸', title:'Earn Every Second', desc:'Workers see earnings accrue in real time. Claim whenever they choose.' },
  ]

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden">
      <Navbar onConnect={go} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pt-20 sm:pt-28 pb-20 sm:pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-16">

            {/* Left */}
            <div className="flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 mb-7">
                <div className="pulse-dot scale-75" />
                <span className="text-xs font-medium text-zinc-400">Live on Stellar Soroban</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white mb-5">
                Payroll that<br />
                <span className="text-indigo-400">never stops.</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
                Stream salaries in real-time on Stellar. Workers earn every second.
                Employers manage payroll on-chain — zero fees, forever.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button onClick={go}
                  className="px-6 py-3 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors min-h-[44px]">
                  Launch App →
                </button>
                <a href="https://github.com/EuStellar-Pay/EuPay-frontend" target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 text-sm font-semibold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg transition-colors min-h-[44px] flex items-center justify-center">
                  View on GitHub
                </a>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap items-center gap-2 mt-7 justify-center lg:justify-start">
                {[{i:'⚡',t:'Stellar'},{i:'🔷',t:'Soroban'},{i:'🔐',t:'Freighter'},{i:'🪙',t:'XLM · USDC'}].map(({i,t}) => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-md px-2.5 py-1">
                    <span>{i}</span>{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — stream card */}
            <div className="flex-shrink-0 w-full max-w-sm mx-auto">
              <StreamCard />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { n:'2.4M+', l:'XLM Streamed'   },
              { n:'1,200+',l:'Active Streams'  },
              { n:'40+',   l:'Countries'       },
              { n:'$0',    l:'Protocol Fees'   },
            ].map(s => (
              <div key={s.l} className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white mb-0.5">{s.n}</div>
                <div className="text-xs text-zinc-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────────────────────────── */}
      <Ticker />

      {/* ── FEATURES ────────────────────────────────────────────────── */}
      <section id="features" className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-indigo-400 tracking-widest uppercase mb-3">Features</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Everything payroll needs.</h2>
          <p className="text-zinc-500 text-sm sm:text-base mb-10 max-w-lg">
            Full control for employers. Full transparency for workers. All on Stellar.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Live volume — wide */}
            <div className="sm:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6 hover:border-zinc-700 transition-colors">
              <p className="text-[10px] font-semibold text-indigo-400 tracking-widest uppercase mb-2">Live protocol volume</p>
              <div className="text-4xl sm:text-5xl font-black font-mono text-white tabular-nums mb-1">{vol.toLocaleString()}</div>
              <p className="text-sm text-zinc-600 mb-5">XLM streamed across all active contracts</p>
              <div className="h-[3px] bg-zinc-800 rounded-full overflow-hidden">
                <div className="stream-fill" style={{ width: '100%' }} />
              </div>
            </div>

            <FCard icon="$" title="Zero Platform Fees"
              desc="100% of every stream goes to the worker. No cut, no markup, no hidden charges.">
              <p className="mt-3 text-3xl font-black text-white font-mono">$0.00</p>
              <p className="text-xs text-zinc-600 mt-0.5">per transaction</p>
            </FCard>

            <FCard icon="⚡" title="Per-Second Precision"
              desc="Workers earn every second, not every two weeks. Soroban contracts at 1-second resolution." />

            {/* Borderless — wide */}
            <div className="sm:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6 hover:border-zinc-700 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div className="flex-1">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-lg mb-4">🌍</div>
                  <h4 className="font-semibold text-white text-base mb-1.5">Borderless by design</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Pay anyone, anywhere in XLM, USDC, or any Stellar asset.
                    Stellar's 5-second finality means instant global settlement.
                  </p>
                </div>
                <div className="flex sm:flex-col flex-wrap gap-2 shrink-0">
                  {['🇳🇬 Nigeria','🇵🇭 Philippines','🇮🇳 India','🇧🇷 Brazil','🇩🇪 Germany'].map(c => (
                    <span key={c} className="text-xs text-zinc-500 bg-zinc-800 border border-zinc-700 rounded-md px-2.5 py-1 whitespace-nowrap">{c}</span>
                  ))}
                </div>
              </div>
            </div>

            <FCard icon="🔐" title="Non-Custodial"
              desc="Funds live in Soroban smart contracts. No EuPay server ever holds your money.">
              <div className="mt-3 flex items-center gap-2">
                <div className="pulse-dot scale-75" />
                <span className="text-xs text-green-400 font-medium">Fully on-chain</span>
              </div>
            </FCard>

            <FCard icon="📊" title="Real-Time Analytics"
              desc="Monitor payroll burn rate, headcount, and treasury health — updated every block." />

            <FCard icon="🏧" title="Claim On Demand"
              desc="Workers withdraw earned salary whenever they choose. One click, instant settlement." />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
      <section id="how-it-works">
        <div className="border-y border-zinc-800 bg-zinc-900/40 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-semibold text-indigo-400 tracking-widest uppercase mb-3">How it works</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12">Live in four steps.</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
              {/* Connector line */}
              <div className="hidden lg:block absolute top-5 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-zinc-800" />

              {STEPS.map(s => (
                <div key={s.n} className="flex flex-row lg:flex-col gap-4 lg:gap-0">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center lg:mb-5 relative z-10">
                      <span className="text-lg">{s.icon}</span>
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#09090b] border border-zinc-700 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-indigo-400">{s.n}</span>
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1 text-sm">{s.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 mb-6">
              <div className="pulse-dot scale-75" />
              <span className="text-xs font-medium text-zinc-400">Free · Open source · Non-custodial</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
              Start streaming. Stop waiting.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
              Connect your Freighter wallet and run your first payroll stream in 60 seconds.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button onClick={go}
                className="px-8 py-3 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors min-h-[44px]">
                Launch App →
              </button>
              <a href="https://github.com/EuStellar-Pay" target="_blank" rel="noopener noreferrer"
                className="px-8 py-3 text-sm font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-colors min-h-[44px] flex items-center justify-center">
                View Organisation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-800 px-4 sm:px-6 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                <span className="text-xs text-white">⚡</span>
              </div>
              <span className="text-sm font-bold text-white">EuPay</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">Real-time payroll on Stellar &amp; Soroban.</p>
          </div>
          {[
            { t:'Product',    ls:[['Dashboard','#'],['Streams','#'],['Treasury','#']] },
            { t:'Developers', ls:[['GitHub','https://github.com/EuStellar-Pay'],['Frontend','https://github.com/EuStellar-Pay/EuPay-frontend'],['Contracts','https://github.com/EuStellar-Pay/EuPay-smartcontract']] },
            { t:'Community',  ls:[['Issues','https://github.com/EuStellar-Pay/EuPay-frontend/issues'],['Stellar Forum','https://stellar.org/community'],['Contributors','#']] },
          ].map(col => (
            <div key={col.t}>
              <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">{col.t}</p>
              <ul className="space-y-2">
                {col.ls.map(([l,h]) => (
                  <li key={l}>
                    <a href={h} target={h.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
                      className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-center">
          <p className="text-xs text-zinc-700">© 2026 EuStellar-Pay · Apache 2.0</p>
          <p className="text-xs text-zinc-700">Built on Stellar &amp; Soroban</p>
        </div>
      </footer>
    </div>
  )
}
