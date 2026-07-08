export default function StatsCards({ stats = [] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.label}
          className="group relative bg-white border border-zinc-200/60 p-5 rounded-2xl transition-all duration-300 hover:border-zinc-400 hover:shadow-sm"
        >
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-semibold uppercase block">
            {item.label}
          </span>
          <p className="mt-2 break-words text-2xl font-semibold tracking-tight text-zinc-900 font-sans">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}