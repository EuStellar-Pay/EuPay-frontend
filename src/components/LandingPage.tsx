import { useState, useEffect, useRef } from 'react'

interface Props {
  onConnect: (address: string) => void
}

const FEATURES_EMPLOYER = [
  { icon: '⚡', title: 'Create Streams Instantly',   desc: 'Set up a payroll stream in seconds — define rate, token, and start date.' },
  { icon: '💰', title: 'Fund Treasury Vault',         desc: 'Deposit XLM, USDC or any Stellar asset into your company treasury.' },
  { icon: '📊', title: 'Live Payroll Analytics',      desc: 'Track total disbursed, active headcount, and burn rate in real-time.' },
  { icon: '🛑', title: 'Cancel with Fair Payout',     desc: 'Cancel any stream — workers receive a prorated final payment automatically.' },
]

const FEATURES_WORKER = [
  { icon: '👁️', title: 'Watch Earnings Accrue',    desc: 'See your balance grow every second — not every month.' },
  { icon: '🏧', title: 'Claim Anytime',             desc: 'Withdraw your earned salary whenever you want with one click.' },
  { icon: '📜', title: 'Full Stream History',       desc: 'View your complete payment timeline and income sources.' },
  { icon: '🌍', title: 'Borderless Payments',       desc: 'Receive salary in XLM or USDC, anywhere in the world.' },
]

const STEPS = [
  { num: '01', title: 'Connect Wallet',      desc: 'Install Freighter and connect your Stellar wallet — employer or worker.' },
  { num: '02', title: 'Fund Treasury',       desc: 'Employers deposit funds into the on-chain treasury vault.' },
  { num: '03', title: 'Create a Stream',     desc: 'Set a per-second payment rate and assign it to a worker\'s wallet.' },
  { num: '04', title: 'Earn Every Second',   desc: 'Funds flow continuously. Workers claim whenever they choose.' },
]

const STATS = [
  { number: '2.4M+',  label: 'XLM Streamed'    },
  { number: '1,200+', label: 'Active Streams'   },
  { number: '40+',    label: 'Countries'        },
  { number: '$0',     label: 'Protocol Fees'    },
]

// Animated earnings counter
function EarningsCounter() {
  const [amount, setAmount] = useState(0.0000000)
  const startRef = useRef(Date.now())
  const RATE = 0.00347222 // XLM per second (≈300 XLM/day)

  useEffect(() => {
    const id = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000
      setAmount(parseFloat((elapsed * RATE).toFixed(7)))
    }, 100)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="inline-flex flex-col items-center">
      <span className="text-xs sm:text-sm font-semibold text-gray-400 tracking-widest uppercase mb-2">
        Live earnings demo
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-mono text-indigo-400 tabular-nums tracking-tight">
          {amount.toFixed(4)}
        </span>
        <span className="text-xl sm:text-2xl font-bold text-gray-400">XLM</span>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500" />
        </span>
        <span className="text-xs text-gray-500">Streaming at 0.00347 XLM/sec</span>
      </div>
    </div>
  )
}

export function LandingPage({ onConnect }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-16 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800 shadow-sm">
        <a href="/" className="flex items-center gap-2 text-xl font-extrabold text-white shrink-0">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-sm">⚡</span>
          EuPay
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {['Features', 'How It Works', 'Docs', 'GitHub'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://github.com/EuStellar-Pay/EuPay-frontend" target="_blank" rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors">
            GitHub
          </a>
          <button onClick={() => onConnect('MOCK_ADDRESS')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all hover:-translate-y-px shadow-lg shadow-indigo-500/20">
            Launch App
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden w-10 h-10 items-center justify-center flex-col gap-[5px] rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer backdrop */}
      <div onClick={close} className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />

      {/* Mobile drawer */}
      <div className={`fixed top-16 left-0 right-0 z-50 md:hidden bg-gray-900 border-b border-gray-800 shadow-xl transition-all duration-300 ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="px-4 py-4 flex flex-col gap-1">
          {['Features', 'How It Works', 'Docs'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={close}
              className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors min-h-[48px]">
              {item}
            </a>
          ))}
          <div className="mt-3 pt-3 border-t border-gray-800 flex flex-col gap-2">
            <button onClick={() => { close(); onConnect('MOCK_ADDRESS') }}
              className="flex items-center justify-center w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors min-h-[48px]">
              Launch App →
            </button>
            <a href="https://github.com/EuStellar-Pay/EuPay-frontend" target="_blank" rel="noopener noreferrer" onClick={close}
              className="flex items-center justify-center w-full py-3.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors min-h-[48px]">
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-28 text-center">
        {/* Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] md:w-[900px] h-[300px] sm:h-[500px] md:h-[600px] rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="pointer-events-none absolute top-20 left-1/4 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-purple-600/8 blur-3xl" />

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-400 text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-5 sm:mb-6">
            ⚡ Built on Stellar &amp; Soroban
          </span>

          <h1 className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white max-w-4xl mx-auto mb-4 sm:mb-6">
            Pay Your Team{' '}
            <span className="text-indigo-400">Every Second.</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2">
            EuPay streams salaries in real-time on Stellar. Workers watch their earnings grow per second — not per month. Employers manage payroll on-chain with zero fees.
          </p>

          {/* Live counter */}
          <div className="inline-block bg-gray-900/80 border border-gray-800 rounded-2xl px-6 sm:px-10 py-6 sm:py-8 mb-10 sm:mb-12 shadow-xl shadow-indigo-500/5">
            <EarningsCounter />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <button onClick={() => onConnect('MOCK_ADDRESS')}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 min-h-[48px] text-sm sm:text-base">
              Launch App →
            </button>
            <a href="https://github.com/EuStellar-Pay/EuPay-frontend" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-transparent text-gray-300 font-semibold rounded-xl border border-gray-700 hover:border-indigo-500 hover:text-white hover:bg-gray-900 transition-all min-h-[48px] text-sm sm:text-base">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="border-y border-gray-800 bg-gray-900">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className={`py-6 sm:py-8 px-4 text-center ${i < 2 ? 'border-b md:border-b-0' : ''} ${i % 2 === 0 ? 'border-r' : ''} md:border-r last:border-r-0 border-gray-800`}>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 tracking-tight">{s.number}</div>
              <div className="mt-1 text-xs sm:text-sm text-gray-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <span className="text-xs font-bold tracking-widest uppercase text-indigo-400">Features</span>
        <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Built for both sides of payroll</h2>
        <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed">
          Whether you're paying a team or getting paid — EuPay gives you full control, in real-time, on-chain.
        </p>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Employers */}
          <div>
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center text-indigo-400 text-sm">🏢</div>
              <h3 className="text-base sm:text-lg font-bold text-white">For Employers</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {FEATURES_EMPLOYER.map((f) => (
                <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-5 hover:border-indigo-700 transition-colors">
                  <span className="text-xl sm:text-2xl mb-2 sm:mb-3 block">{f.icon}</span>
                  <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">{f.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Workers */}
          <div>
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-600/30 flex items-center justify-center text-purple-400 text-sm">👤</div>
              <h3 className="text-base sm:text-lg font-bold text-white">For Workers</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {FEATURES_WORKER.map((f) => (
                <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-5 hover:border-purple-700 transition-colors">
                  <span className="text-xl sm:text-2xl mb-2 sm:mb-3 block">{f.icon}</span>
                  <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">{f.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <div id="how-it-works" className="bg-gray-900 border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <span className="text-xs font-bold tracking-widest uppercase text-indigo-400">How It Works</span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Up and running in minutes</h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed">
            Connect, fund, stream. Every payment is verifiable on the Stellar blockchain.
          </p>

          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            <div className="hidden lg:block absolute top-8 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-indigo-600 via-indigo-400/50 to-gray-800" />
            {STEPS.map((s) => (
              <div key={s.num} className="flex flex-col sm:items-center sm:text-center gap-3 sm:gap-0 relative">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-indigo-600 text-white text-lg sm:text-xl font-extrabold sm:mb-5 relative z-10 shrink-0 shadow-lg shadow-indigo-500/30">
                  {s.num}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1.5 sm:mb-2 text-sm sm:text-base">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-16 sm:py-20 md:py-28 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-950 via-indigo-950/20 to-gray-950" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[300px] sm:h-[500px] rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="relative">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
            Start streaming payroll today.
          </h2>
          <p className="text-sm sm:text-lg text-gray-400 max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Connect your Freighter wallet and set up your first payroll stream in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <button onClick={() => onConnect('MOCK_ADDRESS')}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-xl shadow-indigo-500/30 hover:-translate-y-0.5 hover:shadow-2xl transition-all min-h-[48px] text-sm sm:text-base">
              Launch App →
            </button>
            <a href="https://github.com/EuStellar-Pay" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl border border-gray-700 hover:border-indigo-600 transition-all min-h-[48px] text-sm sm:text-base">
              View Organisation
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-800 bg-gray-950 px-4 sm:px-6 pt-10 sm:pt-14 pb-6 sm:pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-white mb-2 sm:mb-3">
              <span className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-sm">⚡</span>
              EuPay
            </div>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-[240px]">
              Real-time payroll streaming on Stellar &amp; Soroban. Pay per second, not per month.
            </p>
          </div>

          {[
            { title: 'Product',    links: [{ label: 'Dashboard', href: '#' }, { label: 'Stream Manager', href: '#' }, { label: 'Treasury', href: '#' }] },
            { title: 'Developers', links: [{ label: 'GitHub', href: 'https://github.com/EuStellar-Pay', ext: true }, { label: 'Frontend', href: 'https://github.com/EuStellar-Pay/EuPay-frontend', ext: true }, { label: 'Smart Contracts', href: 'https://github.com/EuStellar-Pay/EuPay-smartcontract', ext: true }] },
            { title: 'Community',  links: [{ label: 'Contributors', href: '#' }, { label: 'Issues', href: 'https://github.com/EuStellar-Pay/EuPay-frontend/issues', ext: true }, { label: 'Stellar Forum', href: 'https://stellar.org/community', ext: true }] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-3 sm:mb-4">{col.title}</div>
              <ul className="space-y-2 sm:space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...('ext' in l && l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-xs sm:text-sm text-gray-500 hover:text-indigo-400 transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 text-center">
          <span className="text-xs text-gray-600">© 2026 EuStellar-Pay. Apache 2.0 License.</span>
          <span className="text-xs text-gray-600">⚡ Powered by Stellar &amp; Soroban</span>
        </div>
      </footer>
    </div>
  )
}
