const metrics = [
  { label: "Portfolio value", value: "$1.24M", change: "+12.4%" },
  { label: "Monthly return", value: "8.7%", change: "+1.3%" },
  { label: "Net cash flow", value: "$84.2K", change: "+4.8%" }
];

const opportunities = [
  {
    name: "Growth equity",
    allocation: "32%",
    status: "Momentum",
    tone: "text-emerald-400 bg-emerald-500/10"
  },
  {
    name: "Private credit",
    allocation: "21%",
    status: "Stable",
    tone: "text-sky-400 bg-sky-500/10"
  },
  {
    name: "Real assets",
    allocation: "17%",
    status: "Diversified",
    tone: "text-violet-400 bg-violet-500/10"
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_35%),linear-gradient(180deg,#020817_0%,#0f172a_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="flex items-center justify-between border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-lg font-bold text-brand-300">
              IF
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Portfolio</p>
              <h1 className="text-xl font-semibold text-white">InvestFlow</h1>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#" className="transition hover:text-white">Overview</a>
            <a href="#" className="transition hover:text-white">Insights</a>
            <a href="#" className="transition hover:text-white">Allocations</a>
            <a href="#" className="transition hover:text-white">Reports</a>
          </nav>

          <button className="rounded-full border border-brand-400/40 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200 transition hover:border-brand-300 hover:bg-brand-500/20">
            Connect account
          </button>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Portfolio snapshot</p>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
                  Your plan is compounding.
                </h2>
              </div>
              <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                +8.2% YTD
              </div>
            </div>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              Track capital allocation, monitor emerging opportunities, and keep your long-term strategy aligned with real-time market signals.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
                View portfolio
              </button>
              <button className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white">
                Export report
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Risk balance</p>
            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Equity exposure</span>
                  <span>58%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800">
                  <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-brand-400 to-cyan-300" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Fixed income</span>
                  <span>24%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800">
                  <div className="h-full w-[24%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-300" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Alternatives</span>
                  <span>18%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800">
                  <div className="h-full w-[18%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-300" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-sm text-slate-400">{metric.label}</p>
              <div className="mt-5 flex items-end justify-between">
                <span className="text-3xl font-bold text-white">{metric.value}</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300">
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Opportunity pipeline</h3>
              <span className="text-sm text-slate-400">Updated 2h ago</span>
            </div>

            <div className="mt-6 space-y-4">
              {opportunities.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.allocation} allocation</p>
                  </div>

                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.tone}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-xl font-semibold text-white">Action items</h3>

            <div className="mt-6 space-y-5">
              <div className="rounded-2xl border border-brand-500/20 bg-brand-500/5 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-brand-300">Priority</p>
                <p className="mt-2 text-lg font-semibold text-white">Increase defensive allocation</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Rebalance 3% into fixed income to maintain target downside protection.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">Next review</p>
                <p className="mt-2 text-lg font-semibold text-white">Thursday, 2:00 PM</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}